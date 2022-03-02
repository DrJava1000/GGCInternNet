import AppHeader from './page-header/header-and-navebar';
import bodyStyles from './internal-body.module.css';
import regStyles from './Registration.module.css'; 
import AppFooter from './page-footer/footer';
import React, { Component, Fragment, } from "react";

class UserProvisioning extends Component{
    
  render(){
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
            <div className={bodyStyles.PageBody}>
              <div>
                <h3 className={regStyles.registrationHeadings}>To setup a new user, fill out the form below</h3>
                <h5 className={regStyles.registrationHeadings}>The * is for required fields.</h5>
                <form onSubmit={this.onSubmit}>
                  <table className={regStyles.registrationTable}>
                    <tbody>
                    <tr>
                        <td>E-mail<span className={regStyles.requiredAsterisk}>*</span>:</td>
                        <td><input className={regStyles.textRegistrationEntries} type="email" placeholder="Enter your email"/><br/></td>
                      </tr>
                      <tr>
                        <td>Password<span className={regStyles.requiredAsterisk}>*</span>:</td>
                        <td><input className={regStyles.textRegistrationEntries} type="password" placeholder="Enter your password"/><br/></td>
                      </tr>
                      <tr>
                        <td>Re-type Password<span className={regStyles.requiredAsterisk}>*</span>:</td>
                        <td><input className={regStyles.textRegistrationEntries} type="password" placeholder="Enter your password"/><br/></td>
                      </tr>
                    </tbody>
                  </table>
                  <input className={regStyles.registrationButton} type="submit" name="Create" value="Create Account"/>
                </form>
              </div>
            </div>
            <AppFooter />
          </div>
        </Fragment>
      );
  }
}
  
export default UserProvisioning;