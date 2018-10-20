import { getInitialData } from '../includes/api'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { setAuthedUser } from './authedUser'

export function handleInitialData () {
  return dispatch => getInitialData()
    .then(({ users, questions }) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(setAuthedUser(null))
    })
}
