import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import Questions from './Questions';
import { sortTabs } from '../includes/api';
import PropTypes from 'prop-types'

class Home extends Component {
  render() {
    return (
      <div className="stream">
        <ul className="questions p-0">
          <Tabs variant="pills" defaultActiveKey="unanswered" id="tabbed-questions" className="nav-fill">
            <Tab eventKey="unanswered" title="Not Answered" className="mt-4">
              {this.props.result.map(question => question.vote === false && (
                <li className="mb-3" key={question.id}>
                  <Questions id={question.id} layout="home" />
                </li>
              ))}
            </Tab>
            <Tab eventKey="answered" title="Answered" className="mt-4">
              {this.props.result.map(question => question.vote !== false && (
                <li className="mb-3" key={question.id}>
                  <Questions id={question.id} layout="home" />
                </li>
              ))}
            </Tab>
          </Tabs>
        </ul>
      </div>
    );
  }
}

Home.propTypes = {
  result: PropTypes.array
};

function mapStateToProps({ questions, authedUser }) {
  return sortTabs(questions, authedUser);
}

export default connect(mapStateToProps)(Home);
