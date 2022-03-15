import { Component, Fragment } from "react";
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import styles from './post-creation.module.css';
import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import { createPost } from '../../../firebase/ops/post';
import { Navigate } from "react-router-dom";

class PostCreation extends Component {
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
            feedPosts: [],
            successfulPost: false
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

        this.setState({
            successfulPost : true
        });
    }

    render() {
        if(this.state.successfulPost)
        {
            return (<Navigate to="/Main_Feed"/>)
        }else{
            return (
                <Fragment>
                    <AppHeader navBarContents=
                        {
                            [
                                {
                                    'text': "Main Forum",
                                    'link': "/Main_Feed"
                                }
                            ]
                        }
                    />
                    <div className={bodyStyles.ScrollingContent}>
                        <div className={bodyStyles.PageBody}>
                            <form onSubmit={this.onSubmit}>
                                <input type="text" placeholder="Add Title Here" onChange={this.onTitleChange}/><br/>
                                <input type="text" placeholder="Add Description Here" onChange={this.onDescriptionChange}/><br/>
                                {
                                    this.state.title !== '' && this.state.description !== '' ? 
                                        <input type="submit" name="Post" value="Post"/>
                                        : <input type="submit" name="Post" value="Post" disabled/>
                                }
                            </form>
                        </div>
                        <AppFooter />
                    </div>

                </Fragment>
            );
        }
    }
}

export default PostCreation;