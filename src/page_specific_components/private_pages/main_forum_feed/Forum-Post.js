import { Component, Fragment } from "react";
import { Grid, Paper } from "../../../../node_modules/@mui/material/index";
import { FormControl } from "../../../../node_modules/@mui/material/index";
import bodyStyles from "../../../shared_site_css/body_styles/internal-body.module.css";
import { Link } from "react-router-dom";

class ForumPost extends Component {
  render() {
    return (
      <Fragment>
        <Grid
          container
          className={bodyStyles.ScrollingContent}
          alignItems="center"
          justify="center"
          direction="column"
          sx={{ marginTop: "0px" }}
        >
          <Grid item xs={1} sm={1} md={1} lg={1} sx={{ marginTop: "10px" }}>
            <Paper sx={{ marginTop: "0px" }}>
              <Grid
                container
                direction="column"
                sx={{ width: "850px", padding: "30px", marginBottom: "30px" }}
              >
                <FormControl>
                  <Link to="/User_Profile"
                    state= {{ userId: this.props.userId }}
                  ><h5>{this.props.posterName}</h5>
                  </Link>
                </FormControl>
                <FormControl>
                  <img width={100} height={100} src={this.props.logoUrl} />
                </FormControl>
                <FormControl>
                  <ul>
                    {(this.props.characteristics || []).map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </FormControl>
                <FormControl>
                  <h3>{this.props.paymentType}</h3>
                </FormControl>
                <FormControl>
                  <p>{this.props.description}</p>
                </FormControl>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default ForumPost;
