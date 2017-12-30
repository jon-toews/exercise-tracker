import { combineReducers } from "redux"
import lifts, * as fromLifts from "./lifts"
import selectedLift from "./selectedLift"

const reducer = combineReducers({ lifts, selectedLift })

export default reducer

// selector functions

export const getLiftsOfType = (state, filter) =>
  fromLifts.getLiftsOfType(state.lifts, filter)

export const getLiftsByDate = state => fromLifts.getLiftsByDate(state.lifts)
