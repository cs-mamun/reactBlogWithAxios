import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Post from '../../components/Post/Post';



class Posts extends Component {
  state = {
    posts: [],
  };
  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
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
          <Link to={'/' + post.id} key={post.id}>
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
      </div>
    );
  }
}

export default Posts;
