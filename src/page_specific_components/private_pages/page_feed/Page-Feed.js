import { Component, Fragment } from "react";
import bodyStyles from "../../../shared_site_css/body_styles/internal-body.module.css";
import AppHeader from "../../../shared_site_components/page-header/header-and-navebar";
import AppFooter from "../../../shared_site_components/page-footer/footer";
import { fetchAllPosts, fetchMyPosts } from "../../../firebase/ops/post";
import ForumPost from "../../../shared_site_components/forum-post/Forum-Post";
import buttonStyles from "../../../shared_site_css/button_styles/Button.module.css";
import AuthContext from '../../../context/AuthContext';

class PageFeed extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      feedPosts: [],
    };
  }

  componentDidMount() {
    if(this.props.feedType === "main_posts"){
      let fetchPostsPromise = fetchAllPosts();
      fetchPostsPromise.then((posts) => {
        this.setState({
          feedPosts: posts,
        });
      });
    }else{
      setTimeout(() => {
        fetchMyPosts(this.context.currentUserID).then((posts) => {
          this.setState({
            feedPosts: posts,
          });
        })},
      3000);
    }
  }

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
          <div className={bodyStyles.ForumBody} style={{paddingTop:"30px", paddingBottom:"30px"}}>
            {
              this.props.feedType === "main_posts" ? <>
                <h5>
                  <a
                  className={buttonStyles.createPostButton}
                  href="/Post_Creation"
                  >
                    Create New Post
                  </a>
                </h5>
              </>: <>
                <div></div>
              </>
            }
            {
              this.props.feedType === "main_posts" ? 
                this.state.feedPosts.map((post) => (
                  <ForumPost key={post.id} {...post} />
                )) 
              :
                this.state.feedPosts.map((post) => (
                  <ForumPost key={post.id} {...post} myPost={true}/>
                ))
            }
          </div>
          <AppFooter />
        </div>
      </Fragment>
    );
  }
}

export default PageFeed;
