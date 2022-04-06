import { Component, Fragment } from "react";
import bodyStyles from "../../../shared_site_css/body_styles/internal-body.module.css";
import titleStyle from "../../../shared_site_css/button_styles/Button.module.css";
import AppHeader from "../../../shared_site_components/page-header/header-and-navebar";
import AppFooter from "../../../shared_site_components/page-footer/footer";
import { createOrEditPost, deletePost } from "../../../firebase/ops/post";
import { Navigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  Rating
} from "../../../../node_modules/@mui/material/index";
import {
  CheckBoxOutlineBlank,
  CheckBox,
} from "../../../../node_modules/@mui/icons-material/index";
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";


const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

class PostCreation extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    //Bindings
    this.onJobTitleChange = this.onJobTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onCompanyChange = this.onCompanyChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onMondayTimeChange = this.onMondayTimeChange.bind(this);
    this.onTuesdayTimeChange = this.onTuesdayTimeChange.bind(this);
    this.onWednesdayTimeChange = this.onWednesdayTimeChange.bind(this);
    this.onThursdayTimeChange = this.onThursdayTimeChange.bind(this);
    this.onFridayTimeChange = this.onFridayTimeChange.bind(this);
    this.onSaturdayTimeChange = this.onSaturdayTimeChange.bind(this);
    this.onSundayTimeChange = this.onSundayTimeChange.bind(this);
    this.onPostDeletionConfirmation = this.onPostDeletionConfirmation.bind(this);
    this.onDeletePostDialogClick = this.onDeletePostDialogClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      jobTitle: this.props.location.state ? this.props.location.state.postDetails.jobTitle : "",
      description: this.props.location.state ? this.props.location.state.postDetails.description : "",
      company: this.props.location.state ? this.props.location.state.postDetails.company : "",
      logoFile: null,
      logoUrl: this.props.location.state ? this.props.location.state.postDetails.logoUrl : "",
      selectedCharacteristics: this.props.location.state ? this.props.location.state.postDetails.characteristics : [],
      payment: this.props.location.state ? this.props.location.state.postDetails.paymentType : "Paid",
      startDate: this.props.location.state ? new Date(this.props.location.state.postDetails.startDate) : new Date(),
      endDate: this.props.location.state ? new Date(this.props.location.state.postDetails.endDate) : new Date(),
      rating: this.props.location.state ? this.props.location.state.postDetails.rating : 0,
      mondayTime: this.props.location.state ? this.props.location.state.postDetails.mondayTime : "N/A",
      tuesdayTime: this.props.location.state ? this.props.location.state.postDetails.tuesdayTime : "N/A",
      wednesdayTime: this.props.location.state ? this.props.location.state.postDetails.wednesdayTime : "N/A",
      thursdayTime: this.props.location.state ? this.props.location.state.postDetails.thursdayTime : "N/A",
      fridayTime: this.props.location.state ? this.props.location.state.postDetails.fridayTime : "N/A",
      saturdayTime: this.props.location.state ? this.props.location.state.postDetails.saturdayTime : "N/A",
      sundayTime: this.props.location.state ? this.props.location.state.postDetails.sundayTime : "N/A",
      id: this.props.location.state ? this.props.location.state.postDetails.id : "",
      openDeletionConfirmation: false,
      editingFinished: false,
    };
  }

  onJobTitleChange(e) {
    this.setState({
      jobTitle: e.target.value,
    });
  }

  onCompanyChange(e) {
    this.setState({
      company: e.target.value,
    });
  }

  onDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onStartDateChange(e, date) {
    this.setState({
        startDate: date
    });
  }

  onEndDateChange(e, date) {
    this.setState({
        endDate: date
    });
  }

  onRatingChange(e) {
    this.setState({
        rating: e.target.value
    });
  }

  onMondayTimeChange(e) {
    this.setState({
        mondayTime: e.target.value
    });
  }

  onTuesdayTimeChange(e) {
    this.setState({
        tuesdayTime: e.target.value
    });
  }

  onWednesdayTimeChange(e) {
    this.setState({
        wednesdayTime: e.target.value
    });
  }

  onThursdayTimeChange(e) {
    this.setState({
        thursdayTime: e.target.value
    });
  }

  onFridayTimeChange(e) {
    this.setState({
        fridayTime: e.target.value
    });
  }

  onSaturdayTimeChange(e) {
    this.setState({
        saturdayTime: e.target.value
    });
  }

  onSundayTimeChange(e) {
    this.setState({
        sundayTime: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    createOrEditPost({
      id: this.state.id,
      userId: this.context.currentUserID,
      jobTitle: this.state.jobTitle,
      description: this.state.description,
      logoFile: this.state.logoFile,
      company: this.state.company,
      characteristics: this.state.selectedCharacteristics,
      paymentType: this.state.payment,
      startDate: new Date(this.state.startDate).toISOString().substring(0, 10),
      endDate: new Date(this.state.endDate).toISOString().substring(0, 10),
      rating: this.state.rating,
      mondayTime: this.state.mondayTime,
      tuesdayTime: this.state.tuesdayTime,
      wednesdayTime: this.state.wednesdayTime,
      thursdayTime: this.state.thursdayTime,
      fridayTime: this.state.fridayTime,
      saturdayTime: this.state.saturdayTime,
      sundayTime: this.state.sundayTime
    });

    this.setState({
      editingFinished: true,
    });
  }

  onFileUpload = (e) => {
    // this.onProfileModification();
    this.setState({
      logoFile: e.target.files[0],
      logoUrl: URL.createObjectURL(e.target.files[0]),
    });
  };

  handleCharacteristicsChange = (e, value) => {
    if (value.length <= 3) {
      this.setState({ selectedCharacteristics: value });
    }
  };

  handleChpaymentChange = (e, value) => {
    this.setState({ payment: e.target.value });
  };

  onPostDeletionConfirmation(){
    deletePost(this.state.id);
    this.setState({
      editingFinished: true
    });
  }

  onDeletePostDialogClick(){
    this.setState({
      openDeletionConfirmation: !this.state.openDeletionConfirmation
    })
  }

  componentDidMount(){
    if(this.props.operation === "edit_and_delete"){
      this.setState({
        id: this.props.location.state.postDetails.id
      });
    }
  }

  render() {
    const { logoUrl } = this.state;
    if (this.state.editingFinished) {
      return <Navigate to="/Main_Feed" />;
    } else {
      return (
        <Fragment>
          <AppHeader
            navBarContents={[
              {
                text: "Main Forum",
                link: "/Main_Feed",
              },
              {
                text: "Profile",
                link: "/User_Profile",
              },
              {
                text: "My Posts",
                link: "/My_Posts_Feed",
              },
              {
                text: "Logout",
                link: "Logout",
              },
            ]}
          />
          <div className={bodyStyles.ScrollingContent}>
            <div className={bodyStyles.createPostBody}>
              <Grid
                alignItems="center"
                justify="center"
                direction="column"
                sx={{
                  minWidth: "40%",
                  backgroundColor: "#ffffff",
                  paddingLeft: "40px",
                  paddingRight: "40px",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  marginTop:"30px",
                  marginBottom:"30px",
                  borderRadius: "5px"
                }}
              >
                <Typography variant="h6" className={titleStyle.standaloneTitle}>
                  {
                    this.props.operation === "create" ?
                      <span>Create a Forum Post</span> :
                      <span>Edit Your Forum Post</span>
                  }
                </Typography>

                <div style={{height: "15px"}}></div>

                <form onSubmit={this.onSubmit}>
                <Grid item sx={{border: 1, borderColor: '#c4c4c4', borderRadius: 2, paddingBottom: '15px', paddingLeft: '15px', marginTop: '15px', textAlign: 'left'}}>
                    <p style={{fontSize:"15.5px", color: "#666666", fontFamily:"Arial"}}>Company Logo *</p>
                    <input
                      type="file"
                      name="Logo"
                      onChange={this.onFileUpload}
                    />
                  {logoUrl && (
                    <img
                      src={logoUrl}
                      style={{
                        paddingTop: "15px",
                        height: "175px",
                        width: "175px",
                      }}
                    />
                  )}
                </Grid>

                <br></br>

                  <Grid item>
                    <TextField
                      type="text"
                      inputProps={{
                        style: { textAlign: "center" },
                      }}
                      sx={{
                        width: "100%",
                      }}
                      onChange={this.onCompanyChange}
                      label={"Company"}
                      value={this.state.company}
                      required
                    />
                  </Grid><br></br>
                  
                  <Grid item>
                    <TextField
                      type="text"
                      inputProps={{
                        style: { textAlign: "center" },
                      }}
                      sx={{
                        width: "100%",
                      }}
                      onChange={this.onJobTitleChange}
                      value={this.state.jobTitle}
                      label={"Job Title"}
                      required
                    />
                  </Grid>{" "}
                  <br></br>
                  <Grid item>
                    <Autocomplete
                      multiple
                      required
                      onChange={this.handleCharacteristicsChange}
                      options={[
                        "Insightful Mentors",
                        "Entry-Level Friendly",
                        "Pleasant Work Culture",
                        "Helpful Resources",
                        "Competitive Pay",
                        "Great Benefits",
                        "Supportive Team Members",
                        "Heavy Workload",
                        "Expected Overtime",
                        "Poor Management",
                        "Insufficient Learning Opportunities",
                      ]}
                      value={this.state.selectedCharacteristics}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Job Characteristics *"
                          placeholder="Select 3 Characteristics"
                        />
                      )}
                    />
                  </Grid>
                  <br></br>
                  <Grid item sx={{border: 1, borderColor: '#c4c4c4', borderRadius: 2, paddingBottom: '15px', paddingLeft: '15px', marginTop: '15px', textAlign: 'left'}}>
                  <p style={{fontSize:"15.5px", color: "#666666", fontFamily:"Arial"}}>Internship Payment Type *</p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.payment}
                      label="payment Type"
                      onChange={this.handleChpaymentChange}
                      required
                      style ={{width: "97.25%"}}
                    >
                      <MenuItem value={"Paid"}>Paid</MenuItem>
                      <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
                      <MenuItem value={"Stipend-Based"}>Stipend-Based</MenuItem>
                      <MenuItem value={"N/A"}>N/A</MenuItem>
                    </Select>
                  </Grid>
                  <br></br>
                  <Grid item>
                    <TextField
                      type="text"
                      inputProps={{
                        style: { textAlign: "center" },
                      }}
                      sx={{
                        width: "100%",
                      }}
                      label={"Job Description"}
                      value={this.state.description}
                      onChange={this.onDescriptionChange}
                      required
                    />
                  </Grid>{" "}
                  <br></br>
                  {/*This is where StartDate goes*/}
                  <Grid item sx={{border: 1, borderColor: '#c4c4c4', borderRadius: 2, paddingBottom: '15px', paddingLeft: '15px', marginTop: '15px', textAlign: 'left'}}>
                    <p style={{fontSize:"15.5px", color: "#666666", fontFamily:"Arial"}}>Start Date *</p>
                    <DatePicker
                        onChange={this.onStartDateChange}
                        defaultValue={this.state.startDate}
                        style={{width: "97.25%", color:"#666666", fontSize:"17px", fontFamily:"Arial"}}
                    />
                    {/*
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker 
                        label="Start Date"
                        onChange={this.onStartDateChange}
                        />
                    </LocalizationProvider>
                    */}
                  </Grid>
                  <br></br>
                  {/*This is where EndDate goes*/}
                  <Grid item sx={{border: 1, borderColor: '#c4c4c4', borderRadius: 2, paddingBottom: '15px', paddingLeft: '15px', marginTop: '15px', textAlign: 'left'}}>
                  <p style={{fontSize:"15.5px", color: "#666666", fontFamily:"Arial"}}>End Date *</p>
                    <DatePicker
                        onChange={this.onEndDateChange}
                        defaultValue={this.state.endDate}
                        style={{width: "97.25%", color:"#666666", fontSize:"17px", fontFamily:"Arial"}}
                    />
                    {/*
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker 
                        label="End Date"
                        onChange={this.onEndDateChange}
                        />
                    </LocalizationProvider>
                    */}
                  </Grid> 
                  <br></br>
                  <Grid item sx={{border: 1, borderColor: '#c4c4c4', borderRadius: 2, paddingBottom: '15px', paddingLeft: '15px', paddingRight: '15px', marginTop: '15px', textAlign: 'left'}}>
                  <p style={{fontSize:"15.5px", color: "#666666", fontFamily:"Arial"}}>Describe Your Average Work Week *</p>
                  <p style={{fontSize:"13px", color: "#9e9e9e", fontFamily:"Arial"}}>i.e. 8:00 AM - 4:00 PM or N/A</p>
                  <div style={{height: "15px"}}></div>
                  {/*This is where Sunday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                      style: { textAlign: 'center', fontSize: '14px', color:'#666666'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Sunday Hours'}
                    onChange={this.onSundayTimeChange}
                    value={this.state.sundayTime}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Monday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                      style: { textAlign: 'center', fontSize: '14px', color:'#666666'}
                    }}
                    sx={{
                        width: '100%',
                    }}
                    label={'Monday Hours'}
                    onChange={this.onMondayTimeChange}
                    value={this.state.mondayTime}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Tuesday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                      style: { textAlign: 'center', fontSize: '14px', color:'#666666'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Tuesday Hours'}
                    onChange={this.onTuesdayTimeChange}
                    value={this.state.tuesdayTime}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Wednesday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                      style: { textAlign: 'center', fontSize: '14px', color:'#666666'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Wednesday Hours'}
                    onChange={this.onWednesdayTimeChange}
                    value={this.state.wednesdayTime}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Thursday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                      style: { textAlign: 'center', fontSize: '14px', color:'#666666'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Thursday Hours'}
                    onChange={this.onThursdayTimeChange}
                    value={this.state.thursdayTime}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Friday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                      style: { textAlign: 'center', fontSize: '14px', color:'#666666'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Friday Hours'}
                    onChange={this.onFridayTimeChange}
                    value={this.state.fridayTime}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Saturday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                      style: { textAlign: 'center', fontSize: '14px', color:'#666666'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Saturday Hours'}
                    onChange={this.onSaturdayTimeChange}
                    value={this.state.saturdayTime}
                    />
                  </Grid>
                  </Grid>
                  <br></br>
                  {/*This is where Rating goes*/}
                  <Grid item sx={{border: 1, borderColor: '#c4c4c4', borderRadius: 2, paddingBottom: '13px', paddingLeft: '15px', marginTop: '15px', textAlign: 'left'}}>
                  <p style={{fontSize:"15.5px", color: "#666666", fontFamily:"Arial"}}>Rate Your Experience *</p>
                    <Rating
                    onChange={this.onRatingChange}
                    value={this.state.rating}
                    />
                  </Grid>
                  <br></br>
                  {
                    this.props.operation === "create" ? (
                    <input
                      className={titleStyle.createPostButton}
                      type="submit"
                      name="Post"
                      value="Post"
                    />
                  ) : (
                    <Fragment>
                      <input
                        className={titleStyle.createPostButton}
                        type="submit"
                        name="Save"
                        value="Save"
                      />
                      <div style={{height: "10px"}}></div>

                      {/* Post Deletion Dialog*/}
                      <div>
                        <input
                          type="button"
                          name="Delete"
                          value="Delete"
                          className={titleStyle.createPostButton} 
                          onClick={this.onDeletePostDialogClick}
                        />
                        <Dialog
                          open={this.state.openDeletionConfirmation}
                          onClose={this.onDeletePostDialogClick}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title" style={{backgroundColor:"#176748", fontFamily:"Arial", color:"white", fontWeight:"bold"}}>
                            Are you sure you want to DELETE this post?
                          </DialogTitle>
                          <DialogActions style={{backgroundColor:"#f2f8f5", fontFamily:"Arial"}} alignItems="center">
                            <Button onClick={this.onPostDeletionConfirmation} style={{fontFamily:"Arial"}} autoFocus>
                              Yes
                            </Button>
                            <Button onClick={this.onDeletePostDialogClick} style={{fontFamily:"Arial"}}>No</Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </Fragment>
                  )}
                </form>
              </Grid>
            </div>
            <AppFooter />
          </div>
        </Fragment>
      );
    }
  }
}

export default PostCreation;
