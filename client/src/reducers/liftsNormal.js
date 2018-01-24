import moment from "moment"
import { combineReducers } from "redux"
import byId, * as fromById from './byId'
import { union } from 'lodash.union'

const ids = (state = [], action) => {
  switch (action.type) {
    case "FETCH_LIFTS_SUCCESS":
      return action.response.map(lift => lift._id)
    case "ADD_LIFT_SUCCESS":
      return [
        ...state,
        action.response._id
      ]
    case "DELETE_LIFT_SUCCESS":
      const i = state.indexOf(action.liftId)
      if (i === -1) return state
      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ]
      
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case "FETCH_LIFTS_REQUEST":
      return true
    case "FETCH_LIFTS_SUCCESS":
    case "FETCH_LIFTS_FAILURE":
      return false
    default:
      return state
  }
}

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case "FETCH_LIFTS_REQUEST":
    case "FETCH_LIFTS_SUCCESS":
      return null
    case "FETCH_LIFTS_FAILURE":
      return action.message
    default:
      return state
  }
}

const type = combineReducers({ ids, isFetching, errorMessage})

export function listByType(state = {}, action) {
  if (!action.liftType) {
    return state
  }

  const key = action.liftType
  switch (action.type) {
    case "FETCH_LIFTS_SUCCESS":
    case "FETCH_LIFTS_REQUEST":
    case "FETCH_LIFTS_FAILURE":
    case "ADD_LIFT_SUCCESS":
    case "DELETE_LIFT_SUCCESS":
      return {
        ...state,
        [key]: type(state[key], action)
      }
    default:
      return state
  }
}

export const liftTypes = (state = [], action) => {
  switch(action.type) {
    case "FETCH_TYPES_SUCCESS":
      return action.response
    case "ADD_LIFT_SUCCESS":
      return [
        ...state,
        action.liftType
      ]
    default:
      return state
  }
}


export const allIds = (state = [], action) => {
  switch(action.type) {
    case "FETCH_LIFTS_SUCCESS":
      return union([
        state,
        action.response.map(lift => lift._id)
      ])
     
    case "ADD_LIFT_SUCCESS":
      return [
        ...state,
        action.response._id
      ]
    case "DELETE_LIFT_SUCCESS":
      console.log('allIds delete firing.  LiftId:', action.liftId)
      const i = state.indexOf(action.liftId)
      if (i === -1) return state
      return [
        ...state.slice(0, i),
        ...state.slice(i + 1),
      ]
    default:
      return state
  }
}

const lifts = combineReducers({
  byId,
  liftTypes,
  listByType,
  allIds,
})

export default lifts

/* SELECTOR FUNCTIONS */

// returns list of lifts for given type
export const getLiftsOfType = (state, type) => {
  if (!state.listByType.hasOwnProperty(type)) {
    return []
  }
  return state.listByType[type].ids.map(id => fromById.getLift(state.byId, id))
}

// returns lookup table of lifts per date
export const getLiftsByDate = state => {
  const lifts = state.allIds.map(id => fromById.getLift(state.byId, id))
  return lifts.reduce((byDate, lift) => {
    const formattedDate = moment(lift.date).format("YYYYMMDD")
    byDate[formattedDate] = byDate[formattedDate] || []
    byDate[formattedDate].push(lift)
    return byDate
  }, {})
}

// get array of lifts from given date
export const getLiftsOfDate = (state, date) => {
  if (!state.listByDate.hasOwnProperty(date)) {
    return []
  }
  return state.listByDate[date].map(id => fromById.getLift(state.byId, id))
}

export const getIsFetching = (state, liftType) =>
  state.listByType[liftType] ? state.listByType[liftType].isFetching : false

export const getErrorMessage = (state, liftType) =>
  state.listByType[liftType] ? state.listByType[liftType].errorMessage : ''


export const getTypeFromId = (state, id) => {
  return fromById.getTypeFromId(state.byId, id)
}