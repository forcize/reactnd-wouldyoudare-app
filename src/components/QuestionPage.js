import React, { Component } from 'react';
import { connect } from 'react-redux';
import Questions from './Questions';

class QuestionPage extends Component {
  render() {
    return (
      <li>
        <Questions id={this.props.match.params.id} layout="single" />
      </li>
    );
  }
}

export default connect()(QuestionPage);
