import { Component, Fragment } from "react";
import bodyStyles from "../../../shared_site_css/body_styles/internal-body.module.css";
import AppHeader from "../../../shared_site_components/page-header/header-and-navebar";
import AppFooter from "../../../shared_site_components/page-footer/footer";
import { fetchAllPosts, fetchMyPosts } from "../../../firebase/ops/post";
import ForumPost from "../../../shared_site_components/forum-post/Forum-Post";
import buttonStyles from "../../../shared_site_css/button_styles/Button.module.css";
import AuthContext from "../../../context/AuthContext";
import { ggc_degrees, getConcentrations } from "../../../shared_js_modules/majors_and_concentrations";
import {
  TextField,
} from "../../../../node_modules/@mui/material/index";

/**
 * @name PageFeed
 * 
 * Component that represents a particular a feed (view) of forum posts
 * @param props options passed to this component
 */
class PageFeed extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    // Method Bindings (for this usage)
    this.onCompanyNameChange = this.onCompanyNameChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onMajorChange = this.onMajorChange.bind(this);
    this.onConcentrationChange = this.onConcentrationChange.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      feedPosts: [],

      // Selected Filters/Typed Queries
      filterType: 'company',
      selectedCompanyName: '',
      selectedMajor: '',
      selectedConcentration: '',
      
      // List of concentrations for
      // selected major (loaded on-the-fly)
      correspondingConcentrations: [],
      
      // Is the search query complete
      // enough for searching?
      searchQueryComplete: false,
    };
  }

  /**
   * @name componentDidMount
   * @author Ryan Gambrell
   * React Lifecycle Function: Fetches a different list of posts
   * based on the feedType passed in. This lifecycle method handles
   * the initial loading of a non-filtered feed. 
   */
  componentDidMount() {
    // Fetch All Posts (no filter)
    if (this.props.feedType === "main_posts") {
      let fetchPostsPromise = fetchAllPosts({});
      fetchPostsPromise.then((posts) => {
        this.setState({
          feedPosts: posts,
        });
      });
    } else {
      // Fetch My Posts (with no filter)
      setTimeout(() => {
        fetchMyPosts(this.context.currentUserID, {}).then((posts) => {
          this.setState({
            feedPosts: posts,
          });
        });
      }, 3000);
    }
  }

  /*
    fires when the dropdown option is changed, it sorts the forum posts based
    on the number of likes for each of the posts. the sorting could be done in ascending
    or descending order
  */
  handleLikesOrderChange = (e) => {
    if (e.target.value === "desc") {
      this.setState({
        feedPosts: this.state.feedPosts.sort((a, b) =>
          parseInt(a.like) < parseInt(b.like) ? 1 : -1
        ),
      });
    } else {
      this.setState({
        feedPosts: this.state.feedPosts.sort((a, b) =>
          parseInt(a.like) > parseInt(b.like) ? 1 : -1
        ),
      });
    }
  };
  
  /**
   * @name onFilterChange
   * @author Ryan Gambrell
   * Store search query type (company name or major/concentrations filter)
   * Also, hide search button so that a change in filter shouldn't allow a search to
   * be conducted before everything is set
   * @param e Event the event containing the search filter type (predefined)
   */
  onFilterChange(e) {
    this.setState({
      filterType: e.target.value,
      searchQueryComplete: false
    });
  }

  /**
   * @name onCompanyNameChange
   * @author Ryan Gambrell
   * Store company search query and prepare to unhide 'search' button
   * @param e Event the event containing the query string (company name) to search by
   */
   onCompanyNameChange(e){
    this.setState({
      selectedCompanyName: e.target.value,
      searchQueryComplete: true
    });
  }

  /**
   * @name onMajorChange
   * @author Ryan Gambrell
   * Store selected major and load related concentrations
   * @param e Event the event containing the selected major (predefined) to search by
   */
  onMajorChange(e) {
    this.setState({
      selectedMajor: e.target.value,
      correspondingConcentrations: e.target.value ? getConcentrations(e.target.value) : []
    });
  }

  /**
   * @name onConcentrationChange
   * @author Ryan Gambrell
   * Store selected concentration and prepare to unhide 'search' button
   * @param e Event the event containing the company name search query
   */
  onConcentrationChange(e){
    this.setState({
      selectedConcentration: e.target.value,
      searchQueryComplete: true
    });
  }

  /**
   * @name onSearch
   * @author Ryan Gambrell
   * Utilize filter type and search queries (or selected dropdowns) to
   * search and bring down a list of matching posts
   * @param e Event the event containing the details of the search form submission
   */
  onSearch(e){
    e.preventDefault(); 
    
    if (this.props.feedType === "main_posts") {
      // Fetch All Posts (using company or major/concentration filters)
      // For the main post feed, pass through all 
      // filter-related options and search queries 
      // as the filter type will be used to determine
      // which is relevant. 
      let fetchPostsPromise = fetchAllPosts({
        filterType: this.state.filterType,
        companySearchQuery: this.state.selectedCompanyName,
        major: this.state.selectedMajor,
        concentration: this.state.selectedConcentration
      });
      fetchPostsPromise.then((posts) => {
        this.setState({
          feedPosts: posts,
        });
      });
    } else if(this.props.feedType === "my_posts"){
      // Fetch My Posts (using company filter)
      setTimeout(() => {
        fetchMyPosts(this.context.currentUserID, {
          filterType: this.state.filterType,
          companySearchQuery: this.state.selectedCompanyName
        }).then((posts) => {
          this.setState({
            feedPosts: posts,
          });
        });
      }, 3000);
    }
  }

  /**
   * @name render
   * 
   * React Lifecycle Function: Renders a search bar, filter and sort options,
   * create post button, and a list of posts
   */
  render() {
    return (
      <Fragment>
        <AppHeader
          navBarContents={[
            {
              text: "Main Forum",
              link: "/Main_Feed",
            },
            {
              text: "Profile",
              link: "/User_Profile",
            },
            {
              text: "My Posts",
              link: "/My_Posts_Feed",
            },
            {
              text: "Logout",
              link: "Logout",
            },
          ]}
        />
        <div className={bodyStyles.ScrollingContent}>
          <div
            className={bodyStyles.ForumBody}
            style={{ paddingTop: "30px", paddingBottom: "30px" }}
          >
            {this.props.feedType === "main_posts" ? (
              <>
                <h5>
                  <a
                    className={buttonStyles.createPostButton}
                    href="/Post_Creation"
                  >
                    Create New Post
                  </a>
                </h5>
              </>
            ) : (
              <>
                <div></div>
              </>
            )}
            {/* Search Bar */}
            <form onSubmit={this.onSearch}>
              {/* Filter Selection Dropdown*/}
              <select className={buttonStyles.likeSortButton} onChange={this.onFilterChange}>
                <option className={buttonStyles.likeSortOptions} value="company">Filter by Company</option>
                {
                  // Remove the major/concentration filter for 'My Posts' page as 
                  // this filter is for profiles and all posts in the current user's profile
                  // don't change 
                  this.props.feedType === 'main_posts' ?
                    <option className={buttonStyles.likeSortOptions} value="major/concentration">Filter by Major/Concentration</option>
                  : <div></div>
                }
              </select>&nbsp;
              {
                // Company Name Search Query (Text):
                // for searching based on company name
                this.state.filterType === 'company' ?
                <Fragment>
                  <TextField
                    type="text"
                    inputProps={{
                      style: { textAlign: "center", backgroundColor:"white" },
                    }}
                    variant="filled"
                    sx={{
                      width: "20%",
                    }}
                    onChange={this.onCompanyNameChange}
                    label={"Company"}
                    value={this.state.company}
                    required
                  />
                  &nbsp;
                </Fragment> :
                // Major/Concentration Search Query (Dropdown)
                // for searching based on major/concentration
                this.state.filterType === 'major/concentration' ?
                <Fragment>
                  {/* Major Dropdown */}
                  <select className={buttonStyles.likeSortButton} onChange={this.onMajorChange}>
                    <option className={buttonStyles.likeSortOptions} value="">Select major</option>
                    {
                      ggc_degrees.map(degree => <option key={degree.major} value={degree.major}>{degree.major}</option>)
                    }
                  </select>
                  &nbsp;
                  {
                    this.state.selectedMajor ?
                      <select className={buttonStyles.likeSortButton} onChange={this.onConcentrationChange} disabled={!this.state.selectedMajor}>
                        <option className={buttonStyles.likeSortOptions} value="">Select concentration</option>
                        {
                          this.state.correspondingConcentrations.map(concentration => 
                            <option key={concentration} value={concentration}>{concentration}</option>)
                        }
                      </select> : <span></span>
                  }
                  &nbsp;
                </Fragment> : <span></span>
              }
              {
                // Search Button 
                // (only shown if query has been detected)
                this.state.searchQueryComplete ?
                  <input
                    className={buttonStyles.likeSortButton}
                    type="submit"
                    name="Search"
                    value="Search"
                  /> : <span></span>
              }
              {/* Like Sort Dropdown */}
              <br />
              <br />
              <select className={buttonStyles.likeSortButton} onChange={this.handleLikesOrderChange}>
                <option className={buttonStyles.likeSortOptions} value="">Order By Likes</option>
                <option className={buttonStyles.likeSortOptions} value="desc">Descending</option>
                <option className={buttonStyles.likeSortOptions} value="asc">Ascending</option>
              </select>
            </form>
            {this.props.feedType === "main_posts"
              ? this.state.feedPosts.map((post) => (
                  <ForumPost key={post.id} {...post} />
                ))
              : this.state.feedPosts.map((post) => (
                  <ForumPost key={post.id} {...post} myPost={true} />
                ))}
          </div>
          <AppFooter />
        </div>
      </Fragment>
    );
  }
}

export default PageFeed;
