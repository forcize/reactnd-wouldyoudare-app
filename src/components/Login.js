import React, { Component } from 'react';
import { connect } from 'react-redux'
import { LoginAuthUser } from '../actions/authedUser'
import { Dropdown } from 'react-bootstrap'
import PropTypes from 'prop-types'

class Login extends Component {

  handleSubmit = (userid) => {
    const { dispatch } = this.props
    dispatch( LoginAuthUser(userid))
  }

  render() {
    const { users } = this.props
    return (
      <div className="jumbotron">
        <h1 className="display-4">Hey There!</h1>
        <p className="lead">In order to access the app you need to sign in</p>
        <hr className="my-4" />
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sign In
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {users.map((user) => (
              <Dropdown.Item key={user.id} href="#" onClick={()=>this.handleSubmit(user.id)}>{user.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  users: PropTypes.array

};

function mapStateToProps({users}){
  const usersId = Object.keys(users)
  const userArr = usersId.map((userid) =>{
    return {id: users[userid].id, name: users[userid].name }
  })
  return {users: userArr}
}

export default connect(mapStateToProps)(Login)
