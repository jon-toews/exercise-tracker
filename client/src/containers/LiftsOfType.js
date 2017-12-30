import { connect } from 'react-redux'
import { editLift, addLift, deleteLift, setSelectedLift } from '../actions/index';
import { withRouter } from 'react-router-dom'
import { getLiftsOfType } from 'reducers'
import LiftList from 'components/LiftList'

const mapStateToProps = (state, ownProps) => ({
  lifts: getLiftsOfType(state, ownProps.match.params.filter),
  selectedLift: state.selectedLift
})

const mapDispatchToProps = dispatch => ({
  onLiftSubmit: (lift) => dispatch(addLift(lift)),
  onLiftDelete: (liftId) => dispatch(deleteLift(liftId)),
  onLiftEdit: (liftId, lift) => dispatch(editLift(liftId, lift)),
  onLiftSelect: (liftId) => dispatch(setSelectedLift(liftId)),
  onLiftDeselect: (liftId) => dispatch(setSelectedLift(null))
})

const LiftsOfType = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LiftList))

export default LiftsOfType
