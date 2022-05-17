import React from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/authentication/AuthContext";

/**
 * @name PublicRoute
 * @author Ryan Gambrell
 * @todo Purpose: HOC used for Wrapping Public Pages and Routes
 * @param Component React Component for Public Page
 * @returns none
 */
class PublicRoute extends React.Component {
  static contextType = AuthContext;

  /**
   * @name render
   * @author Ryan Gambrell
   * @todo Purpose: Returns the Page or Default Redirect if Page Access Isn't Allowed
   * @param none
   * @returns none
  */
  render() {
    if(this.context.isLoggedIn){
      return <Navigate to='/Main_Feed'/>;
    }else{
      return <this.props.wrappedComponent />;
    }
  }
}

export default PublicRoute;