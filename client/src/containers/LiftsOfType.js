import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchLifts } from "../actions/index"
import { withRouter } from "react-router-dom"
import { getIdsOfType, getErrorMessage, getIsFetching } from "reducers"
import LiftList from "components/LiftList"
import FetchError from "components/FetchError"

class LiftsOfType extends Component {
  render() {
    const { isFetching, errorMessage, ids } = this.props
    console.log("LifsOfType ids", ids)

    if (isFetching && !ids.length) {
      return <p>Loading...</p>
    }

    if (errorMessage && !ids.length) {
      return <FetchError message={errorMessage} onRetry={() => this.fetchData()} />
    }

    return <LiftList {...this.props} />
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
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
    ids: getIdsOfType(state, filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchLifts: (data, type) => dispatch(fetchLifts(data, type))
})

LiftsOfType = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LiftsOfType)
)

export default LiftsOfType
