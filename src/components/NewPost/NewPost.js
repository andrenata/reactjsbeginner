import React from 'react';

import './NewPost.css';

const NewPost = (props) => (
    <div className="NewPost">
        <h1>Add a Post</h1>
        <label>Title</label>
        <input type="text" value={props.title} onChange={props.changedtitle}/>

        <label>Author</label>
        <select value={props.author} onChange={props.changedauthor}>
            <option value="">Select author</option>
            <option value="Andre">Andre</option>
            <option value="Nata">Nata</option>
        </select>
        <button onClick={props.clicked}>Add Post</button>
    </div>
);

export default NewPost;
