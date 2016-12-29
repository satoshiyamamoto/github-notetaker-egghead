var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var firebase = require('firebase');
var config = require('../config/firebase');

var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      notes: [
        { '.value': 'will replaced with firebase' }
      ],
      bio: {
        name: 'Satoshi Yamamoto'
      },
      repos: ['a','b','c',],
    }
  },
  componentDidMount: function() {
    // v2
    // this.ref = new Firebase('https://...');
    // var childRef = this.ref.child(this.props.params.username);

    // v3
    firebase.initializeApp(config);
    this.database = firebase.database();
    var childRef = this.database.ref(this.props.params.username);
    this.bindAsArray(childRef, 'notes');
  },
  componentWillUnmount: function() {
    this.unbind('notes');
  },
  handleAddNote: function(newNote) {
    this.database.ref(this.props.params.username)
    .child(this.state.notes.length).set(newNote);
  },
  render: function() {
    console.log(this.props);
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile
            username={this.props.params.username}
            bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos
            username={this.props.params.username}
            repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes
            username={this.props.params.username}
            notes={this.state.notes}
            addNote={this.handleAddNote} />
        </div>
      </div>
    );
  }
});

module.exports = Profile;
