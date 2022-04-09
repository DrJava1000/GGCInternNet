import { Component, Fragment } from "react";
import { Grid, Paper } from "../../../node_modules/@mui/material/index";
import { FormControl } from "../../../node_modules/@mui/material/index";
import { Rating } from "../../../node_modules/@mui/material/index";
import "react-widgets/styles.css";
import bodyStyles from "../../shared_site_css/body_styles/internal-body.module.css";
import titleStyle from '../../shared_site_css/button_styles/Button.module.css';
import { Link } from "react-router-dom";
import { Typography } from "../../../node_modules/@mui/material/index";

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
          sx={{ marginTop: "0px", paddingTop: "20px" }}
        >
          <Grid item xs={2} sm={2} md={2} lg={2} sx={{ marginTop: "10px" }}>
            <Paper>
              <Grid
                container
                direction="column"
                sx={{ width: "650px", padding: "30px", marginBottom: "30px"}}
              >
                  <img src={this.props.logoUrl} style={{paddingTop:"15px", paddingBottom:"40px", paddingLeft:"10px", paddingRight:"10px",  width:"150px", alignSelf:"center"}}/>

                    <Typography variant="p" className={titleStyle.postTitle}>
                      Company Name
                    </Typography>
                  <p className={titleStyle.postItem}>{this.props.company}</p>

                {
                  this.props.myPost ? <>
                    <div></div>
                  </>: <>
                      <Typography variant="p" className={titleStyle.postTitle}>
                        Student Name
                      </Typography>
                        <Link to="/User_Profile"
                          state= {{ userId: this.props.userId }} className={titleStyle.postItem} style={{backgroundColor: "#dff0e9"}}
                        ><p>{this.props.posterName}</p>
                        </Link>
                  </>
                }

                  <Typography variant="p" className={titleStyle.postTitle}>
                      Job Title
                    </Typography>
                    <p className={titleStyle.postItem}>{this.props.jobTitle}</p>

                  <Typography variant="p" className={titleStyle.postTitle} style={{width: "73.50%"}}>
                    Job Characteristics
                  </Typography>
                  <ul className={titleStyle.postItem} style={{textAlign:"left", width: "66.75%", backgroundColor: "#dff0e9"}} >
                    {(this.props.characteristics || []).map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>

                  <Typography variant="p" className={titleStyle.postTitle}>
                    Payment Type
                  </Typography>
                  <p className={titleStyle.postItem}>{this.props.paymentType}</p>

                  <Typography variant="p" className={titleStyle.postTitle}>
                    Experience Description
                  </Typography>
                  <p className={titleStyle.postItem} style={{backgroundColor: "#dff0e9"}}>{this.props.description}</p>


                  <table style={{borderCollapse:"collapse", width:"80%", alignSelf:"center"}}>
                    <tr>
                      <td><p className={titleStyle.datesTitle}>Start Date</p></td>
                      <td><p className={titleStyle.datesTitle}>End Date</p></td>
                    </tr>
                    <tr>
                      <td><p className={titleStyle.datesItem}>{this.props.startDate}</p></td>
                      <td><p className={titleStyle.datesItem}>{this.props.endDate}</p></td>
                    </tr>
                  </table>


                  <table style={{borderCollapse:"collapse", width:"85%", alignSelf:"center", marginBottom:"15px"}}>
                    <tr>
                    <td colSpan={2}><p className={titleStyle.daysSection}>Daily Work Hours</p></td>
                    </tr>
                    <tr>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysTitle}>Sunday</p></td>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysTitle}>Monday</p></td>
                    </tr>
                    <tr>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysItem}>{this.props.sundayTime}</p></td>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysItem}>{this.props.mondayTime}</p></td>
                    </tr>
                    <tr>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysTitle}>Tuesday</p></td>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysTitle}>Wednesday</p></td>
                    </tr>
                    <tr>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysItem}>{this.props.tuesdayTime}</p></td>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysItem}>{this.props.wednesdayTime}</p></td>
                    </tr>
                    <tr>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysTitle}>Thursday</p></td>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysTitle}>Friday</p></td>
                    </tr>
                    <tr>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysItem}>{this.props.thursdayTime}</p></td>
                      <td style={{width: "calc(100%/2)"}}><p className={titleStyle.daysItem}>{this.props.fridayTime}</p></td>
                    </tr>
                    <tr>
                      <td colSpan={2}><p className={titleStyle.daysTitle}>Saturday</p></td>
                    </tr>
                    <tr>
                      <td colSpan={2}><p className={titleStyle.daysItem}>{this.props.saturdayTime}</p></td>
                    </tr>
                  </table>

                  <Typography variant="p" className={titleStyle.postTitle}>
                    Rating
                  </Typography>
                  <div className={titleStyle.postItem} style={{paddingTop:"15px"}}><Rating value={this.props.rating} readOnly/></div>

                  <Typography variant="p" className={titleStyle.postTitle}>
                    Likes: {this.props.like}
                  </Typography>
                  
                {
                  this.props.myPost ? <>
                    <h5>
                      
                        <Link to="/Post_Edit"
                          state= {{ postDetails: this.props }} 
                          className={titleStyle.createPostButton}
                        >Edit Post
                        </Link>
                      
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
