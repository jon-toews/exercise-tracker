import { v4 } from 'node-uuid'


// ACTIONS
export const addLift = (lift, liftId) => ({
  type: "ADD_LIFT",
  lift,
  liftId: liftId ? liftId : v4()
})

export const editLift = (lift, liftId) => ({
  type: "EDIT_LIFT",
  liftId,
  lift
})

export const deleteLift = (liftId) => ({
  type: "DELETE_LIFT",
  liftId
})

export const setSelectedLift = (liftId) => ({
  type: "SET_SELECTED_LIFT",
  liftId
})

