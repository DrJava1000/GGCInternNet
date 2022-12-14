import { Component, Fragment } from "react";
import { Grid, Paper } from "../../../node_modules/@mui/material/index";
import { Rating } from "../../../node_modules/@mui/material/index";
import "react-widgets/styles.css";
import bodyStyles from "../../shared_site_css/body_styles/internal-body.module.css";
import titleStyle from '../../shared_site_css/button_styles/Button.module.css';
import { Link, Navigate } from "react-router-dom";
import { Typography } from "../../../node_modules/@mui/material/index";
import { Button } from "../../../node_modules/@mui/material/index";
import { modifyPostLike } from "../../firebase/ops/post";
import ThumbUpIcon from "../../../node_modules/@mui/icons-material/ThumbUp";
import ThumbDownIcon from "../../../node_modules/@mui/icons-material/ThumbDown";
import { deletePost } from "../../firebase/ops/post";
import { Dialog, DialogTitle, DialogActions } from "../../../node_modules/@mui/material/index";
import AuthContext from "../../context/authentication/AuthContext";

/**
 * @name ForumPost
 * 
 * Component that represents a particular post
 * @param props options passed to this component
 */
class ForumPost extends Component {
  static contextType = AuthContext
  constructor(props) {
    super(props);

    // Function Bindings (for this usage)
    this.onLike = this.onLike.bind(this);
    this.onDislike = this.onDislike.bind(this);
    this.onDeletePostDialogClick = this.onDeletePostDialogClick.bind(this);
    this.onPostDeletionConfirmation = this.onPostDeletionConfirmation.bind(this);

    this.state = {
      // Forum post properties
      likeCount: this.props.like,

      // Rendering-based properties
      // Post Like Status (for current user)
      hasBeenLiked : false,
      
      // Has this post been deleted, if so
      // reload by redirecting
      reloadFeed: false,

      // Is the 'delete post' dialog open
      openDeletionConfirmation: false
    };
  }

  /**
   * @name onLike
   * @author Ryan Gambrell
   * Adds a like to a post and prepares to toggle
   * the like button to a 'thumbs down' view 
   */
  onLike(){
    this.setState({
      hasBeenLiked : true,
      likeCount: this.state.likeCount + 1
    });
    modifyPostLike("addLike", this.state.likeCount, this.props.id);
  }

  /**
   * @name onDislike
   * @author Ryan Gambrell
   * Removes a like to a post and prepares to toggle
   * the like button to a 'thumbs up' view
   */
  onDislike(){
    this.setState({
      hasBeenLiked : false,
      likeCount: this.state.likeCount - 1
    });
    modifyPostLike("removeLike", this.state.likeCount, this.props.id);
  }

  /**
   * @name onPostDeletionConfirmation
   * @author Ryan Gambrell
   * Handles when the user confirms that they want to delete the current forum post object
   */
   onPostDeletionConfirmation() {
    deletePost(this.props.id).then(() => {
      this.setState({
        reloadFeed: true,
      });
    });
  }

  /**
   * @name onDeletePostDialogClick
   * @author Ryan Gambrell
   * Handles when the user decides to cancel their post deletion attempt
   */
  onDeletePostDialogClick() {
    this.setState({
      openDeletionConfirmation: !this.state.openDeletionConfirmation,
    });
  }

  /**
   * @name render
   * Renders a view for a forum post that lays out all
   * the post's information. This view may also contain
   * controls for modifying the post in such a way. 
   */
  render() {
    if(this.state.reloadFeed){
      return(
        <Navigate to='/Main_Feed'/>
      );
    }else{
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
                    <img src={this.props.logoUrl} alt="" style={{paddingTop:"15px", paddingBottom:"40px", paddingLeft:"10px", paddingRight:"10px",  width:"150px", alignSelf:"center"}}/>

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
                        Date Posted
                      </Typography>
                      <p className={titleStyle.datesItem}>{this.props.createDate}</p>

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

                    <Typography variant="p" className={titleStyle.likeCounter}>
                      Likes
                    </Typography>
                    <div className={titleStyle.likeItem} style={{fontWeight:"bolder"}}>{this.state.likeCount}</div>
                    {
                      // Don't show like/dislike toggle button for my posts feed as users shouldn't
                      // be able to like/dislike their own posts
                      !this.props.myPost ? 
                        this.state.hasBeenLiked ? (
                          <Button 
                            variant="contained" 
                            color="error"
                            onClick={this.onDislike} 
                            sx={{width:"200px", alignSelf:"center", marginTop:"15px", paddingTop:"8px", paddingBottom:"8px"}}
                          >
                            <ThumbDownIcon>
                            </ThumbDownIcon>
                          </Button>
                        ) : (
                          <Button 
                            variant="contained" 
                            color="success"
                            onClick={this.onLike}
                            sx={{width:"200px", alignSelf:"center", marginTop:"15px", paddingTop:"8px", paddingBottom:"8px"}}
                          >
                            <ThumbUpIcon>
                            </ThumbUpIcon>
                          </Button>
                        )
                        : <div></div>
                    }
                  {
                    // Allow users to edit their own posts
                    // by rendering the edit button on their posts
                    // on their personal feed
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
                  {/* Post Deletion Dialog*/}
                  {
                    // Show 'delete' button when logged in as admins
                    this.context.currentUserRole === 'ADMIN' ?
                      <div>
                        <br />
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
                      </div> : <div></div>
                  }
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Fragment>
      );
    }
  }
}

export default ForumPost;
