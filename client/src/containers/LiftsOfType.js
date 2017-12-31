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
import { getLiftsOfType } from "reducers"
import LiftList from "components/LiftList"

class LiftsOfType extends Component {
  render() {
    return <LiftList {...this.props} />
  }

  componentDidMount() {
    this.fetchData()
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      console.log('filter prop changed')
      this.fetchData()
    }
  }

  fetchData() {
    const { filter, fetchLifts } = this.props
    fetchLifts(filter)
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter
  return {
    lifts: getLiftsOfType(state, filter),
    selectedLift: state.selectedLift,
    filter
  }
}

const mapDispatchToProps = dispatch => ({
  onLiftSubmit: lift => dispatch(addLift(lift)),
  onLiftDelete: liftId => dispatch(deleteLift(liftId)),
  onLiftEdit: (liftId, lift) => dispatch(editLift(liftId, lift)),
  onLiftSelect: liftId => dispatch(setSelectedLift(liftId)),
  onLiftDeselect: liftId => dispatch(setSelectedLift(null)),
  fetchLifts: (data, type) => dispatch(fetchLifts(data, type))
})

LiftsOfType = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LiftsOfType)
)

export default LiftsOfType
