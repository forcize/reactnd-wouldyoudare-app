import { RECEIVE_USERS } from '../actions/users';
import { ADD_QUESTION_USER } from '../actions/users';
import { ADD_QUESTION_USER_ANSWER } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
  case RECEIVE_USERS:
    return {
      ...state,
      ...action.users,
    };
  case ADD_QUESTION_USER:
    return {
      ...state,
      [action.user.question.author]: {
        ...state[action.user.question.author],
        questions: state[action.user.question.author].questions.concat([action.user.question.id]),
      }
    };
  case ADD_QUESTION_USER_ANSWER:
    return {
      ...state,
      [action.answer.authedUser] : {
        ...state[action.answer.authedUser],
        answers : {
          ...state[action.answer.authedUser].answers,
          [action.answer.qid] : action.answer.answer
        }
      }
    };
  default:
    return state;
  }
}
