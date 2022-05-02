import styles from './Login.module.css';
import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import { login } from '../../../firebase/ops/auth';
import React, { Component, Fragment, } from "react";
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/authentication/AuthContext';
import { Snackbar, Alert } from '../../../../node_modules/@mui/material/index';

/**
 * @class Portal
 * React Component for the Login Portal Page
 */
class Portal extends Component
{
  static contextType = AuthContext
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
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onLoginErrorSnackbarFade = this.onLoginErrorSnackbarFade.bind(this);

    this.state = 
    {
      // Form-specific attributes
      accountEmail : "", // username to login with
      accountPassword : "", // password to login with

      // Rendering attributes
      // Login Errors and Related Snackbar toggle functionality
      accountLoginError : "", // username/password error message if username/password wrong
      showLoginErrorSnackbar: false
    }
  }

  /**
   * @name onChangeEmail
   * Email Change Handler: Save Updated Email in Portal State
   * @param {Event} e
   */
  onChangeEmail(e) 
  {
    this.setState({
      accountEmail : e.target.value
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
      accountPassword : e.target.value
    });
  }

  /**
   * @name onLoginErrorSnackbarFade
   * Callback that's used to disable login error snackbar
   * after 5 seconds.
   */
  onLoginErrorSnackbarFade(){
    this.setState({
      showLoginErrorSnackbar: false
    })
  }

  /**
   * @name onSubmit
   * Login: Validate Email/Password and Login if Successful, Set Error Message If Not
   * @param {Event} e
   */
  onSubmit(e)
  { 
    e.preventDefault(); 
    
    login(this.state.accountEmail, this.state.accountPassword)
    .then(userInfo => {
      // Check for a Firebase error 
      // (and prevent login) if possible.
      // As of this moment, we don't care about the specific
      // kind of error for login, we just report invalid email/password
      if(userInfo.signInError){
        this.setState({
          accountLoginError: 'Invalid email/password combination.',
          showLoginErrorSnackbar: true
        })
      }else{
        this.context.login(userInfo.id, userInfo.role);
      }
    }).catch(error => {
      console.log(error);
    })
  }
    
  /**
   * @name render
   * Renders Consistent Header and Footer and loads Login Portal
   */
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
          <div className={styles.bodyLogIn}>
            <Snackbar open={this.state.showLoginErrorSnackbar} onClose={this.onLoginErrorSnackbarFade}
              anchorOrigin={{
                vertical: 'top', 
                horizontal: 'center'
              }} 
              autoHideDuration={5000}>
              <Alert severity="error" sx={{ width: '100%', fontSize: 24}}>
                {this.state.accountLoginError}
              </Alert>
            </Snackbar>
            <div className={styles.loginForm}>
              <form onSubmit={this.onSubmit}>
                  <div className={styles.prompt}><b>Username</b></div>
                  <input className={styles.username} type="text" placeholder="Enter your Username" onChange={this.onChangeEmail} required/><br/>
                  <div className={styles.prompt}><b>Password</b></div>
                  <input className={styles.password} type="password" placeholder="Enter your Password" onChange={this.onChangePassword} required/><br/>
                  <input className={styles.loginButton} type="submit" name="login" value="Login"/>
              </form>
            </div>
            <Link className={styles.registerPrompt} to="/Signup" style={{textDecoration: 'none'}}>Sign Up</Link>
          </div>
          <AppFooter />
        </div>
        </Fragment>
      );
  }
}
  
export default Portal;