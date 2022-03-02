import styles from './header-and-navebar.module.css';
import internNetLogo from '../images/Grizzly InternNET Logo Banner.png';
import React, { Component } from "react";
import { Link } from '@material-ui/core';
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

                {/* InternNet Logo*/}
                <Link href="/">
                    <div className={styles.IconAndPageIdentifier}>
                        <img src={internNetLogo} className={styles.NgfLogo} alt="logo"/>
                    </div>
                </Link>


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
    return ( // for normal pages, create nav option here
        <li><a href={props.navLink}>{props.navText}</a></li>
    )
}

export default AppHeader;