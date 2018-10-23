export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER'
export const ADD_QUESTION_USER_ANSWER = 'ADD_QUESTION_USER_ANSWER'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function addNewQuestionUser(user) {
  return {
    type: ADD_QUESTION_USER,
    user
  }
}

export function addNewQuestionUserAnswer(answer) {
  return {
    type: ADD_QUESTION_USER_ANSWER,
    answer
  }
}

export function AddQuestionUserDispatch(question) {
  return (dispatch) => {
    dispatch(addNewQuestionUser(question))
  }
}

export function AddNewQuestionAnswerUserDispatch(answer) {
  return (dispatch) => {
    dispatch(addNewQuestionUserAnswer(answer))
  }
}
