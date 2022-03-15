import styles from './user_profile.module.css';
import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import { loadUserProfile, updateUserProfile } from '../../../firebase/ops/profile';
import React, { Component, Fragment, } from "react";
import { ggc_degrees } from './majors_and_concentrations';

/**
 * @class Profile
 * React Component for the Profile Page
 */
class Profile extends Component{
  /**
   * @name Portal
   * Initialize Portal State Variables and Bind Methods
   * @param props options passed to this component
   */
  constructor(props) {
    super(props);

    // This Bindings (required for 'this' keyword usage in some methods)
    this.onNameChange = this.onNameChange.bind(this);
    this.onPicUpload = this.onPicUpload.bind(this);
    this.onMajorChange = this.onMajorChange.bind(this);
    this.onConcentrationChange = this.onConcentrationChange.bind(this);
    this.onResumeUpload = this.onResumeUpload.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name : "",
      pic : "", 
      major : "",
      concentration : "",
      concentrationList: [],
      resume : "",
      updateButton : false
    }
  }

  onNameChange(e) {
    this.onProfileModification();
    this.setState({
      name: e.target.value
    });
  }

  onPicUpload(e) {
    this.onProfileModification();
    this.setState({
      pic: e.target.files[0]
    });
  }

  onMajorChange(e) {
    this.onProfileModification();
    let fetchedConcentrations = this.loadConcentrations(e.target.value);
    this.setState({
      major: e.target.value,
      concentrationList: fetchedConcentrations,
      concentration: fetchedConcentrations[0]
    });
  }

  onConcentrationChange(e){
    this.onProfileModification();
    this.setState({
      concentration: e.target.value
    });
  }

  onResumeUpload(e){
    this.onProfileModification();
    this.setState({
      resume: e.target.files[0]
    });
  }

  onSubmit(e){ 
    e.preventDefault(); 

    updateUserProfile({
      id: '5RBuiAGBHwPzhRHbbllYOUTpadp2',
      name: this.state.name,
      pic: this.state.pic,
      major: this.state.major,
      concentration: this.state.concentration,
      resume: this.state.resume
    }); 
  }

  loadConcentrations(major){
    for(let step = 0; step < ggc_degrees.length; step++){
      if(ggc_degrees[step].major === major){
          return ggc_degrees[step].concentrations;
      }
    }
  }

  onProfileModification(){
    this.setState({
      updateButton : true
    });
  }

  componentDidMount(){
    let userDetails = loadUserProfile('5RBuiAGBHwPzhRHbbllYOUTpadp2');

    userDetails.then((profile) => {
      this.setState({
        name: profile.name,
        pic: profile.pic,
        major: profile.major,
        concentration: profile.concentration,
        concentrationList: this.loadConcentrations(profile.major),
        resume: profile.resume
      });
    })
  }
 
  render(){
    return (
        <Fragment>
            <AppHeader navBarContents={[{
                'text': "Main Feed",
                'link': "/"
            }]}
            />
            <div className={bodyStyles.ScrollingContent}>
            <div className={styles.profileBody}>
              <div>
                <form onSubmit={this.onSubmit}>
                  <div><b>Profile Name</b></div>
                  <input type="text" placeholder={this.state.name} onChange={this.onNameChange}/><br/>
                  <div ><b>Profile Pic</b></div>
                  <img alt="User's Profile Pic" src={this.state.pic} /><br/>
                  <input type="file" name="Profile Picture Upload" onChange={this.onPicUpload}/>
                  <div><b>Major</b></div>
                  <select name="majors" value={this.state.major} onChange={this.onMajorChange}>
                    {
                      ggc_degrees.map(degree => <option key={degree.id} value={degree.major}>{degree.major}</option>)
                    }
                  </select><br/>
                  <div ><b>Concentration</b></div>
                  <select name="concentrations" value={this.state.concentration} onChange={this.onConcentrationChange}>
                    {
                      this.state.concentrationList.map(concentration => <option key={concentration.id} 
                        value={concentration}>{concentration}</option>)
                    }
                  </select><br/>
                  <div><b>Resume Download Link</b></div>
                  <a href={this.state.resume}>Click here to download the resume.</a><br/>
                  <div><b>Resume Upload</b></div>
                  <input type="file" name="Resume Upload" onChange={this.onResumeUpload}/><br/>
                  {
                    this.state.updateButton ? <input type="submit" name="Update" value="Update"/> : <div></div>
                  }
                </form>
              </div>
            </div>
            <AppFooter />
            </div>
        </Fragment>
    );
  }
}
  
export default Profile;