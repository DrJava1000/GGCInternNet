import { Component, Fragment } from "react";
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import styles from './main-feed.module.css';
import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import { fetchAllPosts } from '../../../firebase/ops/post';
import ForumPost from './Forum-Post';

class MainFeed extends Component {
    constructor(props) {
        super(props);

        this.state =
        {
            feedPosts: []
        }
    }

    componentDidMount(){
        let fetchPostsPromise = fetchAllPosts();

        fetchPostsPromise.then((posts) => {
            this.setState({
                feedPosts: posts
            });
        })
    }

    render() {
        return (
            <Fragment>
                <AppHeader navBarContents=
                    {
                        [
                            {
                                'text': "Profile",
                                'link': "/User_Profile"
                            },
                            {
                                'text': "New Post",
                                'link': "/Post_Creation"
                            },
                        ]
                    }
                />
                <div className={bodyStyles.ScrollingContent}>
                    <div className={bodyStyles.PageBody}>
                        {
                            this.state.feedPosts.map(post => <ForumPost key={post.id} poster={post.poster} title={post.title} 
                                description={post.description}/>)
                        }
                    </div>
                    <AppFooter />
                </div>
            </Fragment>
        );
    }
}

export default MainFeed;