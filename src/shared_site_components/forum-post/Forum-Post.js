import { Component, Fragment } from "react";
import { Grid, Paper } from "../../../node_modules/@mui/material/index";
import { FormControl } from "../../../node_modules/@mui/material/index";
import { Rating } from "../../../node_modules/@mui/material/index";
import "react-widgets/styles.css";
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import DatePicker from '@mui/lab/DatePicker';
import bodyStyles from "../../shared_site_css/body_styles/internal-body.module.css";
import { Link } from "react-router-dom";

class ForumPost extends Component {
  render() {
    return (
      <Fragment>
        <Grid
          container
          className={bodyStyles.ScrollingContent}
          alignItems="center"
          justify="center"
          direction="column"
          sx={{ marginTop: "0px" }}
        >
          <Grid item xs={1} sm={1} md={1} lg={1} sx={{ marginTop: "10px" }}>
            <Paper sx={{ marginTop: "0px" }}>
              <Grid
                container
                direction="column"
                sx={{ width: "850px", padding: "30px", marginBottom: "30px" }}
              >
                <FormControl>
                  <img width={100} height={100} src={this.props.logoUrl} />
                </FormControl>
                <FormControl>
                  <h3>{this.props.company}</h3>
                </FormControl>
                <FormControl>
                  <h3>{this.props.jobTitle}</h3>
                </FormControl>
                {
                  this.props.myPost ? <>
                    <div></div>
                  </>: <>
                    <h5>
                      <FormControl>
                        <Link to="/User_Profile"
                          state= {{ userId: this.props.userId }}
                        ><h5>{this.props.posterName}</h5>
                        </Link>
                      </FormControl>
                    </h5>
                  </>
                }
                <FormControl>
                  <ul>
                    {(this.props.characteristics || []).map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </FormControl>
                <FormControl>
                  <h3>{this.props.paymentType}</h3>
                </FormControl>
                <FormControl>
                  <p>{this.props.description}</p>
                </FormControl>
                <FormControl>
                  <h3>{this.props.startDate}</h3>
                </FormControl>
                <FormControl>
                  <h3>{this.props.endDate}</h3>
                </FormControl>
                <FormControl>
                  <h5>{this.props.mondayTime}</h5>
                </FormControl>
                <FormControl>
                  <h5>{this.props.tuesdayTime}</h5>
                </FormControl>
                <FormControl>
                  <h5>{this.props.wednesdayTime}</h5>
                </FormControl>
                <FormControl>
                  <h5>{this.props.thursdayTime}</h5>
                </FormControl>
                <FormControl>
                  <h5>{this.props.fridayTime}</h5>
                </FormControl>
                <FormControl>
                  <h5>{this.props.saturdayTime}</h5>
                </FormControl>
                <FormControl>
                  <h5>{this.props.sundayTime}</h5>
                </FormControl>
                <FormControl>
                  <h3><Rating value={this.props.rating} readOnly/></h3>
                </FormControl>
                {
                  this.props.myPost ? <>
                    <h5>
                      <a href="/Post_Edit">Edit Post</a>
                    </h5>
                  </>: <>
                    <div></div>
                  </>
                }
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default ForumPost;
