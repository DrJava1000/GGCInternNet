import { Component, Fragment } from "react";
import bodyStyles from "../../../shared_site_css/body_styles/internal-body.module.css";
import titleStyle from "../../../shared_site_css/button_styles/Button.module.css";
import AppHeader from "../../../shared_site_components/page-header/header-and-navebar";
import AppFooter from "../../../shared_site_components/page-footer/footer";
import { createPost } from "../../../firebase/ops/post";
import { Navigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import {
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
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import DatePicker from '@mui/lab/DatePicker';

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
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      jobTitle: "",
      description: "",
      company: "",
      feedPosts: [],
      successfulPost: false,
      logoFile: null,
      logoUrl: "",
      selectedCharacteristics: [],
      payment: "",
      startDate: null,
      endDate: null,
      rating: null,
      mondayTime: "N/A",
      tuesdayTime: "N/A",
      wednesdayTime: "N/A",
      thursdayTime: "N/A",
      fridayTime: "N/A",
      saturdayTime: "N/A",
      sundayTime: "N/A",
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

    createPost({
      userId: this.context.currentUserID,
      jobTitle: this.state.jobTitle,
      description: this.state.description,
      logoFile: this.state.logoFile,
      company: this.state.company,
      characteristics: this.state.selectedCharacteristics,
      paymentType: this.state.payment,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
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
      successfulPost: true,
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

  render() {
    const { logoUrl, payment } = this.state;
    if (this.state.successfulPost) {
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
                }}
              >
                <Typography variant="h6" className={titleStyle.standaloneTitle}>
                  Create a Forum Post
                </Typography>
                <br></br>
                <form onSubmit={this.onSubmit}>
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
                      required
                    />
                  </Grid>{" "}
                  <Grid item>
                    Company Logo:{" "}
                    <input
                      type="file"
                      name="Logo"
                      onChange={this.onFileUpload}
                    />
                  </Grid>
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
                      style={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Job Characteristics"
                          placeholder="Select 3 characteristics"
                        />
                      )}
                    />
                  </Grid>
                  <br></br>
                  <Grid>
                    <InputLabel id="demo-simple-select-label">
                      Internship Payment Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={payment}
                      label="payment Type"
                      onChange={this.handleChpaymentChange}
                      required
                    >
                      <MenuItem value={"Paid"}>Paid</MenuItem>
                      <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
                      <MenuItem value={"Stipend-Based"}>Stipend-Based</MenuItem>
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
                      onChange={this.onDescriptionChange}
                      required
                    />
                  </Grid>{" "}
                  <br></br>
                  {/*This is where StartDate goes*/}
                  <Grid item>
                    Start Date
                    <DatePicker
                        defaultValue={new Date()}
                        onChange={this.onStartDateChange}
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
                  <Grid item>
                    End Date
                    <DatePicker
                        defaultValue={new Date()}
                        onChange={this.onEndDateChange}
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
                  {/*This is where Monday Time goes*/}
                  <Grid item>
                    Describe Your Average Work Week:
                    <TextField
                    type="text"
                    inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Monday Hours'}
                    onChange={this.onMondayTimeChange}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Tuesday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Tuesday Hours'}
                    onChange={this.onTuesdayTimeChange}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Wednesday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Wednesday Hours'}
                    onChange={this.onWednesdayTimeChange}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Thursday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Thursday Hours'}
                    onChange={this.onThursdayTimeChange}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Friday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Friday Hours'}
                    onChange={this.onFridayTimeChange}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Saturday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Saturday Hours'}
                    onChange={this.onSaturdayTimeChange}
                    />
                  </Grid>
                  <br></br>
                  {/*This is where Sunday Time goes*/}
                  <Grid item>
                    <TextField
                    type="text"
                    inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    sx={{
                        width: '100%'
                    }}
                    label={'Sunday Hours'}
                    onChange={this.onSundayTimeChange}
                    />
                  </Grid> 
                  <br></br>
                  {/*This is where Rating goes*/}
                  <Grid item>
                    Rate Your Experience
                    <Rating
                    onChange={this.onRatingChange}
                    />
                  </Grid>
                  <br></br>
                  {this.state.title !== "" && this.state.description !== "" ? (
                    <input
                      className={titleStyle.createPostButton}
                      type="submit"
                      name="Post"
                      value="Post"
                    />
                  ) : (
                    <input
                      className={titleStyle.createPostButton}
                      type="submit"
                      name="Post"
                      value="Post"
                      disabled
                    />
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
