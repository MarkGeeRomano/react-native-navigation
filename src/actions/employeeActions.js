import firebase from 'firebase'
import { Actions } from 'react-native-router-flux';

export const employeeUpdate = (load) => {
  return {
    type: 'employee_update',
    payload: load
  }
}

export const employeeCreate = (load) => {
  const { uid } = firebase.auth().currentUser

  return async (dispatch) => {
    await firebase.database().ref(`/users/${uid}/employees`).push(load)
    dispatch({ type: 'employee_created' })
    Actions.pop()
  }
}

export const employeesFetch = () => {
  const { uid } = firebase.auth().currentUser

  return (dispatch) => {
    firebase.database().ref(`/users/${uid}/employees`)
      .on('value', (snapshot) => {
        dispatch({ type: 'employees_fetch_success', payload: snapshot.val() })
      })
  }
}

export const employeeSave = (load) => {
  const { name, phone, shift, uid } = load
  const { currentUser } = firebase.auth()

  return async (dispatch) => {
    await firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
    dispatch({ type: 'employee_saved' })
    Actions.pop()
  }
}

export const employeeDelete = (uid) => {
  const { currentUser } = firebase.auth()

  return async () => {
    await firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
    Actions.pop()
  }
}