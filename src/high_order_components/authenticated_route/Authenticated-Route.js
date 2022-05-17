import React from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/authentication/AuthContext";

/**
 * @name AuthenticatedRoute
 * @author Ryan Gambrell
 * @todo Purpose: HOC used for Wrapping Private (Login-Locked) Pages and Routes
 * @param Component React Component for Private Page
 * @returns none
 */
class AuthenticatedRoute extends React.Component { 
  static contextType = AuthContext;

  /**
   * @name render
   * @author Ryan Gambrell
   * @todo Purpose: Returns the Page or Default Redirect if Page Access Isn't Allowed
   * @param none
   * @returns none
  */
  render() {
    // If not logged-in, redirect back to login portal
    if(!this.context.isLoggedIn){
      return <Navigate to='/Portal'/>; 
    // If logged in, proceed to page
    }else{
      return <this.props.wrappedComponent {...this.props.wrappedComponentProps}/>;
    }
  }
}

export default AuthenticatedRoute;