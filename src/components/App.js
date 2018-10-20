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
        </React.Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)
