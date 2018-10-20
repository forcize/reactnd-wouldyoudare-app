import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import Questions from './Questions';
import { sortTabs } from '../includes/api';

class Home extends Component {
  render() {
    return (
      <div className="stream">
        <ul className="questions p-0">
          <Tabs variant="pills" defaultActiveKey="answered" id="tabbed-questions" className="nav-fill">
            <Tab eventKey="answered" title="Answered" className="mt-4">
              {this.props.result.map(question => question.vote !== false && (
              <li className="mb-3" key={question.id}>
                <Questions id={question.id} layout="home" />
              </li>
              ))}
            </Tab>
            <Tab eventKey="unanswered" title="Not Answered" className="mt-4">
              {this.props.result.map(question => question.vote === false && (
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

function mapStateToProps({ questions, authedUser }) {
  return sortTabs(questions, authedUser);
}

export default connect(mapStateToProps)(Home);
