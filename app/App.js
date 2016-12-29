var React = require('react');
var ReactDOM = require('react-dom');
var { Router, hashHistory } = require('react-router');
var routes = require('./config/routes');

ReactDOM.render(
  <Router history={ hashHistory }>{routes}</Router>,
  document.getElementById('app')
);
