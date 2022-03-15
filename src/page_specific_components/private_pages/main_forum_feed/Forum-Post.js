import { Component, Fragment } from "react";

class ForumPost extends Component {
    constructor(props) {
        super(props);

        this.state =
        {
            poster: props.poster,
            title: props.title,
            description: props.description
        }
    }

    render() {
        return (
            <Fragment>
                <div>
                    <h3>{this.state.title}</h3>
                    <h5>{this.state.poster}</h5>
                    <p>{this.state.description}</p>
                </div>
            </Fragment>
        );
    }
}

export default ForumPost;