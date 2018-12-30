import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner
} from './common'
import {
  emailChanged,
  passwordChanged,
  loginUser
} from '../actions'
import styles from '../styles/loginForm'

class LoginForm extends React.Component {
  onButtonPress() {
    const { email, password } = this.props
    this.props.loginUser({ email: email || 'A@a.com', password: password || 'password' })
  }

  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  renderError() {
    return this.props.error
      ? (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      )
      : null
  }

  renderButton() {
    const button = (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    )

    return this.props.loading ? <Spinner /> : button
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@website.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            secureTextEntry
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    email: auth.email,
    password: auth.password,
    error: auth.error,
    loading: auth.loading
  }
}

const actionCreators = { emailChanged, passwordChanged, loginUser }

export default connect(mapStateToProps, actionCreators)(LoginForm)