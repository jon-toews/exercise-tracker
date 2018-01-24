import union from 'lodash.union'

const updateList = (state = {
  isFetching: false,
  ids: [],
}, action) => {
  switch (action.type) {
    case "FETCH_LIFTS_SUCCESS":
      return {
        ids: union(state.ids, action.response.result),
        isFetching: false
      }
    case "ADD_LIFT_SUCCESS":
      return {
        ids: union(state.ids, [action.response.result]),
        isFetching: false
      }
    case "EDIT_LIFT_SUCCESS":
    case "DELETE_LIFT_SUCCESS":
      return {
        ids: state.ids.filter(id => id !== action.response.result),
        isFetching: false
      }
    default: 
      return state
  }
}

const deleteId = (state = {
  isFetching: false,
  ids: [],
}, action) => {
  return {
    ids: state.ids.filter(id => id !== action.response.result),
    isFetching: false
  }
}

const liftsByType = (state = {}, action) => {
  const key = action.liftType
  const prevKey = action.prevLiftType
  if (!key) return state

  switch (action.type) {
    case "FETCH_LIFTS_SUCCESS":
    case "ADD_LIFT_SUCCESS":
      return {
        ...state,
        [key]: updateList(state[key], action),
        recent: updateList(state['recent'], action),
      }
    case "DELETE_LIFT_SUCCESS":
      return {
        ...state,
        [key]: updateList(state[key], action),
        recent: updateList(state['recent'], action)
      }
    case "EDIT_LIFT_SUCCESS":
      // no action require if type of lift hasn't changed
      if (action.liftType === action.prevLiftType) {
        return state
      }
      return {
        ...state,
        [prevKey]: updateList(state[key], action)
      }
    default:
      return state
  }
}


export default liftsByType
