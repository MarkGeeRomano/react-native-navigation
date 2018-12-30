import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Communications from 'react-native-communications'
import EmployeeForm from './EmployeeForm'
import { Card, CardSection, Button, Confirm } from './common'
import { employeeUpdate, employeeSave, employeeDelete } from '../actions/employeeActions'

class EmployeeEdit extends React.Component {
  constructor() {
    super()
    this.state = { showModal: false }
  }
  componentWillMount() {
    _.each(this.props.employee, (value, prop) =>
      this.props.employeeUpdate({ prop, value })
    )
  }

  onButtonPress() {
    this.props.employeeSave({ ...this.props, uid: this.props.employee.uid })
  }

  onTextPress() {
    const { phone, shift } = this.props
    Communications.text(phone, 'Your upcoming shift is on ' + shift)
  }

  onAccept() {
    this.setState({ showModal: false })
    this.props.employeeDelete(this.props.employee.uid)
  }

  onReject() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />

        <CardSection>
          <Button
            onPress={this.onButtonPress.bind(this)}
          >
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button
            onPress={this.onTextPress.bind(this)}
          >
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire Employee
          </Button>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onReject={this.onReject.bind(this)}
        >
          Are you sure you want to fire them?
          </Confirm>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.employeeForm.name,
    phone: state.employeeForm.phone,
    shift: state.employeeForm.shift
  }
}

const actions = { 
  employeeUpdate, 
  employeeSave,
  employeeDelete
 }
export default connect(mapStateToProps, actions)(EmployeeEdit)