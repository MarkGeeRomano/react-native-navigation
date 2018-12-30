import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import Router from './Router'

class App extends React.Component {
  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBaJcFI1hSmzaGT8MRTGQol-zRSXJF8pRQ',
      authDomain: 'navigation-4a53e.firebaseapp.com',
      databaseURL: 'https://navigation-4a53e.firebaseio.com',
      projectId: 'navigation-4a53e',
      storageBucket: 'navigation-4a53e.appspot.com',
      messagingSenderId: '258723730646'
    })
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    )
  }
}

export default App