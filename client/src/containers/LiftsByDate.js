import { connect } from "react-redux"
import {
  editLift,
  addLift,
  deleteLift,
  setSelectedLift
} from "../actions/index"
import { getLiftsByDate } from 'reducers'
import LiftListByDate from "components/LiftListByDate"


const mapStateToProps = state => ({
  liftsByDate: getLiftsByDate(state),
  selectedLift: state.selectedLift
})

const mapDispatchToProps = dispatch => ({
  onLiftSubmit: lift => dispatch(addLift(lift)),
  onLiftDelete: liftId => dispatch(deleteLift(liftId)),
  onLiftEdit: (liftId, lift) => dispatch(editLift(liftId, lift)),
  onLiftSelect: liftId => dispatch(setSelectedLift(liftId)),
  onLiftDeselect: liftId => dispatch(setSelectedLift(null))
})

const LiftsByDate = connect(mapStateToProps, mapDispatchToProps)(LiftListByDate)

export default LiftsByDate
