import React, { Component } from 'react';
import { connect } from 'react-redux'
import { richQuestions, questionExist } from '../includes/api'
import PropTypes from 'prop-types'
import { voteQuestionHandler } from '../actions/shared'
import { Button, Card, ProgressBar } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'

class Questions extends Component {

  state = {
    questionAnswer: 'optionOne',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { questionAnswer } = this.state
    const { dispatch } = this.props
    dispatch(voteQuestionHandler({authedUser: this.props.question.authedUser, qid: this.props.question.id, answer: questionAnswer}))
    this.setState(() => ({
      questionAnswer: ''
    }))
  }

  handleChange = (e) => {
    const value = e.target.value
    this.setState({
      questionAnswer: value
    });
  }

  render() {

    const { question } = this.props
    const { toHome } = this.state

    if (question === null) {
      return <p>This question doesn&apos;t exist</p>
    }

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const userVote = questionExist(question, question.authedUser);

    return (
      <React.Fragment>
        {this.props.layout === "home" ? (
          <Card>
            <Card.Header>{question.authorName} asks:</Card.Header>
            <Card.Body>
              <Card.Title>Would you rather?...</Card.Title>
              <img alt="Avatar" className ="float-left border-right pr-3 user-avatar mr-3" src={question.avatarURL}></img>
              <Card.Text>
                {question.optionOne.text} or...
              </Card.Text>
              <Link to={`/question/${question.id}`}><Button variant="primary" className="mt-3">View</Button></Link>
            </Card.Body>
          </Card>
        ) : this.props.layout === "single" && questionExist(question, question.authedUser) ? (
          <Card>
            <form className='view-question-votes'>
              <Card.Header>{question.authorName} asks:</Card.Header>
              <Card.Body>
                <Card.Title>Would you rather?...</Card.Title>
                <img alt="Avatar" className ="float-left pr-3 user-avatar mr-3" src={question.avatarURL}></img>
                <div className="content float-left">
                  <div className="option-1 mb-3">
                    {question.optionOne.text} {userVote === "questionOne" && <span><strong>(Your Vote)</strong></span>}
                    <ProgressBar now={question.optionOne.votes.length} max={question.optionOne.votes.length + question.optionTwo.votes.length} />
                    <p>Votes: {question.optionOne.votes.length} of {question.optionOne.votes.length + question.optionTwo.votes.length} </p>
                  </div>
                  <div className="option-2 mb-3">
                    {question.optionTwo.text} {userVote === "questionTwo" && <span><strong>(Your Vote)</strong></span>}
                    <ProgressBar now={question.optionTwo.votes.length} max={question.optionOne.votes.length + question.optionTwo.votes.length} />
                    <p>Votes: {question.optionTwo.votes.length} of {question.optionOne.votes.length + question.optionTwo.votes.length} </p>
                  </div>
                </div>
              </Card.Body>
            </form>
          </Card>
        ) : this.props.layout === "single" && ! questionExist(question, question.authedUser) ? (
          <Card>
            <form className='reply-question' onSubmit={this.handleSubmit}>
              <Card.Header>{question.authorName} asks:</Card.Header>
              <Card.Body>
                <Card.Title>Would you rather?...</Card.Title>
                <img alt="Avatar" className ="float-left pr-3 pb-2 user-avatar mr-3" src={question.avatarURL}></img>
                <div className="content float-left">
                  <div className="form-check">
                    <input className="form-check-input pb-2" type="radio" name="questionOne" id="rad1" onChange={this.handleChange} value="optionOne" checked={this.state.questionAnswer === "optionOne"} />
                    <label className="form-check-label">
                      {question.optionOne.text}
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input pb-5" type="radio" name="questionTwo" id="rad2" onChange={this.handleChange} value="optionTwo" checked={this.state.questionAnswer === "optionTwo"} />
                    <label className="form-check-label">
                      {question.optionTwo.text}
                    </label>
                  </div>
                  <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                </div>
              </Card.Body>
            </form>
          </Card>
        ) : (
          <div>
            Undefined Layout
          </div>
        )}
      </React.Fragment>
    );
  }
}

Questions.propTypes = {
  dispatch: PropTypes.func,
  question: PropTypes.object,
  layout: PropTypes.string
};

function mapStateToProps({ questions, users, authedUser }, {id}){
  const question = questions[id];

  return{
    authedUser,
    question : question ? richQuestions(question, users[question.author], authedUser) : null
  }
}

export default connect(mapStateToProps)(Questions)
