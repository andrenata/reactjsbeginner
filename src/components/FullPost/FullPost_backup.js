import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

import './FullPost.css';

class FullPost extends Component {
    state = {
      loadedPost: null,
      loaderSpinner: false
    }

    componentDidUpdate(){

      if(this.props.id){
        if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {

          this.state.loaderSpinner= true;
          axios.get('/posts/' + this.props.id)
                .then(response => {
                  this.setState({loadedPost: response.data});
                  this.setState({loaderSpinner: false});
                });
        }
      }
    }


    deletePostHandler = () => {
      this.state.loaderSpinner= true;

      axios.delete('/posts/' + this.props.id)
            .then(response => {
              this.setState({loadedPost: null});
              this.setState({loaderSpinner: false});

            });

    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if(this.state.loaderSpinner===true){
          return post = <Spinner />;
        }

        if(this.state.loadedPost){
          post = (
              <div className="FullPost">

                  <h1>{this.state.loadedPost.title}</h1>
                  <p>{this.state.loadedPost.body}</p>
                  <div className="Edit">
                      <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                  </div>
              </div>

          );
        }

        return post;
    }
}

export default FullPost;
