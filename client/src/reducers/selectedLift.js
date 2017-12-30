function selectedLift(state = null, action) {
  switch (action.type) {
    case "SET_SELECTED_LIFT":
      return action.liftId
    default:
      return state
  }
}

export default selectedLift