import { getInitialData } from '../includes/api'
import { receiveQuestions, handleNewQuestion, AddQuestionAnswer } from './questions'
import { receiveUsers, AddQuestionUserDispatch, AddNewQuestionAnswerUserDispatch } from './users'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function newQuestionHandler(optionOneText, optionTwoText){
  return (dispatch) => {
    dispatch(handleNewQuestion(optionOneText, optionTwoText)).then((data) => {
      dispatch(AddQuestionUserDispatch(data))
    });
  };
}

export function voteQuestionHandler(answer){
  return (dispatch) => {
    dispatch(AddQuestionAnswer(answer)).then((data) => {
      dispatch(AddNewQuestionAnswerUserDispatch(data))
    });
  };
}

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(null))
        dispatch(hideLoading());
      })
  }
}
