import React, { Component } from 'react';
import { connect } from 'react-redux';
import Questions from './Questions';
import PropTypes from 'prop-types'

class QuestionPage extends Component {
  render() {
    return (
      <li>
        <Questions id={this.props.match.params.id} layout="single" />
      </li>
    );
  }
}

QuestionPage.propTypes = {
  match: PropTypes.object
};

export default connect()(QuestionPage);
