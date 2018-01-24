import * as api from "api"
import { getIsFetching } from "reducers"

import { normalize, schema } from 'normalizr';

const liftSchema = new schema.Entity('lifts', {}, {idAttribute: '_id'});
const liftListSchema = new schema.Array(liftSchema);

export const fetchLifts = liftType => (dispatch, getState) => {
  
  console.log('fetching lifts.  lifttype:', liftType)
  if (getIsFetching(getState(), liftType)) {
    console.log("ALREADY FETCHING")
    return Promise.resolve();
  }

  dispatch({ type: "FETCH_LIFTS_REQUEST", liftType })

  return api.fetchLifts(liftType).then(
    response => {
      console.log("server response:", response)
      return dispatch({
        type: "FETCH_LIFTS_SUCCESS",
        liftType: liftType || 'recent',
        response: normalize(response.data, liftListSchema)
      })
    },
    error =>
      dispatch({
        type: "FETCH_LIFTS_FAILURE",
        liftType,
        message: error.message || "Something went wrong",
      })
  )
}

export const fetchLiftTypes = () => dispatch => {
  dispatch({ type: "FETCH_TYPES_REQUEST" })

  return api.fetchLiftTypes().then(
    response =>
      dispatch({
        type: "FETCH_TYPES_SUCCESS",
        response: response.data,
      }),
    error =>
      dispatch({
        type: "FETCH_TYPES_FAILURE",
        message: error.message || "Something went wrong",
      })
  )
}

export const addLift = lift => dispatch => {
  
  api.addLift(lift).then(
    response => {
      const { lift_type: liftType } = response.data
      console.log('addlift response:', response.data)
      dispatch({
        type: "ADD_LIFT_SUCCESS",
        liftType,
        response: normalize(response.data, liftSchema),
      })
    },
    error => {
      dispatch({
        type: "ADD_LIFT_FAILURE",
        message: error.message || "Something went wrong",
      })
    }
  )
}

export const editLift = (lift) => (dispatch, getState) => {

  dispatch({ 
    type: "EDIT_LIFT_REQUEST",
    liftId: lift._id ,
    liftType: lift.lift_type
  })
  api.editLift(lift).then(
    response => {
      const { _id, lift_type: liftType } = response.data
      const prevLiftType = getState().entities.lifts[_id].lift_type
      dispatch({
        type: "EDIT_LIFT_SUCCESS",
        liftId: _id,
        prevLiftType,
        liftType, 
        response: normalize(response.data, liftSchema),
      })
    },
    error => {
      dispatch({
        type: "EDIT_LIFT_FAILURE",
        message: error.message || "Something went wrong",
      })
    }
  )
}

export const deleteLift = liftId => (dispatch, getState) => {

  api.deleteLift(liftId).then(
    response => {
      
      dispatch({
        type: "DELETE_LIFT_SUCCESS",
        liftType: response.data.lift_type,
        response: normalize(response.data, liftSchema),
      })
    },
    error => {
      dispatch({
        type: "DELETE_LIFT_FAILURE",
        message: error.message || "Something went wrong",
      })
    }
  )
}

export const setSelectedLift = liftId => ({
  type: "SET_SELECTED_LIFT",
  liftId,
})
