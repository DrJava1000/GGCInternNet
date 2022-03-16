import { Component, Fragment } from "react";
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import { fetchAllPosts } from '../../../firebase/ops/post';
import ForumPost from './Forum-Post';
import buttonStyles from '../../../shared_site_css/button_styles/Button.module.css';

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
                                'text': "Main Forum",
                                'link': "/Main_Feed"
                            },{
                                'text': "Profile",
                                'link': "/User_Profile"
                            },{
                                'text': "Logout",
                                'link': "Logout"
                            }
                        ]
                    }
                />
                <div className={bodyStyles.ScrollingContent}>
                    <div className={bodyStyles.ForumBody}>
                        <h5>
                            <a className={buttonStyles.createPostButton} href="/Post_Creation">
                                Create New Post
                            </a>  
                        </h5>
                        
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