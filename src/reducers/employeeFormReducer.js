const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'employee_update':
      return { ...state, [action.payload.prop]: action.payload.value }
    case 'employee_created':
    case 'employee_saved':
      return INITIAL_STATE
    case 'employees_fetch_success':   
    default:
      return state
  }
}