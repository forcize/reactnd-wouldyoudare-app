import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { handleNewQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {

  state = {
    questionOne: "",
    questionTwo: "",
    redirect: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(handleNewQuestion(this.state.questionOne, this.state.questionTwo))
    this.setState(() => ({
      questionOne: "",
      questionTwo: "",
      redirect: true
    }))
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Card>
          <Card.Header>Create New Question</Card.Header>
          <Card.Body>
            <Card.Title>Would you rather?...</Card.Title>
            <Form.Group className="mt-3" controlId="questionOne">
              <Form.Control type="text" placeholder="Enter the text for the first question" onChange={this.handleChange} name="questionOne" />
            </Form.Group>
            <strong>OR</strong>
            <Form.Group className="mt-3" controlId="questionTwo">
              <Form.Control type="text" placeholder="Enter the text for the second question" onChange={this.handleChange} name="questionTwo" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Card.Body>
        </Card>
      </Form>
    )
  }
}

NewQuestion.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)
