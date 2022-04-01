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
import { Rating } from "../../../../node_modules/@mui/material/index";
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import DatePicker from '@mui/lab/DatePicker';

class PostCreation extends Component {
    constructor(props) {
        super(props);

        //Bindings
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);

        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.onRatingChange = this.onRatingChange.bind(this);

        this.onMondayTimeChange = this.onMondayTimeChange.bind(this);
        this.onTuesdayTimeChange = this.onTuesdayTimeChange.bind(this);
        this.onWednesdayTimeChange = this.onWednesdayTimeChange.bind(this);
        this.onThursdayTimeChange = this.onThursdayTimeChange.bind(this);
        this.onFridayTimeChange = this.onFridayTimeChange.bind(this);
        this.onSaturdayTimeChange = this.onSaturdayTimeChange.bind(this);
        this.onSundayTimeChange = this.onSundayTimeChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state =
        {
            title: '',
            description: '',

            startDate: null,
            endDate: null,
            rating: null,

            mondayTime: '',
            tuesdayTime: '',
            wednesdayTime: '',
            thursdayTime: '',
            fridayTime: '',
            saturdayTime: '',
            sundayTime: '',

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

    onStartDateChange(e) {
        this.setState({
            startDate: e.target.value
        });
    }

    onEndDateChange(e) {
        this.setState({
            endDate: e.target.value
        });
    }

    onRatingChange(e) {
        this.setState({
            rating: e.target.value
        });
    }

    onMondayTimeChange(e) {
        this.setState({
            mondayTime: e.target.value
        });
    }

    onTuesdayTimeChange(e) {
        this.setState({
            tuesdayTime: e.target.value
        });
    }

    onWednesdayTimeChange(e) {
        this.setState({
            wednesdayTime: e.target.value
        });
    }

    onThursdayTimeChange(e) {
        this.setState({
            thursdayTime: e.target.value
        });
    }

    onFridayTimeChange(e) {
        this.setState({
            fridayTime: e.target.value
        });
    }

    onSaturdayTimeChange(e) {
        this.setState({
            saturdayTime: e.target.value
        });
    }

    onSundayTimeChange(e) {
        this.setState({
            sundayTime: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        createPost({
            poster: "rgambrell@ggc.edu",
            title: this.state.title,
            description: this.state.description,

            startDate: this.state.startDate,
            endDate: this.state.endDate,
            rating: this.state.rating,

            mondayTime: this.state.mondayTime,
            tuesdayTime: this.state.tuesdayTime,
            wednesdayTime: this.state.wednesdayTime,
            thursdayTime: this.state.thursdayTime,
            fridayTime: this.state.fridayTime,
            saturdayTime: this.state.saturdayTime,
            sundayTime: this.state.sundayTime
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

                            {/*This is where StartDate goes*/}
                            <Grid item>
                                Start Date
                                <DatePicker
                                    defaultValue={new Date()}
                                    onChange={this.state.onStartDateChange}
                                />
                                {/*
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker 
                                    label="Start Date"
                                    onChange={this.onStartDateChange}
                                    />
                                </LocalizationProvider>
                                */}
                            </Grid>

                            {/*This is where EndDate goes*/}
                            <Grid item>
                                End Date
                                <DatePicker
                                    defaultValue={new Date()}
                                    onChange={this.state.onEndDateChange}
                                />
                                {/*
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker 
                                    label="End Date"
                                    onChange={this.onEndDateChange}
                                    />
                                </LocalizationProvider>
                                */}
                            </Grid>

                            {/*This is where Monday Time goes*/}
                            <Grid item>
                                <TextField
                                type="text"
                                inputProps={{
                                    style: { textAlign: 'center'}
                                }}
                                sx={{
                                    width: '100%'
                                }}
                                label={'Monday Hours'}
                                onChange={this.onMondayTimeChange}
                                />
                            </Grid> <br></br>

                            {/*This is where Tuesday Time goes*/}
                            <Grid item>
                                <TextField
                                type="text"
                                inputProps={{
                                    style: { textAlign: 'center'}
                                }}
                                sx={{
                                    width: '100%'
                                }}
                                label={'Tuesday Hours'}
                                onChange={this.onTuesdayTimeChange}
                                />
                            </Grid> <br></br>

                            {/*This is where Wednesday Time goes*/}
                            <Grid item>
                                <TextField
                                type="text"
                                inputProps={{
                                    style: { textAlign: 'center'}
                                }}
                                sx={{
                                    width: '100%'
                                }}
                                label={'Wednesday Hours'}
                                onChange={this.onWednesdayTimeChange}
                                />
                            </Grid> <br></br>

                            {/*This is where Thursday Time goes*/}
                            <Grid item>
                                <TextField
                                type="text"
                                inputProps={{
                                    style: { textAlign: 'center'}
                                }}
                                sx={{
                                    width: '100%'
                                }}
                                label={'Thursday Hours'}
                                onChange={this.onThursdayTimeChange}
                                />
                            </Grid> <br></br>

                            {/*This is where Friday Time goes*/}
                            <Grid item>
                                <TextField
                                type="text"
                                inputProps={{
                                    style: { textAlign: 'center'}
                                }}
                                sx={{
                                    width: '100%'
                                }}
                                label={'Friday Hours'}
                                onChange={this.onFridayTimeChange}
                                />
                            </Grid> <br></br>

                            {/*This is where Saturday Time goes*/}
                            <Grid item>
                                <TextField
                                type="text"
                                inputProps={{
                                    style: { textAlign: 'center'}
                                }}
                                sx={{
                                    width: '100%'
                                }}
                                label={'Saturday Hours'}
                                onChange={this.onSaturdayTimeChange}
                                />
                            </Grid> <br></br>

                            {/*This is where Sunday Time goes*/}
                            <Grid item>
                                <TextField
                                type="text"
                                inputProps={{
                                    style: { textAlign: 'center'}
                                }}
                                sx={{
                                    width: '100%'
                                }}
                                label={'Sunday Hours'}
                                onChange={this.onSundayTimeChange}
                                />
                            </Grid> <br></br>

                            {/*This is where Rating goes*/}
                            <Grid item>
                                Rate Your Experience
                                <Rating
                                onChange={this.state.onRatingChange}
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