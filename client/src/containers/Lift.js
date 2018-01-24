import React, { Component } from "react"
import { connect } from "react-redux"
import {
  editLift,
  addLift,
  deleteLift,
  setSelectedLift,
  fetchLifts
} from "../actions/index"
import LiftCard from 'components/LiftCard'
import LiftCardEdit from 'components/LiftCardEdit'

class Lift extends Component {
  render() {

  const {
    lift,
    selectedLift,
    onLiftSubmit,
    onLiftEdit,
    onLiftDelete,
    onLiftSelect,
    onLiftDeselect,
  } = this.props

    return selectedLift !== lift._id ? (
      <LiftCard
        key={lift._id}
        handleEditItem={onLiftSelect}
        shouldShowDate={true}
        {...lift}
      />
    ) : (
      <LiftCardEdit
        key={lift._id}
        onLiftSubmit={onLiftSubmit}
        onLiftEdit={onLiftEdit}
        onLiftDelete={onLiftDelete}
        onLiftDeselect={onLiftDeselect}
        {...lift}
      />
    )
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    lift: state.entities.lifts[id],
    selectedLift: state.selectedLift,
  }
}

const mapDispatchToProps = dispatch => ({
  onLiftSubmit: lift => dispatch(addLift(lift)),
  onLiftDelete: liftId => dispatch(deleteLift(liftId)),
  onLiftEdit: (liftId, lift) => dispatch(editLift(liftId, lift)),
  onLiftSelect: liftId => dispatch(setSelectedLift(liftId)),
  onLiftDeselect: liftId => dispatch(setSelectedLift(null)),
})

Lift = connect(mapStateToProps, mapDispatchToProps)(Lift)

export default Lift
