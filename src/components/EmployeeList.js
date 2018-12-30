import React from 'react'
import { connect } from 'react-redux'
import { ListView } from 'react-native'
import _ from 'lodash'
import { employeesFetch } from '../actions/employeeActions'
import ListItem from './ListItem'

class EmployeeList extends React.Component {
  componentWillMount() {
    this.props.employeesFetch()
    this.createDataSource(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource(props) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    this.dataSource = ds.cloneWithRows(props.employees)
  }

  renderRow(employee) {
    return <ListItem employee={employee}/>
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      >
      </ListView>
    )
  }
}

const mapStateToProps = (state) => {
  const employees = _.map(state.employees, (employee, uid) =>
    ({ ...employee, uid })
  )

  return { employees }
}

export default connect(mapStateToProps, { employeesFetch })(EmployeeList)