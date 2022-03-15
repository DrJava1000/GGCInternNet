import styles from './user_profile.module.css';
import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import { loadUserProfile } from '../../../firebase/ops/profile';
import React, { Component, Fragment, } from "react";

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

    this.state = {
      name : "",
      pic : "", 
      major : "",
      concentration : "",
      resume : ""
    }
  }

  onNameChange(e) {
    this.setState({
    });
  }

  onPicUpload(e) {
    this.setState({
    });
  }

  onMajorChange(e) {
    this.setState({
    });
  }

  onConcentrationChange(e){
    this.setState({
    });
  }

  onResumeUpload(){
    this.setState({
    });
  }

  onSubmit(e){ 
    e.preventDefault(); 
  }

  componentDidMount(){
    let userDetails = loadUserProfile('5RBuiAGBHwPzhRHbbllYOUTpadp2');

    userDetails.then((profile) => {
      this.setState({
        name: profile.name,
        pic: profile.pic,
        major: profile.major,
        concentration: profile.concentration,
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
                        <img alt="User's Profile Pic" src={this.state.pic} />
                        <div><b>Major</b></div>
                        <select name="cars">
                          <option value="Biology">Biology</option>
                          <option value="Business Administration">Business Administration</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Cinema and Media Arts Production">Cinema and Media Arts Production</option>
                          <option value="Criminal Justice/Criminalology">Criminal Justice/Criminalology</option>
                          <option value="Education">Education</option>
                          <option value="English">English</option>
                          <option value="Environmental Science">Environmental Science</option>
                          <option value="Exercise Science">Exercise Science</option>
                          <option value="Health Science">Health Science</option>
                          <option value="History">History</option>
                          <option value="Human Development and Aging Services">Human Development and Aging Services</option>
                          <option value="Information Technology">Information Technology</option>
                          <option value="Integrative Studies">Integrative Studies</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Nursing">Nursing</option>
                          <option value="Political Science">Political Science</option>
                          <option value="Psychology">Psychology</option>
                        </select><br/>
                        <div ><b>Concentration</b></div>
                        <input type="text" placeholder={this.state.concentration} onChange={this.onConcentrationChange}/><br/>
                        <div><b>Resume Download Link</b></div>
                        <input type="text" placeholder={this.state.resume} onChange={this.onResumeUpload}/><br/>
                        <input type="submit" name="login" value="Login"/>
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