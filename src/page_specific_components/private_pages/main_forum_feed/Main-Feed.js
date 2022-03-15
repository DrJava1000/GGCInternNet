import { Component, Fragment } from "react";
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import styles from './main-feed.module.css';
import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import { fetchAllPosts, createPost } from '../../../firebase/ops/post';
import ForumPost from './Forum-Post';

class MainFeed extends Component {
    constructor(props) {
        super(props);

        //Bindings
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state =
        {
            title: '',
            description: '',
            feedPosts: []
        }
    }

    onTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    onDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        createPost({
            poster: "rgambrell@ggc.edu",
            title: this.state.title,
            description: this.state.description
        });
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
                                'text': "Home",
                                'link': "/"
                            }
                        ]
                    }
                />
                <div className={bodyStyles.ScrollingContent}>
                    <div className={bodyStyles.PageBody}>
                        <form onSubmit={this.onSubmit}>
                            <input type="text" placeholder="Add Title Here" onChange={this.onTitleChange}/><br/>
                            <input type="text" placeholder="Add Description Here" onChange={this.onTitleChange}/><br/>
                            <input type="submit" name="Update" value="Update"/>
                        </form>
                        {
                            this.state.feedPosts.map(post => <ForumPost poster={post.poster} title={post.title} 
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