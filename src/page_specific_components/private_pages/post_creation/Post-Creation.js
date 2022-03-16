import { Component, Fragment } from "react";
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import titleStyle from '../../../shared_site_css/button_styles/Button.module.css';
import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import { createPost } from '../../../firebase/ops/post';
import { Navigate } from "react-router-dom";
import { Grid } from "../../../../node_modules/@mui/material/index";
import { TextField } from '../../../../node_modules/@mui/material/index';
import { Typography } from '../../../../node_modules/@mui/material/index';

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
                                    'text': "Profile",
                                    'link': "/User_Profile"
                                },
                                {
                                    'text': "Main Forum",
                                    'link': "/Main_Feed"
                                },{
                                    'text': "Logout",
                                    'link': "Logout"
                                }
                            ]
                        }
                    />
                    <div className={bodyStyles.ScrollingContent}>
                        <div className={bodyStyles.createPostBody}>
                        <Grid alignItems="center" justify="center" direction="column" sx={{minWidth:'40%', backgroundColor:"#ffffff", paddingLeft:'40px', paddingRight:'40px', paddingTop:'40px', paddingBottom:'40px', borderRadius:"15px"}}>
                            <Typography
                            variant="h6"
                            className={titleStyle.standaloneTitle}
                            >
                            Create a Forum Post
                            </Typography><br></br>
                            <form onSubmit={this.onSubmit}>
                            <Grid item>
                                <TextField
                                type="text"
                                inputProps={{
                                    style: { textAlign: 'center'}
                                }}
                                sx={{
                                    width: '100%'
                                }}
                                onChange={this.onTitleChange}
                                label={'Job Title'}
                                />
                            </Grid> <br></br>

                            <Grid item>
                                <TextField
                                type="text"
                                inputProps={{
                                    style: { textAlign: 'center'}
                                }}
                                sx={{
                                    width: '100%'
                                }}
                                label={'Job Description'}
                                onChange={this.onDescriptionChange}
                                />
                            </Grid> <br></br>
                                {
                                    this.state.title !== '' && this.state.description !== '' ? 
                                        <input className={titleStyle.createPostButton} type="submit" name="Post" value="Post"/>
                                        : <input className={titleStyle.createPostButton} type="submit" name="Post" value="Post" disabled/>
                                }
                            </form>
                            </Grid>
                        </div>
                        <AppFooter />
                    </div>

                </Fragment>
            );
        }
    }
}

export default PostCreation;