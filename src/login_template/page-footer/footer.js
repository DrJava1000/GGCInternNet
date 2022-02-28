import styles from './footer.module.css';
import React from "react";

/**
 * @class AppFooter
 * @author Ryan Gambrell
 * Functional React Component for 404 Error Page
 * @param props options passed to this component
 */
const AppFooter = function NavBar(props)
{ // AppFooter Functional Component's NavBar function is ill-named (footer IS NOT navigation bar)
    return (
        <footer className={styles.FooterWrapper}>
            <div className={styles.FooterText}>@Copyright {new Date().getFullYear()} Next Generation Focus, Inc.</div>
        </footer>
    )
}

export default AppFooter;