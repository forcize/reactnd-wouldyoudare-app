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
    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    })
      .then(question => dispatch(addNewQuestion(question)))
  }
}

export function AddQuestionAnswer(answer) {
  return (dispatch) => {
    return saveQuestionAnswer(answer)
      .then(data =>
        dispatch(receiveQuestionAnswer(answer))
      )
  }
}
