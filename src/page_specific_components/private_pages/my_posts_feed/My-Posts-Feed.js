import { Component, Fragment } from "react";
import bodyStyles from "../../../shared_site_css/body_styles/internal-body.module.css";
import AppHeader from "../../../shared_site_components/page-header/header-and-navebar";
import AppFooter from "../../../shared_site_components/page-footer/footer";
import { fetchMyPosts } from "../../../firebase/ops/post";
import ForumPost from "../../../shared_site_components/forum-post/Forum-Post";
import AuthContext from '../../../context/AuthContext';

class MyPostsFeed extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      feedPosts: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      fetchMyPosts(this.context.currentUserID).then((posts) => {
        this.setState({
          feedPosts: posts,
        });
      })},
    3000);
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
              link: "/My_Posts",
            },
            {
              text: "Logout",
              link: "Logout",
            },
          ]}
        />
        <div className={bodyStyles.ScrollingContent}>
          <div className={bodyStyles.ForumBody}>
            {this.state.feedPosts.map((post) => (
              <ForumPost key={post.id} {...post} myPost={true} />
            ))}
          </div>
          <AppFooter />
        </div>
      </Fragment>
    );
  }
}

export default MyPostsFeed;
