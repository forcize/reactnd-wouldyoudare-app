import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import QuestionPage from './QuestionPage'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Navigation from './Nav'
import NewQuestion from './NewQuestion'
import PropTypes from 'prop-types'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render () {
    return (
      <Router>
        <React.Fragment>
          <LoadingBar />
          <Container fluid className="p-0">
            <Row>
              <Col md={12}>
                <Navigation />
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="h-100 mt-5">
              <Col md={12} className="align-self-center">
                {this.props.authedUser === null ? (
                  <Route path="/" component={Login} />
                ) : (
                  <div>
                    <Route path="/" exact component={Home} />
                    <Route path="/question/:id" component={QuestionPage} />
                    <Route path="/leaderboard" component={Leaderboard} />
                    <Route path="/add" component={NewQuestion} />
                  </div>
                )}
              </Col>
            </Row>
          </Container>
          <footer>
            <Container className="mt-5 mb-4">
              <Row>
                <Col md={12} className="align-self-center">
                  <div >Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank"  rel="noopener noreferrer">CC 3.0 BY</a></div>
                </Col>
              </Row>
            </Container>
          </footer>
        </React.Fragment>
      </Router>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  authedUser: PropTypes.string
};

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)
