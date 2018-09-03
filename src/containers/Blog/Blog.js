import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import Spinner from '../../components/Spinner/Spinner';
import './Blog.css';

class Blog extends Component {
    constructor(props){
      super(props);
      this.state = {
          posts: [],
          selectedPostId: null,
          selectedEditId: null,
          selectedPost: false,
          loader: true,
          title: '',
          author: '',
          updated: false,
          newPost: [],
          newpost: null,
          singlepost: null,
          loadedPost: null,
          titleSl: '',
          authorSl: '',
          singleDeleted: false,
          closeFull: false,
          checkEdit: false,
          postEdit: false

      }
    }

    componentDidMount () {
        axios.get( '/posts' )
            .then( response => {
                this.setState({posts: response.data});
                this.setState({loader: false});
            } );
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
        // console.log(this.state.selectedPostId);
    }

    postDataHandler = () => {
      const data = {
        title: this.state.title,
        author: this.state.author
      };

      axios.post('/posts', data)
            .then(response => {
              this.setState({updated: true, selectedPostId: null});
              this.setState({newPost: response.data, singleDeleted: false});
            });
    }

    componentDidUpdate(){
      if(this.state.updated){
        axios.get( '/posts' )
            .then( response => {
                this.setState({posts: response.data});
                this.setState({loader: false, updated: false, singleDeleted: false});
                this.setState({title: '', author: ''});
                this.setState({titleSl: '', authorSl: '', selectedPost: false});
            } );
      }

      if(this.state.singleDeleted===true){
        axios.get( '/posts' )
            .then( response => {
                this.setState({posts: response.data});
                this.setState({updated: false, singleDeleted: false});
                this.setState({titleSl: '', authorSl: '', selectedPost: false});

            } );
      }
      // SELECTED
      if(this.state.selectedPostId){
          if ( !this.state.loadedPost ||
            (this.state.loadedPost && this.state.loadedPost.id !== this.state.selectedPostId) ) {

            // this.state.loaderSpinner= true;
            axios.get('/posts/' + this.state.selectedPostId)
                  .then(response => {
                    this.setState({loadedPost: response.data});
                    // this.setState({loaderSpinner: false});
                    this.setState({titleSl: response.data.title});
                    this.setState({authorSl: response.data.author});
                    this.setState({selectedPost: true});

                  });
          }
        }

      if(this.state.closeFull){
        this.setState({titleSl: '', authorSl: '', selectedPost: false, closeFull: false});
      }

      if(this.state.checkEdit===true){
        this.setState({checkEdit: false, postEdit: true});
      }
    }

    // FULLPOST DEL
    deletePostHandler() {
      axios.delete('/posts/' + this.state.selectedPostId)
            .then(response => {
              this.setState({loadedPost: null, selectedPostId: null});
              this.setState({singleDeleted: true, updated: false, postEdit:false});
            });
    }

    // CLOSE FULLPOST
    closeFullPost = () => {
        this.setState({closeFull: true});
        // console.log(this.state.selectedPostId);
    }

    // EDIT FULLPOST
    editPostHandler () {
      this.setState({selectedEditId: this.state.selectedPostId});
      this.setState({checkEdit: true});
    }

    render () {
        if(this.state.loader===true){
          return posts = <Spinner />;
        }

        let posts = this.state.posts.map(post => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} />;
        });

        const newpost = (
          <NewPost
            title={this.state.title}
            changedtitle={(event) => this.setState({title: event.target.value})}
            author={this.state.author}
            changedauthor={(event) => this.setState({author: event.target.value})}
            clicked={() => this.postDataHandler()}/>
        )

        let singlepost = '';

        if(this.state.selectedPost===true){
          singlepost = (
            <FullPost
              title={this.state.titleSl}
              author={this.state.authorSl}
              clickedEdit={() => this.editPostHandler()}
              clicked={() => this.deletePostHandler()}
              clickedClose={() => this.closeFullPost()}
              />
          )
        }if(this.state.postEdit===true){
          console.log('edit');
          this.state.postEdit= false;
        }else{
          let singlepost = '';
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                  {singlepost}
                </section>
                <section>
                    {newpost}
                </section>
            </div>
        );
    }
}

export default Blog;
