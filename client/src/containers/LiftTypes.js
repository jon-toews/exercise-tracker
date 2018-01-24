import React, { Component } from 'react'
import { connect } from "react-redux"
import FilterLinks from "components/FilterLinks"
import { getLiftTypes }  from 'reducers'
import { fetchLiftTypes } from 'actions'

class LiftTypes extends Component {

  render() {
    return <FilterLinks {...this.props} />
  }

  componentDidMount() {
    console.log("lift types mount")
    this.props.fetchLiftTypes()
  }
}

const mapStateToProps = state => {
  return {
    types: getLiftTypes(state)
  }
}

const mapDispatchToProps = dispatch => ({
  fetchLiftTypes: () => dispatch(fetchLiftTypes())
})

LiftTypes = connect(mapStateToProps, mapDispatchToProps)(LiftTypes)

export default LiftTypes
