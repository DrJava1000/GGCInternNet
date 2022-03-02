import styles from './Login.module.css';
import AppHeader from './page-header/header-and-navebar';
import bodyStyles from './internal-body.module.css';
import AppFooter from './page-footer/footer';
import React, { Component, Fragment, } from "react";

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
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = 
    {
      accountToLaunch : "", // username to login with
      accountLoginError : "", // username/password error message if username/password wrong
      accountPassword : "", // password to login with
    }
  }

  /**
   * @name onChangeUsername
   * Username Change Handler: Save Updated Username in Portal State
   * @param {Event} e
   */
  onChangeUsername(e) 
  {
    this.setState
    (
      {
        accountToLaunch : e.target.value
      }
    );
  }

  /**
   * @name onChangePassword
   * Password Change Handler: Save Updated Password in Portal State
   * @param {Event} e
   */
  onChangePassword(e) 
  {
    this.setState
    (
      {
        accountPassword : e.target.value
      }
    );
  }

  /**
   * @name onSubmit
   * Login: Validate Username/Password and Login if Successful, Set Error Message If Not
   * @param {Event} e
   */
  onSubmit(e)
  { 
    /* Here, we will interact with Firebase to authenticate user.*/
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
            }/*,
            {
              'text': "Admin Portal",
              'link': "/Admin_Portal"
            },*/
          ]
        }
        />
        <div className={bodyStyles.ScrollingContent}>
          <div className={styles.bodyFamily}>
            <span className={styles.accountError}>{this.state.accountLoginError}</span><br/>
              <div className={styles.loginForm}>
                <form onSubmit={this.onSubmit}>
                    <div className={styles.prompt}>Username</div>
                    <input className={styles.username} type="text" placeholder="Enter your Username" onChange={this.onChangeUsername}/><br/>
                    <div className={styles.prompt}>Password</div>
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
  
export default Portal;