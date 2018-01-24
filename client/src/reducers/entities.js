import merge from 'lodash.merge'
import omit from 'lodash.omit'

import { combineReducers } from 'redux'

const lifts = (state = {}, action) => {

  switch(action.type) {
    case "FETCH_LIFTS_SUCCESS":
    case "EDIT_LIFT_SUCCESS":
    case "ADD_LIFT_SUCCESS":
      return merge({}, state, action.response.entities.lifts)
    case "DELETE_LIFT_SUCCESS":
      return omit(state, action.liftId) 
    default:
      return state
  }
}

const types = (state = [], action) => {
  if (!action.response) return state

  switch(action.type) {
    case "FETCH_TYPES_SUCCESS":
      return [
        ...state,
        ...action.response,
      ]
    case "EDIT_LIFT_SUCCESS":
    case "ADD_LIFT_SUCCESS":
      return [...state, action.liftType]
    default:
      return state
  }
}

const entities = combineReducers({
  lifts,
  types
})

export default entities


export const getLift = (state, id) => state.lifts[id]
export const getTypeFromId = (state, id) => state[id].lift_type
