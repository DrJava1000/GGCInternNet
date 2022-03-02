import bodyStyles from './internal-body.module.css';
import React, { Component, Fragment, } from "react";
import { logout } from '../firebase/ops/auth';

class InternalPage extends Component
{
  constructor(props){
    super(props);

    this.state = {
      redirectToPortal: false
    }
  }
  
  onExit()
  { 
    this.setState({
      redirectToInternal : true
    });
    
    logout(); 
  }

  render()
  {
    return (
      <Fragment>
      <div className={bodyStyles.ScrollingContent}>
        <div className={bodyStyles.PageBody}>
          <h1>This is a test internal page. Click <a href="/Portal" onClick={(event) => {event.stopPropagation(); this.onExit()}}>here</a> to logout.</h1>
        </div>
      </div>
      </Fragment>
    );
  }
}
  
export default InternalPage;