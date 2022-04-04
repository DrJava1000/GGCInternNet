import { Component, Fragment } from "react";
import bodyStyles from "../../../shared_site_css/body_styles/internal-body.module.css";
import styles from "./forumpost.module.css";
import AppHeader from "../../../shared_site_components/page-header/header-and-navebar";
import AppFooter from "../../../shared_site_components/page-footer/footer";
import { Button } from "../../../../node_modules/@material-ui/core/index";
import { TextField } from "../../../../node_modules/@material-ui/core/index";
import { List } from "../../../../node_modules/@material-ui/core/index";
import { ListItem } from "../../../../node_modules/@material-ui/core/index";
import { Divider } from "../../../../node_modules/@material-ui/core/index";

let forumposts = ["FP #1", "FP #2", "FP #3"];
let listItems = forumposts.map((forumposts) => <li>{forumposts}</li>);

class ForumPost extends Component {
  constructor(props) {
    super(props);

    //Bindings
    this.onSubmit = this.onSubmit.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);

    this.state = {
      textDescription: "",
    };
  }

  onDescriptionChange(e) {
    this.setState({
      textDescription: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    //Placeholder "alert" function to test ForumPost object
    alert("Text Description: " + this.state.textDescription);

    listItems.push(this.state.textDescription);

    //Code to submit ForumPost object somewhere
    //createForumPost(this.state.textDescription);
  }

  render() {
    return (
      <Fragment>
        <AppHeader
          navBarContents={[
            {
              text: "Home",
              link: "/",
            } /*,
              {
                'text': "Admin Portal",
                'link': "/Admin_Portal"
              },*/,
          ]}
        />
        <div className={bodyStyles.ScrollingContent}>
          <div className={styles.bodyMain}>
            <div className={styles.bodyInput}>
              <form onSubmit={this.onSubmit}>
                Create a Forum Post:
                <table>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Description:</td>
                      <td>
                        <TextField
                          id="standard-basic"
                          value={this.state.value}
                          onChange={this.onDescriptionChange}
                          label="Enter description here"
                          variant="standard"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Button type={"submit"} variant="outlined">
                  Post
                </Button>
              </form>
            </div>
            <div className={styles.bodyPostList}>
              This is where the Forum Posts will go, right below the Input box
              <List>
                <ListItem className={styles.PostListItem}>
                  Placeholder Item #1
                </ListItem>
                <ListItem className={styles.PostListItem}>
                  Placeholder Item #2
                </ListItem>
                <ListItem className={styles.PostListItem}>
                  <ul>{listItems}</ul>
                </ListItem>
              </List>
            </div>
          </div>
          <AppFooter />
        </div>
      </Fragment>
    );
  }
}

export default ForumPost;
