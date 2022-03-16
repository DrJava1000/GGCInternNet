import styles from './user_profile.module.css';
import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import { loadUserProfile, updateUserProfile } from '../../../firebase/ops/profile';
import React, { Component, Fragment, } from "react";
import { ggc_degrees } from './majors_and_concentrations';
import { Button, Grid, MenuItem } from '../../../../node_modules/@mui/material/index';
import { TextField } from '../../../../node_modules/@mui/material/index';
import { Typography } from '../../../../node_modules/@mui/material/index';
import { Select } from '../../../../node_modules/@mui/material/index';
import titleStyle from '../../../shared_site_css/button_styles/Button.module.css';
import AuthContext from '../../../context/AuthContext';

/**
 * @class Profile
 * React Component for the Profile Page
 */
class Profile extends Component{
  static contextType = AuthContext
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
      picUrl: "",
      major : "",
      concentration : "",
      concentrationList: [],
      resume : "",
      resumeUrl: "",
      downloadResumePreview: false,
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
      pic: e.target.files[0],
      picUrl: URL.createObjectURL(e.target.files[0])
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
      resume: e.target.files[0],
      resumeUrl: URL.createObjectURL(e.target.files[0]),
      downloadResumePreview: true
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
    let userDetails;
    setTimeout(() => {
      userDetails = loadUserProfile(this.context.currentUserID);
      userDetails.then((profile) => {
        this.setState({
          name: profile.name,
          picUrl: profile.pic,
          major: profile.major,
          concentration: profile.concentration,
          concentrationList: this.loadConcentrations(profile.major),
          resumeUrl: profile.resume
        });
      })
    }, 
    1000);
  }
 
  render(){
    return (
        <Fragment>
            <AppHeader navBarContents={[{
                'text': "Main Forum",
                'link': "/"
            }]}
            />
            <div className={bodyStyles.ScrollingContent}>
            <div className={styles.profileBody}>
            <Grid container alignItems="center" justify="center" direction="column" sx={{width:'70%'}}>
                <form onSubmit={this.onSubmit}>
                  <Grid item sx={{border: 1, borderColor: 'grey.300', borderRadius: 2, paddingBottom: '15px', marginTop: '60px' }}>
                    <Typography
                    variant="h6"
                    className={titleStyle.title}
                    >
                      Profile Picture
                    </Typography>
                    <img src={this.state.picUrl} style={{paddingTop:"15px", height:"175px", width:"175px"}} /><br/>
                    <input type="file" name="Profile Picture Upload" onChange={this.onPicUpload}/>
                  </Grid> <br></br>

                  <Grid item>
                    <Typography
                    variant="h6"
                    className={titleStyle.title}
                    >
                      Full Name
                    </Typography>
                    <TextField
                      type="text"
                      inputProps={{
                        style: { textAlign: 'center' }
                      }}
                      sx={{
                        width: '100%'
                      }}
                      value={this.state.name}
                      onChange={this.onNameChange}
                    />
                  </Grid> <br></br>
            
                  <Grid item>
                    <Typography
                    variant="h6"
                    className={titleStyle.title}
                    >
                      Major
                    </Typography>
                    <Select
                      value={this.state.major}
                      onChange={this.onMajorChange}
                      sx={{
                        width: '100%'
                      }}
                    >
                      {
                        ggc_degrees.map(degree => <MenuItem key={degree.major} value={degree.major}>{degree.major}</MenuItem>)
                      }
                    </Select>
                  </Grid> <br></br>
                  
                  <Grid item>
                    <Typography
                    variant="h6"
                    className={titleStyle.title}
                    >
                      Concentration
                    </Typography>
                    <Select
                      value={this.state.concentration}
                      onChange={this.onConcentrationChange}
                      sx={{
                        width: '100%'
                      }}
                    >
                      {
                        this.state.concentrationList.map(concentration => <MenuItem key={concentration} value={concentration}>{concentration}</MenuItem>)
                      }
                    </Select>
                  </Grid> <br></br>
       
                  <Grid item sx={{border: 1, borderColor: 'grey.300', borderRadius: 2}}>
                  <Typography
                    variant="h6"
                    className={titleStyle.title}
                    >
                      Download Resume
                    </Typography>
                    <Button
                      sx={{
                        width: '100%'
                      }}
                    >
                      {
                        this.state.downloadResumePreview ? <><a href={this.state.resumeUrl} download={this.state.resume.name}>Click to Download Resume</a><br /></> :
                        <><a href={this.state.resumeUrl} style={{textDecoration:'none'}}>Click to Download Resume</a><br /></>
                      }
                    </Button>
                  </Grid> <br></br>

                  <Grid item sx={{border: 1, borderColor: 'grey.300', borderRadius: 2, paddingBottom: '15px'}}>
                  <Typography
                    variant="h6"
                    className={titleStyle.title}
                    >
                      Upload Resume
                    </Typography>
                    <input type="file" name="Resume Upload" onChange={this.onResumeUpload}/><br/>
                    {
                      this.state.updateButton ? <input type="submit" name="Update" value="Update"/> : <div></div>
                    }
                  </Grid> <br></br>
                </form>
                </Grid>
            </div>
            <AppFooter />
            </div>
        </Fragment>
    );
  }
}
  
export default Profile;