import React, { Component } from 'react'
import Navbar from 'react-bootstrap/lib/Navbar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Nav from 'react-bootstrap/lib/Nav'
import { Container, Row, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { LogoutAuthUser } from '../actions/authedUser'

class Navigation extends Component {

  handleSubmit = () => {
    const { dispatch } = this.props
    dispatch(LogoutAuthUser())
  }

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Container>
          <Row>
            <LinkContainer to="/"><Navbar.Brand>Would you Dare? </Navbar.Brand></LinkContainer>
            <Nav className="mr-auto">
              <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
              <LinkContainer to="/add"><Nav.Link>New Question</Nav.Link></LinkContainer>
              <LinkContainer to="/leaderboard"><Nav.Link>Leaderboard</Nav.Link></LinkContainer>
            </Nav>
            {this.props.authedUser !== null &&
              <div className="logout">
                <Button variant="danger" onClick={()=> this.handleSubmit()}>{this.props.authedUser} (Logout)</Button>
              </div>
            }
          </Row>
        </Container>
      </Navbar>

    );
  }
}

Navigation.propTypes = {
  dispatch: PropTypes.func,
  authedUser: PropTypes.string

};


function mapStateToProps({authedUser}){
  return {authedUser}
}

export default connect(mapStateToProps)(Navigation)
