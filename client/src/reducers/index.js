import { combineReducers } from "redux"
import entities, * as fromEntities from "./entities"
import liftsByType from './liftsByType'
import selectedLift from "./selectedLift"
import moment from 'moment'

const reducer = combineReducers({ entities, liftsByType, selectedLift })

export default reducer

/* ------------------------
 * SELECTOR FUNCTIONS 
 * ------------------------
 */

export const getLiftsOfType = (state, liftType) => {
  // check if lift type key exists
  if (!state.liftsByType.hasOwnProperty(liftType)) {
    return []
  }
  // populate lift data
  return state.liftsByType[liftType].ids
    .map(id => state.entities.lifts[id])
}

export const getIdsOfType = (state, liftType) => {
  // check if lift type key exists
  if (!state.liftsByType.hasOwnProperty(liftType)) {
    return []
  }
  // populate lift data
  return state.liftsByType[liftType].ids
}
  

export const getLiftsByDate = state => {
  // check if key exists
  if (!state.liftsByType.hasOwnProperty("recent")) {
    return []
  }
  // populate lift data from entities
  const lifts = state.liftsByType["recent"].ids
    .map(id => state.entities.lifts[id])

  // reformat into lookup table with dates as keys
  return lifts.reduce((byDate, lift) => {
    const formattedDate = moment(lift.date).format("YYYYMMDD")
    byDate[formattedDate] = byDate[formattedDate] || []
    byDate[formattedDate].push(lift)
    return byDate
  }, {})
}

export const getLiftTypes = state => state.entities.types

export const getIsFetching = (state, filter) => false

export const getErrorMessage = (state, filter) => null

export const getTypeFromId = (state, id) => 
  state.entities.lifts[id].lift_type
