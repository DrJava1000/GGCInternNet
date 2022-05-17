import styles from './header-and-navebar.module.css';
import internNetLogo from '../../images/Grizzly InternNET Logo Banner.png';
import React, { Component, useContext } from "react";
import { logout } from '../../firebase/ops/auth.js';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authentication/AuthContext';

/**
 * @class AppHeader
 * This component: acts as a functional component for the navigation bar
 * The AppHeader is customizable and nav bar options can be passed through navBarContents
 */
class AppHeader extends Component
{
    /**
     * @name AppHeader
     * Initialize App Header variables
     * @param props options passed to this component
     */
    constructor(props) 
    {
        super(props);

        this.state = 
        {
            pageTitle : props.pageTitle, // page title
            navBarContents : props.navBarContents, // entries for navbar
        }
    }

  /**
   * @name render
   * Render Page Header
   */
    render()
    {
        return (
            <header className={styles.PageHeader}>

                {/*Grizzly InternNet Logo*/}
                    <div className={styles.IconAndPageIdentifier}>
                        <img src={internNetLogo} className={styles.NgfLogo} alt="Grizzly InternNet" style={{userSelect:'none'}}/>
                    </div>

                {/* App Navigation Bar*/}
                <nav className={styles.AppNav}>
                    <ul>
                        {/* Currently, utilize nav link's text as key identifier for each item in each navbar instance (May change as some point)*/}
                        {
                            this.state.navBarContents.map
                            (
                                clickable => 
                                <NavBarContent key={clickable.text} 
                                navLink={clickable.link} navText={clickable.text} authContext={this.state.authContext}
                                />
                            ) 
                        }
                    </ul>
                </nav>
            </header>
        )
    }
}

/**
 * @name NavBarContent
 * Purpose: Returns UI Nav Entry for Every Specified Nav Option
 * @param props options passed to this component
 */
const NavBarContent = function NavBarContent(props)
{
    // Get context using hook for functional component
    var authContext = useContext(AuthContext);
    
    if(props.navLink === "Logout")
    { // logout on click of logout option 
        return (
            <li><Link to="/Portal" onClick={(e) => {
                logout()
                .then(logoutResponse => {
                    // Logout locally (strips user's login information)
                    // The role will be needed for page routing. 
                    authContext.logout();
                }).catch(error => {
                    console.log(error);
                }) 
                return true
            }} >
                {props.navText}</Link></li>
        )
    }else{
        return ( // for normal pages, create nav option here
            <li><Link to={props.navLink}>{props.navText}</Link></li>
        )
    }
}

export default AppHeader;