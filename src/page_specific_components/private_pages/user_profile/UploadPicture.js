import AppHeader from "../../../shared_site_components/page-header/header-and-navebar";
import AppFooter from "../../../shared_site_components/page-footer/footer";
import bodyStyles from "../../../shared_site_css/body_styles/internal-body.module.css";
import React, { Component, Fragment } from "react";
import { Navigate } from "react-router-dom";

class UploadResume extends Component {
  state = {
    selectedFile: null
  }
  fileSelectedHandler = (event) => {
      this.setState({
          selectedFile: event.target.files[0]
      })
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('profile_picture', this.state.selectedFile, this.state.selectedFile.name);
    // send to firebase - Ryan is working on this 
      .then(res =>{
        console.log(res);
      });
  }

  render() {
    return (
      <div className="profile_picture_upload">
        <input type="file" onChange={this.fileSelectedHandler} />
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default UploadResume;
