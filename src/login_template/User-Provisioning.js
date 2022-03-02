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
                <h4 className={regStyles.registrationHeadings}>Fill out the form below to create an account<hr style={{color: '#ffffff'}}></hr><span style={{fontSize: '19px'}}>The <span className={regStyles.requiredAsterisk}>*</span> is for required fields.</span></h4>
                <form onSubmit={this.onSubmit}>
                  <table className={regStyles.registrationTable}>
                    <tbody>
                      <tr>
                        <td style={{fontWeight: 'bold'}}>Full Name<span className={regStyles.requiredAsterisk}>* </span></td>
                        <td><input className={regStyles.textRegistrationEntries} type="fullName" placeholder="Enter your full name"/><br/></td>
                      </tr>
                      <tr>
                        <td style={{fontWeight: 'bold'}}>E-mail<span className={regStyles.requiredAsterisk}>* </span></td>
                        <td><input className={regStyles.textRegistrationEntries} type="email" placeholder="Enter your email"/><br/></td>
                      </tr>
                      <tr>
                        <td style={{fontWeight: 'bold'}}>Password<span className={regStyles.requiredAsterisk}>* </span></td>
                        <td><input className={regStyles.textRegistrationEntries} type="password" placeholder="Enter your password"/><br/></td>
                      </tr>
                      <tr>
                        <td style={{fontWeight: 'bold'}}>Re-type Password<span className={regStyles.requiredAsterisk}>* </span></td>
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