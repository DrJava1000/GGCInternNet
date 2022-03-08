import styles from './Login.module.css';
import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import { login } from '../../../firebase/ops/auth';
import React, { Component, Fragment, } from "react";
import {Navigate} from 'react-router-dom';

/**
 * @class Portal
 * React Component for the Login Portal Page
 */
class Portal extends Component
{
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

    this.state = 
    {
      accountEmail : "", // username to login with
      accountLoginError : "", // username/password error message if username/password wrong
      accountPassword : "", // password to login with
      redirectToInternal : false
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
   * @name onSubmit
   * Login: Validate Email/Password and Login if Successful, Set Error Message If Not
   * @param {Event} e
   */
  onSubmit(e)
  { 
    e.preventDefault(); 
    
    this.setState({
      redirectToInternal : true
    });
    
    login(this.state.accountEmail, this.state.accountPassword);
  }
    
  /**
   * @name render
   * Renders Consistent Header and Footer and loads Login Portal
   */
  render()
  {
    if(this.state.redirectToInternal)
    {
      return <Navigate to="/InternalPage" />;
    }else
    {
      return (
        <Fragment>
          <AppHeader navBarContents=
          {
            [
              {
                'text': "Home",
                'link': "/"
              }/*,
              {
                'text': "Admin Portal",
                'link': "/Admin_Portal"
              },*/
            ]
          }
          />
          <div className={bodyStyles.ScrollingContent}>
            <div className={styles.bodyLogIn}>
              <span className={styles.accountError}>{this.state.accountLoginError}</span><br/>
                <div className={styles.loginForm}>
                  <form onSubmit={this.onSubmit}>
                      <div className={styles.prompt}><b>Username</b></div>
                      <input className={styles.username} type="text" placeholder="Enter your Username" onChange={this.onChangeEmail}/><br/>
                      <div className={styles.prompt}><b>Password</b></div>
                      <input className={styles.password} type="password" placeholder="Enter your Password" onChange={this.onChangePassword}/><br/>
                      <input className={styles.loginButton} type="submit" name="login" value="Login"/>
                  </form>
                </div>
                <a className={styles.registerPrompt} href="/Signup" style={{textDecoration: 'none'}}>Sign Up</a>
            </div>
            <AppFooter />
          </div>
          </Fragment>
        );
    }
  }
}
  
export default Portal;