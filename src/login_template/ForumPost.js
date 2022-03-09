import { Component } from "react";

class ForumPost extends Component
{
    constructor(props)
    {
        super(props);

        //Bindings
        this.onSubmit = this.onSubmit.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);

        this.setState =
        {
            textDescription: ''
        }
    }

    onDescriptionChange(e)
    {
        this.setState({
            textDescription: e.target.value
        });
    }

    onSubmit(e)
    {
        e.preventDefault();

        //Placeholder "alert" function to test ForumPost object
        alert('Text Description: ' + this.state.textDescription);

        //Code to submit ForumPost object somewhere
        //createForumPost(this.state.textDescription);
    }

    render()
    {
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{fontWeight: 'bold'}}>Description:</td>
                                <td><input type="text" value={this.state.value} placeHolder="Enter description here" 
                                onChange={this.onDescriptionChange}/> <br/> </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="submit" value="Post" />
                </form>
            </div>
        );
    }
}

export default ForumPost;