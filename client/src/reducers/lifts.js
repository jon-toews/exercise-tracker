import moment from "moment"

function lift(state = {}, action) {
  switch (action.type) {
    case "ADD_LIFT":
      return {
        ...action.lift,
        _id: action.liftId
      }
    case "EDIT_LIFT":
      if (action.liftId !== state._id) {
        return state
      }
      return {
        ...state,
        ...action.lift
      }
    default:
      return state
  }
}

function lifts(state = [], action) {
  switch (action.type) {
    case "ADD_LIFT":
      return [...state, lift(undefined, action)]
    case "EDIT_LIFT":
      return state.map(l => lift(l, action))
    case "DELETE_LIFT":
      const i = state.findIndex(lift => lift._id === action.liftId)
      if (i === -1) return
      return [...state.slice(0, i), ...state.slice(i + 1)]

    default:
      return state
  }
}

export default lifts

// selector functions

export const getLiftsOfType = (state, filter) => {
  if (!filter) return state

  return state
    .filter(lift => lift.lift_type === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const getLiftsByDate = state => {
  return state.reduce((dates, lift) => {
    const date = moment(lift.date).format("YYYYMMDD")
    dates[date] = dates[date] || []
    dates[date].push(lift)
    return dates
  }, {})
}
