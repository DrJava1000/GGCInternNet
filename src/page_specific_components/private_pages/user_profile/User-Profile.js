import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import { loadUserProfile, updateUserProfile } from '../../../firebase/ops/profile';
import React, { Component, Fragment, } from "react";
import { Navigate } from "react-router-dom";
import { ggc_degrees } from '../../../shared_js_modules/majors_and_concentrations';
import { Button, Grid, MenuItem } from '../../../../node_modules/@mui/material/index';
import { TextField } from '../../../../node_modules/@mui/material/index';
import { Typography } from '../../../../node_modules/@mui/material/index';
import { Select } from '../../../../node_modules/@mui/material/index';
import titleStyle from '../../../shared_site_css/button_styles/Button.module.css';
import AuthContext from '../../../context/authentication/AuthContext';
import { deleteUserProfile } from '../../../firebase/ops/profile';
import { Dialog, DialogTitle, DialogActions } from '../../../../node_modules/@mui/material/index';

/**
 * @class Profile
 * React Component for the Profile Page
 */
class Profile extends Component{
  static contextType = AuthContext;
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
    this.onDeletePostDialogClick = this.onDeletePostDialogClick.bind(this);
    this.onPostDeletionConfirmation = this.onPostDeletionConfirmation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      
      // User profile attributes
      name : "",
      pic : "", 
      picUrl: "",
      major : "",
      concentration : "",
      resume : "",
      resumeUrl: "",
      downloadResumePreview: false,

      // Page-specific properties
      concentrationList: [],
      updateButton : false,
      
      // Passed in user (for viewing other profiles)
      locationState: this.props.location.state,
      
      // Do we open the profile deletion dialog
      openDeletionConfirmation: false,
      // Do we redirect to main feed programmatically 
      // (after profile deletion)
      redirectToMainFeed: false
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
      id: this.context.currentUserID,
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

  /**
   * @name onPostDeletionConfirmation
   * @author Ryan Gambrell
   * Handles when the Admin confirms that they want to delete the current student (and their profile)
   */
   onPostDeletionConfirmation() {
    deleteUserProfile(this.state.locationState.userId).then(() => {
      this.setState({
        redirectToMainFeed: true,
      });
    });
  }

  /**
   * @name onDeletePostDialogClick
   * @author Ryan Gambrell
   * Handles when the Admin decides to cancel their profile deletion attempt
   */
  onDeletePostDialogClick() {
    this.setState({
      openDeletionConfirmation: !this.state.openDeletionConfirmation,
    });
  }

  componentDidMount(){
    let userDetails;
    if(this.state.locationState)
      userDetails = loadUserProfile(this.state.locationState.userId);
    else
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
  }
 
  render(){
    if(this.state.redirectToMainFeed){
      return (<Navigate to='/Main_Feed'/>);
    }else{
      return (
          <Fragment>
              {
                !this.state.locationState ? <>
                <AppHeader navBarContents={[{
                  'text': "Main Forum",
                  'link': "/Main_Feed"
                  },{
                      'text': "Profile",
                      'link': "/User_Profile"
                  },{
                      'text': "My Posts",
                      'link': "/My_Posts_Feed",
                  },{
                      'text': "Logout",
                      'link': "Logout"
                }]}/>
                </> : 
                <>
                <AppHeader navBarContents={[{
                  'text': "Main Forum",
                  'link': "/Main_Feed"
                  },{
                      'text': "Profile",
                      'link': "/User_Profile"
                  },{
                      'text': "My Posts",
                      'link': "/My_Posts_Feed",
                  },{
                      'text': "Logout",
                      'link': "Logout"
                }]}/>
                </>
              }
              <div className={bodyStyles.ScrollingContent}>
              <div className={bodyStyles.profileBackground}>
              <div className={bodyStyles.profileBody}>
              <Grid alignItems="center" justify="center" direction="column" sx={{minWidth:'50%'}}>
                  <form onSubmit={this.onSubmit}>
                    <Grid item sx={{border: 1, borderColor: '#c4c4c4', borderRadius: 2, paddingBottom: '15px'}}>
                      <Typography
                      variant="h6"
                      className={titleStyle.title}
                      >
                        Profile Picture
                      </Typography>
                      <img src={this.state.picUrl} style={{paddingTop:"15px", height:"175px", width:"175px"}} /><br/>
                      {
                        !this.state.locationState ? <><input type="file" name="Profile Picture Upload" onChange={this.onPicUpload}/></> :
                        <><div></div></>
                      }
                    </Grid> <br></br>

                    <Grid item>
                      <Typography
                      variant="h6"
                      className={titleStyle.title}
                      >
                        Full Name
                      </Typography>
                      {
                      !this.state.locationState ? <>
                        <TextField
                          type="text"
                          inputProps={{
                            style: { textAlign: 'center' },
                          }}
                          sx={{
                            width: '100%'
                          }}
                          value={this.state.name}
                          onChange={this.onNameChange}
                        />
                      </>
                      : <>
                        <TextField
                          type="text"
                          inputProps={{
                            style: { textAlign: 'center' },
                            readOnly: true,
                            disabled: true
                          }}
                          sx={{
                            width: '100%'
                          }}
                          value={this.state.name}
                        />
                      </>
                    }
                    </Grid> <br></br>
              
                    <Grid item>
                      <Typography
                      variant="h6"
                      className={titleStyle.title}
                      >
                        Major
                      </Typography>
                      {
                      !this.state.locationState ? <>
                        <Select
                          value={this.state.major}
                          onChange={this.onMajorChange}
                          sx={{
                            width: '100%'
                          }}>
                          {
                            ggc_degrees.map(degree => <MenuItem key={degree.major} value={degree.major}>{degree.major}</MenuItem>)
                          }
                        </Select>
                      </>
                      : <>
                        <TextField
                          type="text"
                          inputProps={{
                            style: { textAlign: 'center' },
                            readOnly: true,
                            disabled: true
                          }}
                          sx={{
                            width: '100%'
                          }}
                          value={this.state.major}
                        />
                      </>
                    }
                    </Grid> <br></br>
                    
                    <Grid item>
                      <Typography
                      variant="h6"
                      className={titleStyle.title}
                      >
                        Concentration
                      </Typography>
                      {
                      !this.state.locationState ? <>
                        <Select
                          value={this.state.concentration}
                          onChange={this.onConcentrationChange}
                          sx={{
                            width: '100%'
                          }}>
                          {
                            this.state.concentrationList.map(concentration => <MenuItem key={concentration} value={concentration}>{concentration}</MenuItem>)
                          }
                        </Select>
                      </>
                      : <>
                        <TextField
                          type="text"
                          inputProps={{
                            style: { textAlign: 'center' },
                            readOnly: true,
                            disabled: true
                          }}
                          sx={{
                            width: '100%'
                          }}
                          value={this.state.concentration}
                        />
                      </>
                    }
                    </Grid> <br></br>
        
                    <Grid item sx={{border: 1, borderColor: '#c4c4c4', borderRadius: 2}}>
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
                          <><a href={this.state.resumeUrl} style={{textDecoration:'none', paddingTop: '5px', paddingBottom: '5px'}}>Click to Download Resume</a><br /></>
                        }
                      </Button>
                    </Grid> <br></br>
                    {
                      !this.state.locationState ? <>
                        <Grid item sx={{border: 1, borderColor: '#c4c4c4', borderRadius: 2, paddingBottom: '15px'}}>
                          <Typography
                            variant="h6"
                            className={titleStyle.title}
                            >
                              Upload Resume
                          </Typography>
                          <input style={{paddingTop: '15px'}} type="file" name="Resume Upload" onChange={this.onResumeUpload}/>
                        </Grid> 
                      </>
                      : <>
                        <div></div>
                      </>
                    }
                    <br></br>
                    {
                      this.state.updateButton ? <input className={titleStyle.createPostButton} type="submit" name="Update" value="Update"/> : <div></div>
                    }
                    {
                      // Show 'delete' button for profile for Admins
                      // Hide delete option for current Admin (if clicked)
                      this.state.locationState ? 
                        this.context.currentUserRole === 'ADMIN' ?
                          this.context.currentUserID !== this.state.locationState.userId ?
                            /* Post Deletion Dialog*/
                            <div>
                            <input
                              type="button"
                              name="Delete"
                              value="Delete"
                              className={titleStyle.createPostButton}
                              onClick={this.onDeletePostDialogClick}
                            />
                            <Dialog
                              open={this.state.openDeletionConfirmation}
                              onClose={this.onDeletePostDialogClick}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle
                                id="alert-dialog-title"
                                style={{
                                  backgroundColor: "#176748",
                                  fontFamily: "Arial",
                                  color: "white",
                                  fontWeight: "bold",
                                }}
                              >
                                Are you sure you want to DELETE this user, their profile, and all their posts?
                              </DialogTitle>
                              <DialogActions
                                style={{
                                  backgroundColor: "#f2f8f5",
                                  fontFamily: "Arial",
                                }}
                                alignItems="center"
                              >
                                <Button
                                  onClick={this.onPostDeletionConfirmation}
                                  style={{ fontFamily: "Arial" }}
                                  autoFocus
                                >
                                  Yes
                                </Button>
                                <Button
                                  onClick={this.onDeletePostDialogClick}
                                  style={{ fontFamily: "Arial" }}
                                >
                                  No
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div> : <span></span> 
                        : <span></span>
                      : <span></span>
                    }
                  </form>
                  </Grid>
              </div>
              </div>
              <AppFooter />
              </div>
          </Fragment>
      );
    }
  }
}
  
export default Profile;