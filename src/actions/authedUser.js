export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}

export function LoginAuthUser (id) {
  return dispatch => dispatch(setAuthedUser(id))
}

export function LogoutAuthUser () {
  return dispatch => dispatch(setAuthedUser(null))
}
