import React, { Component } from 'react';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        // postsPlus: '',
        title: '',
        // body: '',
        author: ''
    }

    postDataHandler = () => {
      const data = {
        title: this.state.title,
        // body: this.state.body,
        author: this.state.author
      };

      axios.post('/posts', data)
            .then(response => {
              // this.setState({postsPlus: response.data});
              // console.log(this.state.postsPlus);
            });
    }



    render () {

        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />

                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="">Select author</option>
                    <option value="Andre">Andre</option>
                    <option value="Nata">Nata</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;
