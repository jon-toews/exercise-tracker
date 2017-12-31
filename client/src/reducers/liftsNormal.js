import moment from "moment"
import { combineReducers } from 'redux'

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

export function byId(state = {}, action) {
  switch (action.type) {
    case "ADD_LIFT":
    case "EDIT_LIFT":
      return {
        ...state, 
        [action.liftId]: lift(state[action.liftId], action)
      }
    case "DELETE_LIFT":
      return Object.keys(state).reduce((newState, key) => {
        const current= state[key]
        
        if (current._id !== action.liftId) {
          newState[current._id] = current
        }
        return newState

      }, {})
    default:
      return state
  }
}

export function allIds(state = [], action) {
  switch (action.type) {
    case "ADD_LIFT":
      return [...state, action.liftId]

    case "DELETE_LIFT":
      const i = state.indexOf(action.liftId)
      if (i === -1) {
        return state
      }
      return [
        ...state.slice(0, i),
        ...state.slice(i)
      ]
    default:
      return state
  }
}

const lifts = combineReducers({
  byId,
  allIds
})

export default lifts

const getAllLifts = state => {
  return state.allIds.map(id => state.byId[id])
}


// selector functions

export const getLiftsOfType = (state, filter) => {
  const allLifts = getAllLifts(state)
  if (!filter) return allLifts

  return allLifts
    .filter(lift => lift.lift_type === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const getLiftsByDate = state => {
  const allLifts = getAllLifts(state)
  
  return allLifts.reduce((dates, lift) => {
    const date = moment(lift.date).format("YYYYMMDD")
    dates[date] = dates[date] || []
    dates[date].push(lift)
    return dates
  }, {})
}
