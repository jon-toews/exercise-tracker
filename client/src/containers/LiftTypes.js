import { connect } from "react-redux"
import FilterLinks from "components/FilterLinks"

const getLiftTypes = lifts => {
  return lifts.reduce((types, lift) => {
    if (types.indexOf(lift.lift_type) === -1) {
      types.push(lift.lift_type)
    }
    return types
  }, [])
}

const mapStateToProps = state => {
  return {
    types: getLiftTypes(state.lifts)
  }
}

export default connect(mapStateToProps, null, null, { pure: false })(
  FilterLinks
)
