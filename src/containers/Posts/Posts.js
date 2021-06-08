import React, { Component } from "react";
import {Route} from 'react-router-dom';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from "../Blog/FullPost/FullPost";



class Posts extends Component {
  state = {
    posts: [],
  };
  postSelectedHandler = (id) => {
    // this.setState({ selectedPostId: id });
    this.props.history.push({pathname: '/' + id});
    // this.props.history.push('/' + id);
  };
  componentDidMount() {
    //   console.log(this.props);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPost = posts.map((post) => {
          return { ...post, author: "Dr. M" };
        });
        this.setState({ posts: updatedPost });
        //   console.log(response);
      })
      .catch((err) => {
          console.log(err);
        // this.setState({ errors: true });
      });
  }
  render() {
    let posts = <p style={{ textAlign: "center" }}> Something went wrong !</p>;
    if (!this.state.errors) {
      posts = this.state.posts.map((post) => {
        return (
          //<Link to={'/' + post.id} key={post.id}>
            <Post
            key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          //</Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={'/posts/:id'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
