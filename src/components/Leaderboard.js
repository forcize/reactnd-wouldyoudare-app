import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardGroup } from 'react-bootstrap';

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <CardGroup>
          {this.props.usersObj.map(user => (
            <Card key={user.id}>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  <p>
Voted:
                    {user.answers}
                  </p>
                  <p>
Questions:
                    {user.questions}
                  </p>
                  <p>
Total:
                    {user.total}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      </div>

    );
  }
}

function mapStateToProps({ users }) {
  const id = Object.keys(users);

  const usersObj = id.map(id => ({
    id,
    name: users[id].name,
    answers: Object.keys(users[id].answers).length,
    questions: users[id].questions.length,
    total: Object.keys(users[id].answers).length + users[id].questions.length,
  }));

  usersObj.sort((a, b) => a.total < b.total);

  return { usersObj };
}

export default connect(mapStateToProps)(Leaderboard);
