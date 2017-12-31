import { v4 } from "node-uuid"
import * as api from "api"

const receiveLifts = (liftType, response) => ({
  type: "RECEIVE_LIFTS",
  liftType,
  response
})
export const fetchLifts = type =>
  api.fetchLifts(type).then(response => receiveLifts(type, response.data))

export const addLift = (lift, liftId) => ({
  type: "ADD_LIFT",
  lift,
  liftId: liftId ? liftId : v4()
})

export const editLift = (lift, liftId) => ({
  type: "EDIT_LIFT",
  lift,
  liftId
})

export const deleteLift = liftId => ({
  type: "DELETE_LIFT",
  liftId
})

export const setSelectedLift = liftId => ({
  type: "SET_SELECTED_LIFT",
  liftId
})
