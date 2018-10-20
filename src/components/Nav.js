import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar'
import { connect } from 'react-redux'
import Nav from 'react-bootstrap/lib/Nav'
import { Container, Row } from 'react-bootstrap'
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
                <button onClick={()=> this.handleSubmit()}>{this.props.authedUser} (Logout)</button>
              </div>
            }
          </Row>
        </Container>
      </Navbar>

    );
  }
}

function mapStateToProps({authedUser }){
  return {authedUser}
}

export default connect(mapStateToProps)(Navigation)
