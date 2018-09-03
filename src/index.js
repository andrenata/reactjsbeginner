import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'applications/json';

axios.interceptors.request.use(request => {
  // console.log(request);
  // EDIT request config
  return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // console.log(response);
  // EDIT request config
  return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
