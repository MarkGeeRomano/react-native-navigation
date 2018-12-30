import React from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardSection,
  Button
} from '../components/common'
import EmployeeForm from './EmployeeForm'

class EmployeeCreate extends React.Component {
  onButtonPress() {
    const { name, phone, shift } = this.props
    this.props.employeeCreate({ name, phone, shift: shift || 'Sunday' })
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props}/>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const { employeeForm } = state
  return {
    name: employeeForm.name,
    phone: employeeForm.phone,
    shift: employeeForm.shift
  }
}

export default connect(mapStateToProps)(EmployeeCreate)