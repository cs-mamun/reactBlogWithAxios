import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import post from "../../components/Post/Post";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    errors: false,
  };
  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  componentDidMount() {
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
    .catch(err => {
      this.setState({errors: true})
    });
  }
  render() {
    let posts = <p style={{textAlign: 'center'}}> Something went wrong !</p>;
    if (!this.state.errors) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            title={post.title}
            author={post.author}
            key={post.id}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    };
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
