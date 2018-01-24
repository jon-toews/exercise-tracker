import React, { Component } from "react"
import { connect } from "react-redux"
import {
  editLift,
  addLift,
  deleteLift,
  setSelectedLift,
  fetchLifts
} from "../actions/index"
import { withRouter } from "react-router-dom"
import { getLiftsByDate } from "reducers"
import LiftListByDate from "components/LiftListByDate"
import FetchError from "components/FetchError"

class LiftsByDate extends Component {
  render() {
    return <LiftListByDate {...this.props} />
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
  }

  fetchData() {
    const { fetchLifts } = this.props
    fetchLifts()
  }
}

const mapStateToProps = (state) => {
  console.log('lifts by date', getLiftsByDate(state))
  return {
    liftsByDate: getLiftsByDate(state),
    selectedLift: state.selectedLift,
  }
}

const mapDispatchToProps = dispatch => ({
  onLiftSubmit: lift => dispatch(addLift(lift)),
  onLiftDelete: liftId => dispatch(deleteLift(liftId)),
  onLiftEdit: (liftId, lift) => dispatch(editLift(liftId, lift)),
  onLiftSelect: liftId => dispatch(setSelectedLift(liftId)),
  onLiftDeselect: liftId => dispatch(setSelectedLift(null)),
  fetchLifts: () => dispatch(fetchLifts())
})

LiftsByDate = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LiftsByDate)
)

export default LiftsByDate
