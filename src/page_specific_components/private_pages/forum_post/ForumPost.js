import { Component, Fragment } from "react";
import bodyStyles from '../../../shared_site_css/body_styles/internal-body.module.css';
import styles from './forumpost.module.css';
import AppHeader from '../../../shared_site_components/page-header/header-and-navebar';
import AppFooter from '../../../shared_site_components/page-footer/footer';
import { Button } from "../../../../node_modules/@material-ui/core/index";
import { TextField } from "../../../../node_modules/@material-ui/core/index";

class ForumPost extends Component {
    constructor(props) {
        super(props);

        //Bindings
        this.onSubmit = this.onSubmit.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);

        this.state =
        {
            textDescription: ''
        }
    }

    onDescriptionChange(e) {
        this.setState({
            textDescription: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        //Placeholder "alert" function to test ForumPost object
        alert('Text Description: ' + this.state.textDescription);

        //Code to submit ForumPost object somewhere
        //createForumPost(this.state.textDescription);
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
                            }/*,
              {
                'text': "Admin Portal",
                'link': "/Admin_Portal"
              },*/
                        ]
                    }
                />
                <div className={bodyStyles.ScrollingContent}>
                    {/* #Unfinished code, need a Wrapper for this to display correctly
                    <div className={styles.bodyLeft}>
                        This is the left-side of the screen
                    </div>
                    */}
                    <div className={styles.bodyMain}>
                        <form onSubmit={this.onSubmit}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Description:</td>
                                        <td><TextField id="standard-basic" value={this.state.value}
                                            onChange={this.onDescriptionChange} label="Enter description here"
                                            variant="standard" /></td>
                                        {/* #Old, unused code
                                        <td><input type="text" value={this.state.value} placeholder="Enter description here"
                                            onChange={this.onDescriptionChange} /> <br /> </td>
                                        */}
                                    </tr>
                                </tbody>
                            </table>
                            <Button type={"submit"} variant="outlined">
                                Post
                            </Button>
                            {/* #Old, unused code
                            <input type="submit" value="Post" />
                            */}
                        </form>
                    </div>
                    <AppFooter />
                </div>

            </Fragment>

        );
    }
}

export default ForumPost;