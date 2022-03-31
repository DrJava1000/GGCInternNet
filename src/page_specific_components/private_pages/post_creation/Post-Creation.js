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
} from "../../../../node_modules/@mui/material/index";
import {
  CheckBoxOutlineBlank,
  CheckBox,
} from "../../../../node_modules/@mui/icons-material/index";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

class PostCreation extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    //Bindings
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      feedPosts: [],
      successfulPost: false,
      logoFile: null,
      logoUrl: "",
      selectedCharacteristics: [],
      payment: "",
    };
  }

  onTitleChange(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    createPost({
      poster: "rgambrell@ggc.edu",
      title: this.state.title,
      description: this.state.description,
      userId: this.context.currentUserID,
      logoFile: this.state.logoFile,
      characteristics: this.state.selectedCharacteristics,
      paymentType: this.state.payment,
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
                  borderRadius: "15px",
                }}
              >
                <Typography variant="h6" className={titleStyle.standaloneTitle}>
                  Create a Forum Post
                </Typography>
                <br></br>
                <form onSubmit={this.onSubmit}>
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
                      onChange={this.onTitleChange}
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
                      Payment Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={payment}
                      label="payment Type"
                      onChange={this.handleChpaymentChange}
                      required
                    >
                      <MenuItem value={"paid"}>Paid</MenuItem>
                      <MenuItem value={"unpaid"}>Unpaid</MenuItem>
                      <MenuItem value={"stipend"}>Stipend</MenuItem>
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
