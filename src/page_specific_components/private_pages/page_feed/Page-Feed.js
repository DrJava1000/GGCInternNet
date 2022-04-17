import { Component, Fragment } from "react";
import bodyStyles from "../../../shared_site_css/body_styles/internal-body.module.css";
import AppHeader from "../../../shared_site_components/page-header/header-and-navebar";
import AppFooter from "../../../shared_site_components/page-footer/footer";
import { fetchAllPosts, fetchMyPosts } from "../../../firebase/ops/post";
import ForumPost from "../../../shared_site_components/forum-post/Forum-Post";
import buttonStyles from "../../../shared_site_css/button_styles/Button.module.css";
import AuthContext from "../../../context/AuthContext";

class PageFeed extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      feedPosts: [],
    };
  }

  componentDidMount() {
    if (this.props.feedType === "main_posts") {
      let fetchPostsPromise = fetchAllPosts();
      fetchPostsPromise.then((posts) => {
        this.setState({
          feedPosts: posts,
        });
      });
    } else {
      setTimeout(() => {
        fetchMyPosts(this.context.currentUserID).then((posts) => {
          this.setState({
            feedPosts: posts,
          });
        });
      }, 3000);
    }
  }

  /*
    fires when the dropdown option is changed, it sorts the forum posts based
    on the number of likes for each of the posts. the sorting could be done in ascending
    or descending order
  */
  handleLikesOrderChange = (e) => {
    if (e.target.value === "desc") {
      this.setState({
        feedPosts: this.state.feedPosts.sort((a, b) =>
          parseInt(a.like) < parseInt(b.like) ? 1 : -1
        ),
      });
    } else {
      this.setState({
        feedPosts: this.state.feedPosts.sort((a, b) =>
          parseInt(a.like) > parseInt(b.like) ? 1 : -1
        ),
      });
    }
  };

  render() {
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
          <div
            className={bodyStyles.ForumBody}
            style={{ paddingTop: "30px", paddingBottom: "30px" }}
          >
            {this.props.feedType === "main_posts" ? (
              <>
                <h5>
                  <a
                    className={buttonStyles.createPostButton}
                    href="/Post_Creation"
                  >
                    Create New Post
                  </a>
                </h5>
              </>
            ) : (
              <>
                <div></div>
              </>
            )}
            {/*}
            <a className={buttonStyles.likeSortButton}>
            Order By Likes:
            </a>*/}
            <select className={buttonStyles.likeSortButton} onChange={this.handleLikesOrderChange}>
              <option className={buttonStyles.likeSortOptions} value="">Order By Likes</option>
              <option className={buttonStyles.likeSortOptions} value="desc">Descending</option>
              <option className={buttonStyles.likeSortOptions} value="asc">Ascending</option>
            </select>
            {this.props.feedType === "main_posts"
              ? this.state.feedPosts.map((post) => (
                  <ForumPost key={post.id} {...post} />
                ))
              : this.state.feedPosts.map((post) => (
                  <ForumPost key={post.id} {...post} myPost={true} />
                ))}
          </div>
          <AppFooter />
        </div>
      </Fragment>
    );
  }
}

export default PageFeed;
