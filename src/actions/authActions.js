import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

export const emailChanged = (text) => {
  return {
    type: 'email_changed',
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: 'password_changed',
    payload: text
  }
}

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: 'login_user' })

    let user
    try {
      user = await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
      try {
        user = await firebase.auth().createUserWithEmailAndPassword(email, password)
      } catch (err) {
      }
    }
    if (user) {
      dispatch({ type: 'login_user_success', payload: user })
      Actions.main()
    } else {
      dispatch({ type: 'login_user_fail' })
    }
  }
}