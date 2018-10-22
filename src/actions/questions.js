import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { saveQuestion, saveQuestionAnswer } from '../includes/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTIONS = 'ANSWER_QUESTIONS'
export const ADD_QUESTIONS = 'ADD_QUESTIONS'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addNewQuestion (question) {
  return {
    type: ADD_QUESTIONS,
    question
  }
}

function receiveQuestionAnswer ({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTIONS,
    authedUser,
    qid,
    answer
  }
}

export function handleNewQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    })
      .then(question => dispatch(addNewQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function AddQuestionAnswer (answer) {
  return (dispatch) => {
    dispatch(receiveQuestionAnswer(answer))
    return saveQuestionAnswer(answer)
      .catch(() => {
        dispatch(receiveQuestionAnswer(answer))
      })
  }
}
