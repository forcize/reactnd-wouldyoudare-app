import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardGroup } from 'react-bootstrap';
import PropTypes from 'prop-types'

class Leaderboard extends Component {
  render() {
    return (
      <CardGroup className="leaderboard">
        {this.props.usersObj.map(user => (
          <Card key={user.id}>
            <Card.Img variant="top" src={user.avatar} />
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <p> Voted: {user.answers} </p>
              <p> Questions: {user.questions} </p>
              <p> Total: {user.total} </p>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    );
  }
}

Leaderboard.propTypes = {
  usersObj: PropTypes.array
};

function mapStateToProps({ users}) {
  const id = Object.keys(users);

  const usersObj = id.map(id => ({
    id,
    name: users[id].name,
    answers: Object.keys(users[id].answers).length,
    questions: users[id].questions.length,
    total: Object.keys(users[id].answers).length + users[id].questions.length,
    avatar: users[id].avatarURL
  }));

  usersObj.sort((a, b) => a.total < b.total);

  return { usersObj };
}

export default connect(mapStateToProps)(Leaderboard);
