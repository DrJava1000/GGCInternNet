import { Component, Fragment } from "react";
import bodyStyles from "../../../shared_site_css/body_styles/internal-body.module.css";
import titleStyle from "../../../shared_site_css/button_styles/Button.module.css";
import AppHeader from "../../../shared_site_components/page-header/header-and-navebar";
import AppFooter from "../../../shared_site_components/page-footer/footer";
import { createOrEditPost, deletePost } from "../../../firebase/ops/post";
import { Navigate } from "react-router-dom";
import AuthContext from "../../../context/authentication/AuthContext";
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
  Rating
} from "../../../../node_modules/@mui/material/index";
import {
  CheckBoxOutlineBlank,
  CheckBox
} from "../../../../node_modules/@mui/icons-material/index";
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

/**
 * @name PostCreation
 * 
 * This is where the user goes to fill out the necessary fields for a forum post
 */
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
    this.onLikeChange = this.onLikeChange.bind(this);
    this.onPostDeletionConfirmation =
      this.onPostDeletionConfirmation.bind(this);
    this.onDeletePostDialogClick = this.onDeletePostDialogClick.bind(this);
    this.onCreateDateChange = this.onCreateDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      //General attributes
      jobTitle: this.props.location.state
        ? this.props.location.state.postDetails.jobTitle
        : "",
      description: this.props.location.state
        ? this.props.location.state.postDetails.description
        : "",
      company: this.props.location.state
        ? this.props.location.state.postDetails.company
        : "",

      //Logo, for storing and selecting an image on the post
      logoFile: null,
      logoUrl: this.props.location.state
        ? this.props.location.state.postDetails.logoUrl
        : "https://firebasestorage.googleapis.com/v0/b/grizzly-internnet.appspot.com/" + 
          "o/logos%2Fdefault%2Fgrizzly_logo.PNG?alt=media&token=a26efbaa-03ed-49d9-aacb-16e6f43e2870",

      //Choose some pre-set characteristics for the internship
      selectedCharacteristics: this.props.location.state
        ? this.props.location.state.postDetails.characteristics
        : [],
      payment: this.props.location.state
        ? this.props.location.state.postDetails.paymentType
        : "",

      //The dates the user started and ended their internship
      startDate: this.props.location.state
        ? new Date(this.props.location.state.postDetails.startDate)
        : new Date(),
      endDate: this.props.location.state
        ? new Date(this.props.location.state.postDetails.endDate)
        : new Date(),
      
      //Material UI's star rating widget, out of 5 stars
      rating: this.props.location.state
        ? this.props.location.state.postDetails.rating
        : 1,
      
      //Hours worked for each day of the week, all text fields
      mondayTime: this.props.location.state
        ? this.props.location.state.postDetails.mondayTime
        : "",
      tuesdayTime: this.props.location.state
        ? this.props.location.state.postDetails.tuesdayTime
        : "",
      wednesdayTime: this.props.location.state
        ? this.props.location.state.postDetails.wednesdayTime
        : "",
      thursdayTime: this.props.location.state
        ? this.props.location.state.postDetails.thursdayTime
        : "",
      fridayTime: this.props.location.state
        ? this.props.location.state.postDetails.fridayTime
        : "",
      saturdayTime: this.props.location.state
        ? this.props.location.state.postDetails.saturdayTime
        : "",
      sundayTime: this.props.location.state
        ? this.props.location.state.postDetails.sundayTime
        : "",

      //Like counter for the post, to boost visibility
      like: this.props.location.state
        ? this.props.location.state.postDetails.like
        : 1,

      //Date the post was created
      createDate: this.props.location.state
        ? new Date(this.props.location.state.postDetails.createDate)
        : new Date(),
      
      //Primary Key for storing and fetching in Firebase
      id: this.props.location.state
        ? this.props.location.state.postDetails.id
        : "",
      
      //Boolean values for whether or not the user is either done editing their post or wants to delete it (respectively)
      editingFinished: false,
      openDeletionConfirmation: false
    };
  }

  /**
   * @name onJobTitleChange
   * @author Nicholas Porter
   * Changes the text field for the attribute "Job Title"
   * @param {*} e Event
   */
  onJobTitleChange(e) {
    this.setState({
      jobTitle: e.target.value,
    });
  }

  /**
   * @name oCompanyChange
   * @author Nicholas Porter
   * Changes the text fied for the attribute "Company"
   * @param {*} e Event
   */
  onCompanyChange(e) {
    this.setState({
      company: e.target.value,
    });
  }

  /**
   * @name onDescriptionChange
   * @author Nicholas Porter
   * Changes the text field for the attribute "Description"
   * @param {*} e Event
   */
  onDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  /**
   * @name onStartDateChange
   * @author Nicholas Porter
   * Changes the Date field for the attribute "Start Date"
   * @param {*} e Event
   */
  onStartDateChange(e) {
    this.setState({
      startDate: e,
    });
  }

  /**
   * @name onEndDateChange
   * @author Nicholas Porter
   * Changes the Date field for the attribute "End Date"
   * @param {*} e Event
   */
  onEndDateChange(e) {
    this.setState({
      endDate: e,
    });
  }

  /**
   * @name onRatingChange
   * @author Nicholas Porter
   * Changes the Rating field for the attribute "Rating"
   * @param {*} e Event
   */
  onRatingChange(e) {
    this.setState({
      rating: e.target.value,
    });
  }

  /**
   * @name onMondayTimeChange
   * @author Nicholas Porter
   * Changes the text field for the attribute "Monday Time"
   * @param {*} e Event
   */
  onMondayTimeChange(e) {
    this.setState({
      mondayTime: e.target.value,
    });
  }

  /**
   * @name onTuesdayTimeChange
   * @author Nicholas Porter
   * Changes the text field for the attribute "Tuesday Time"
   * @param {*} e Event
   */
  onTuesdayTimeChange(e) {
    this.setState({
      tuesdayTime: e.target.value,
    });
  }

  /**
   * @name onWednesdayTimeChange
   * @author Nicholas Porter
   * Changes the text field for the attribute "Wednesday Time"
   * @param {*} e Event
   */
  onWednesdayTimeChange(e) {
    this.setState({
      wednesdayTime: e.target.value,
    });
  }

  /**
   * @name onThursdayTimeChange
   * @author Nicholas Porter
   * Changes the text field for the attribute "Thursday Time"
   * @param {*} e Event
   */
  onThursdayTimeChange(e) {
    this.setState({
      thursdayTime: e.target.value,
    });
  }

  /**
   * @name onFridayTimeChange
   * @author Nicholas Porter
   * Changes the text field for the attribute "Friday Time"
   * @param {*} e Event
   */
  onFridayTimeChange(e) {
    this.setState({
      fridayTime: e.target.value,
    });
  }

  /**
   * @name onSaturdayTimeChange
   * @author Nicholas Porter
   * Changes the text field for the attribute "Saturday Time"
   * @param {*} e Event
   */
  onSaturdayTimeChange(e) {
    this.setState({
      saturdayTime: e.target.value,
    });
  }

  /**
   * @name onSundayTimeChange
   * @author Nicholas Porter
   * Changes the text field for the attribute "Sunday Time"
   * @param {*} e Event
   */
  onSundayTimeChange(e) {
    this.setState({
      sundayTime: e.target.value,
    });
  }

  /**
   * @name onLikeChange
   * @author Nicholas Porter
   * Changes the integer counter for the aattribute "Like"
   */
  onLikeChange() {
    this.setState({
      like: this.state.like + 1,
    });
  }

  /**
   * @name onCreateDateChange
   * @author Nicholas Porter
   * Changes the Date value for the attribute "Create Date"
   * @param {*} e Event
   */
   onCreateDateChange(e) {
    this.setState({
      createDate: e,
    });
  }

  /**
   * @name onSubmit
   * @author Nicholas Porter
   * When the user clicks the "submit" button on the page, it will create or update the state of the forum post object
   * @param {*} e Event
   */
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
      sundayTime: this.state.sundayTime,
      like: this.state.like,
      createDate: new Date(this.state.createDate).toISOString().substring(0, 10),
      postOperationStatus: this.props.operation
    }).then(() => {
      this.setState({
        editingFinished: true,
      });
    });
  }

  /**
   * @name onFileUpload
   * @author (unknown)
   * Uploads the image submitted to Firebase as a logo
   * @param {*} e Event
   */
  onFileUpload = (e) => {
    // this.onProfileModification();
    this.setState({
      logoFile: e.target.files[0],
      logoUrl: URL.createObjectURL(e.target.files[0]),
    });
  };

  /**
   * @name handleCharacteristicsChange
   * @author (unknown)
   * Handles the amount of characteristics the user can input into the field
   * @param {*} e Event
   * @param {*} value 
   */
  handleCharacteristicsChange = (e, value) => {
    if (value.length <= 3) {
      this.setState({ selectedCharacteristics: value });
    }
  };

  /**
   * @name handleChpaymentChange
   * @author (unknown)
   * Changes the field for the attribute "Payment"
   * @param {*} e Event
   * @param {*} value 
   */
  handleChpaymentChange = (e, value) => {
    this.setState({ payment: e.target.value });
  };

  /**
   * @name onPostDeletionConfirmation
   * @author (unknown)
   * Handles when the user confirms that they want to delete the current forum post object
   */
  onPostDeletionConfirmation() {
    deletePost(this.state.id).then(() => {
      this.setState({
        editingFinished: true,
      });
    });
  }

  /**
   * @name onDeletePostDialogClick
   * @author (unknown)
   * Handles when the user decides to cancel their post deletion attempt
   */
  onDeletePostDialogClick() {
    this.setState({
      openDeletionConfirmation: !this.state.openDeletionConfirmation,
    });
  }

  /**
   * @name componentDidMoutn
   * @author (unknown)
   * (Comment here)
   */
  componentDidMount() {
    if (this.props.operation === "edit_and_delete") {
      this.setState({
        id: this.props.location.state.postDetails.id,
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
                  marginTop: "30px",
                  marginBottom: "30px",
                  borderRadius: "5px",
                }}
              >
                {/*Conditional statement for detecting if the user is 
                on the Main Feed page (CREATE post) or My Posts page (EDIT post)*/}
                <Typography variant="h6" className={titleStyle.standaloneTitle}>
                  {this.props.operation === "create" ? (
                    <span>Create a Forum Post</span>
                  ) : (
                    <span>Edit Your Forum Post</span>
                  )}
                </Typography>

                <div style={{ height: "15px" }}></div>

                {/*Form where all of the attributes are to be filled out by the user*/}
                <form onSubmit={this.onSubmit}>
                  {/*Company Logo selection*/}
                  <Grid
                    item
                    sx={{
                      border: 1,
                      borderColor: "#c4c4c4",
                      borderRadius: 2,
                      paddingBottom: "15px",
                      paddingLeft: "15px",
                      marginTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15.5px",
                        color: "#666666",
                        fontFamily: "Arial",
                      }}
                    >
                      Company Logo *
                    </p>
                    {/* form input to upload a new logo file */}
                    <input
                      type="file"
                      name="Logo"
                      onChange={this.onFileUpload}
                    />
                    {/* if a logo is selected, display it */}
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
                  {/*Company Name*/}
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
                  </Grid>
                  <br></br>
                  {/*Job Title*/}
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
                  {/*Select 3 Characteristics*/}
                  <Grid item>
                    {/* autocomplete input that allows us to select multiple characteristics */}
                    <Autocomplete
                      multiple
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
                          placeholder="Select Exactly 3 Characteristics"
                          // To add validation for checking for exactly 3 characteristics,
                          required={this.state.selectedCharacteristics.length < 3}
                        />
                      )}
                    />
                  </Grid>
                  <br></br>
                  {/*Payment Type*/}
                  <Grid
                    item
                    sx={{
                      border: 1,
                      borderColor: "#c4c4c4",
                      borderRadius: 2,
                      paddingBottom: "15px",
                      paddingLeft: "15px",
                      marginTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15.5px",
                        color: "#666666",
                        fontFamily: "Arial",
                      }}
                    >
                      Internship Payment Type *
                    </p>
                    {/* select internship payment type using material ui select input */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.payment}
                      displayEmpty
                      label="payment Type"
                      onChange={this.handleChpaymentChange}
                      required
                      style={{ width: "97.25%" }}
                    >
                      <MenuItem value={""}>Select an option from below.</MenuItem>
                      <MenuItem value={"Paid"}>Paid</MenuItem>
                      <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
                      <MenuItem value={"Stipend-Based"}>Stipend-Based</MenuItem>
                      <MenuItem value={"N/A"}>N/A</MenuItem>
                    </Select>
                  </Grid>
                  <br></br>
                  {/*Description*/}
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
                  {/*Start Date*/}
                  <Grid
                    item
                    sx={{
                      border: 1,
                      borderColor: "#c4c4c4",
                      borderRadius: 2,
                      paddingBottom: "15px",
                      paddingLeft: "15px",
                      marginTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15.5px",
                        color: "#666666",
                        fontFamily: "Arial",
                      }}
                    >
                      Start Date *
                    </p>
                    <DatePicker
                      onChange={this.onStartDateChange}
                      defaultValue={this.state.startDate}
                      style={{
                        width: "97.25%",
                        color: "#666666",
                        fontSize: "17px",
                        fontFamily: "Arial",
                      }}
                      max={this.state.endDate}
                      inputProps={{
                        component: props => <input {...props} readOnly />
                      }}
                    />
                  </Grid>
                  <br></br>
                  {/*End Date*/}
                  <Grid
                    item
                    sx={{
                      border: 1,
                      borderColor: "#c4c4c4",
                      borderRadius: 2,
                      paddingBottom: "15px",
                      paddingLeft: "15px",
                      marginTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15.5px",
                        color: "#666666",
                        fontFamily: "Arial",
                      }}
                    >
                      End Date *
                    </p>
                    <DatePicker
                      onChange={this.onEndDateChange}
                      defaultValue={this.state.endDate}
                      style={{
                        width: "97.25%",
                        color: "#666666",
                        fontSize: "17px",
                        fontFamily: "Arial",
                      }}
                      inputProps={{
                        component: props => <input {...props} readOnly />
                      }}
                      min={this.state.startDate}
                      max={new Date()}
                    />
                  </Grid>
                  <br></br>
                  {/*All 7 Hours Worked attributes*/}
                  <Grid
                    item
                    sx={{
                      border: 1,
                      borderColor: "#c4c4c4",
                      borderRadius: 2,
                      paddingBottom: "15px",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      marginTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15.5px",
                        color: "#666666",
                        fontFamily: "Arial",
                      }}
                    >
                      Describe Your Average Work Week *
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#9e9e9e",
                        fontFamily: "Arial",
                      }}
                    >
                      i.e. 8:00 AM - 4:00 PM or N/A
                    </p>
                    <div style={{ height: "15px" }}></div>
                    {/*Sunday Time*/}
                    <Grid item>
                      <TextField
                        type="text"
                        inputProps={{
                          style: {
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#666666",
                          },
                        }}
                        sx={{
                          width: "100%",
                        }}
                        label={"Sunday Hours"}
                        onChange={this.onSundayTimeChange}
                        value={this.state.sundayTime}
                        required
                      />
                    </Grid>
                    <br></br>
                    {/*Monday Time*/}
                    <Grid item>
                      <TextField
                        type="text"
                        inputProps={{
                          style: {
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#666666",
                          },
                        }}
                        sx={{
                          width: "100%",
                        }}
                        label={"Monday Hours"}
                        onChange={this.onMondayTimeChange}
                        value={this.state.mondayTime}
                        required
                      />
                    </Grid>
                    <br></br>
                    {/*Tuesday Time*/}
                    <Grid item>
                      <TextField
                        type="text"
                        inputProps={{
                          style: {
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#666666",
                          },
                        }}
                        sx={{
                          width: "100%",
                        }}
                        label={"Tuesday Hours"}
                        onChange={this.onTuesdayTimeChange}
                        value={this.state.tuesdayTime}
                        required
                      />
                    </Grid>
                    <br></br>
                    {/*Wednesday Time*/}
                    <Grid item>
                      <TextField
                        type="text"
                        inputProps={{
                          style: {
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#666666",
                          },
                        }}
                        sx={{
                          width: "100%",
                        }}
                        label={"Wednesday Hours"}
                        onChange={this.onWednesdayTimeChange}
                        value={this.state.wednesdayTime}
                        required
                      />
                    </Grid>
                    <br></br>
                    {/*Thursday Time*/}
                    <Grid item>
                      <TextField
                        type="text"
                        inputProps={{
                          style: {
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#666666",
                          },
                        }}
                        sx={{
                          width: "100%",
                        }}
                        label={"Thursday Hours"}
                        onChange={this.onThursdayTimeChange}
                        value={this.state.thursdayTime}
                        required
                      />
                    </Grid>
                    <br></br>
                    {/*Friday Time*/}
                    <Grid item>
                      <TextField
                        type="text"
                        inputProps={{
                          style: {
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#666666",
                          },
                        }}
                        sx={{
                          width: "100%",
                        }}
                        label={"Friday Hours"}
                        onChange={this.onFridayTimeChange}
                        value={this.state.fridayTime}
                        required
                      />
                    </Grid>
                    <br></br>
                    {/*Saturday Time*/}
                    <Grid item>
                      <TextField
                        type="text"
                        inputProps={{
                          style: {
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#666666",
                          },
                        }}
                        sx={{
                          width: "100%",
                        }}
                        label={"Saturday Hours"}
                        onChange={this.onSaturdayTimeChange}
                        value={this.state.saturdayTime}
                        required
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  {/*Rating (out of 5 stars)*/}
                  <Grid
                    item
                    sx={{
                      border: 1,
                      borderColor: "#c4c4c4",
                      borderRadius: 2,
                      paddingBottom: "13px",
                      paddingLeft: "15px",
                      marginTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15.5px",
                        color: "#666666",
                        fontFamily: "Arial",
                      }}
                    >
                      Rate Your Experience *
                    </p>
                    <Rating
                      onChange={this.onRatingChange}
                      value={this.state.rating}
                    />
                  </Grid>
                  <br></br>
                  {/*Conditional statement for determining if user is Creating or Editing a forum post object*/}
                  {this.props.operation === "create" ? (
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
                      <div style={{ height: "10px" }}></div>

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
                          <DialogTitle
                            id="alert-dialog-title"
                            style={{
                              backgroundColor: "#176748",
                              fontFamily: "Arial",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            Are you sure you want to DELETE this post?
                          </DialogTitle>
                          <DialogActions
                            style={{
                              backgroundColor: "#f2f8f5",
                              fontFamily: "Arial",
                            }}
                            alignItems="center"
                          >
                            <Button
                              onClick={this.onPostDeletionConfirmation}
                              style={{ fontFamily: "Arial" }}
                              autoFocus
                            >
                              Yes
                            </Button>
                            <Button
                              onClick={this.onDeletePostDialogClick}
                              style={{ fontFamily: "Arial" }}
                            >
                              No
                            </Button>
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
