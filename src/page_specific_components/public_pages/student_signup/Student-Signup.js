import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import regStyles from './Registration.module.css';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import { createAccount } from '../../../firebase/ops/auth';
import React, { Component, Fragment, } from "react";
import AuthContext from '../../../context/authentication/AuthContext';
import { Snackbar, Alert } from '../../../../node_modules/@mui/material/index';

class StudentSetup extends Component
{
  static contextType = AuthContext;
  /**
   * @name Portal
   * Initialize Portal State Variables and Bind Methods
   * @param props options passed to this component
   */
  constructor(props) 
  {
    super(props);

    // This Bindings (required for 'this' keyword usage in some methods)
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRetypePassword = this.onChangeRetypePassword.bind(this); 
    this.onSignupErrorSnackbarFade = this.onSignupErrorSnackbarFade.bind(this);

    this.state = 
    {
      // Form-specific attributes
      desiredName: "",
      desiredEmail : "", 
      desiredPassword : "", 
      desiredRetypePassword : '',

      // Rendering attributes
      accountSignupError: '',
      showSignupErrorSnackbar: false
    }
  }

  /**
  * @name onChangeName
  * Email Change Handler: Save Updated Name in Portal State
  * @param {Event} e
  */
   onChangeName(e) 
   {
     this.setState({
       desiredName : e.target.value
     });
   }
 
  /**
  * @name onChangeEmail
  * Email Change Handler: Save Updated Email in Portal State
  * @param {Event} e
  */
  onChangeEmail(e) 
  {
    this.setState({
      desiredEmail : e.target.value
    });
  }
 
  /**
  * @name onChangePassword
  * Password Change Handler: Save Updated Password in Portal State
  * @param {Event} e
  */
  onChangePassword(e) 
  {
    this.setState({
      desiredPassword : e.target.value
    });
  }

  /**
  * @name onChangeRetypePassword
  * Password Retype Change Handler: Save Updated Retype Password in Portal State
  * @param {Event} e
  */
  onChangeRetypePassword(e) 
  {
    this.setState({
      desiredRetypePassword : e.target.value
    });
  }

  /**
   * @name onSignupErrorSnackbarFade
   * Callback that's used to disable signup error snackbar
   * after 5 seconds.
   */
   onSignupErrorSnackbarFade(){
    this.setState({
      showSignupErrorSnackbar: false
    })
  }

  /**
   * @name onSubmit
   * Create Account:
   * @param {Event} e
   */
  onSubmit(e)
  { 
    e.preventDefault(); 
    
    if(!this.state.email)
    {
      this.setState({
        redirectToInternal : true
      });
    }

    createAccount(this.state.desiredEmail, this.state.desiredPassword, this.state.desiredName)
    .then(userInfo => {
      // Check for errors but
      // the only failing check could one for an already-existing email. 
      // This may not be an accurate assumption though.
      if(userInfo.signupError){
        if(userInfo.signupError.code === "auth/email-already-in-use")
          this.setState({
            accountSignupError: "Email already exists.",
            showSignupErrorSnackbar: true
          })
      }else{
        // Login locally (store logged-in user's id and role)
        // The role will be needed for page routing. 
        this.context.login(userInfo.id, userInfo.role);
      }
    });
  }

  render()
  {
    return (
      <Fragment>
        <AppHeader navBarContents=
        {
          [
            {
              'text': "Home",
              'link': "/"
            }
          ]
        }
        />
      <div className={bodyStyles.ScrollingContent}>
        <div className={regStyles.bodySignUp}>
            <Snackbar open={this.state.showSignupErrorSnackbar} onClose={this.onSignupErrorSnackbarFade}
              anchorOrigin={{
                vertical: 'top', 
                horizontal: 'center'
              }} 
              autoHideDuration={5000}>
              <Alert severity="error" sx={{ width: '100%', fontSize: 24}}>
                {this.state.accountError}
              </Alert>
            </Snackbar>
          <h4 className={regStyles.registrationHeadings}>Fill out the form below to create an account<hr style={{color: '#ffffff'}}></hr>
            <span style={{fontSize: '19px'}}>
              The <span className={regStyles.requiredAsterisk}>*</span> is for required fields.<br />
              Your password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, and it may contain special characters. 
            </span>
          </h4>
          <form style={{width:"57.75%"}} onSubmit={this.onSubmit}>
              <table className={regStyles.registrationTable}>
                <tbody>
                  <tr>
                    <td style={{fontWeight: 'bold'}}>Full Name<span className={regStyles.requiredAsterisk}>* </span></td>
                    <td><input className={regStyles.textRegistrationEntries} type="fullName" 
                    placeholder="Enter your Full Name" onChange={this.onChangeName} required/><br/></td>
                  </tr>
                  <tr>
                    <td style={{fontWeight: 'bold'}}>E-mail<span className={regStyles.requiredAsterisk}>* </span></td>
                    <td><input className={regStyles.textRegistrationEntries} type="email"
                    placeholder="Enter your E-mail" onChange={this.onChangeEmail}
                    pattern=".+@ggc\.edu" title="The specified email is invalid. The domain should be @ggc.edu." required/><br/></td>
                  </tr>
                  <tr>
                    <td style={{fontWeight: 'bold'}}>Password<span className={regStyles.requiredAsterisk}>*</span></td>
                    <td><input className={regStyles.textRegistrationEntries} type="password" 
                      pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" title="Password is not complex."
                      placeholder="Enter your Password" onChange={this.onChangePassword} required/><br/></td>
                  </tr>
                  <tr>
                      <td style={{fontWeight: 'bold'}}>Re-enter Password<span className={regStyles.requiredAsterisk}>* </span></td>
                      <td><input className={regStyles.textRegistrationEntries} type="password" 
                      pattern={this.state.desiredPassword} title="Passwords should be the same."
                      placeholder="Re-enter your Password" onChange={this.onChangeRetypePassword} required/><br/></td>
                    </tr>
                </tbody>
              </table>
              <input className={regStyles.registrationButton} type="submit" name="Create" value="Create Account"/>
            </form>
        </div>
        <AppFooter />
      </div>
      </Fragment>
    );
  }
}
  
export default StudentSetup;