import AppHeader from '../shared_site_components/page-header/header-and-navebar';
import bodyStyles from './internal-body.module.css';
import regStyles from './Registration.module.css';
import styles from './Login.module.css';
import AppFooter from '../shared_site_components/page-footer/footer';
import { createAccount } from '../firebase/ops/auth';
import React, { Component, Fragment, } from "react";
import {Navigate} from 'react-router-dom';

class UserProvisioning extends Component
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
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRetypePassword = this.onChangeRetypePassword.bind(this); 

    this.state = 
    {
      desiredName: "",
      desiredEmail : "", 
      accountLoginError : "", // username/password error message if username/password wrong
      desiredPassword : "", 
      desiredRetypePassword : '',
      redirectToInternal: false
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

    createAccount(this.state.desiredEmail, this.state.desiredPassword, this.state.desiredName);
  }

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
          <div className={styles.bodySignUp}>
            <h4 className={regStyles.registrationHeadings}>Fill out the form below to create an account<hr style={{color: '#ffffff'}}></hr><span style={{fontSize: '19px'}}>The <span className={regStyles.requiredAsterisk}>*</span> is for required fields.</span></h4>
            <form style={{width:"57.75%"}} onSubmit={this.onSubmit}>
                <table className={regStyles.registrationTable}>
                  <tbody>
                    <tr>
                      <td style={{fontWeight: 'bold'}}>Full Name<span className={regStyles.requiredAsterisk}>* </span></td>
                      <td><input className={regStyles.textRegistrationEntries} type="fullName" 
                      placeholder="Enter your Full Name" onChange={this.onChangeName}/><br/></td>
                    </tr>
                    <tr>
                      <td style={{fontWeight: 'bold'}}>E-mail<span className={regStyles.requiredAsterisk}>* </span></td>
                      <td><input className={regStyles.textRegistrationEntries} type="email"
                      placeholder="Enter your E-mail" onChange={this.onChangeEmail}
                      pattern=".+@ggc\.edu" title="The specified email is invalid. The domain should be @ggc.edu."/><br/></td>
                    </tr>
                    <tr>
                      <td style={{fontWeight: 'bold'}}>Password<span className={regStyles.requiredAsterisk}>*</span>:</td>
                      <td><input className={regStyles.textRegistrationEntries} type="password" 
                        placeholder="Enter your Password" onChange={this.onChangePassword}/><br/></td>
                    </tr>
                    <tr>
                        <td style={{fontWeight: 'bold'}}>Re-enter Password<span className={regStyles.requiredAsterisk}>* </span></td>
                        <td><input className={regStyles.textRegistrationEntries} type="password" 
                        placeholder="Re-enter your Password" onChange={this.onChangeRetypePassword}/><br/></td>
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
}
  
export default UserProvisioning;