import React, { Component } from "react"
import "./Lift.css"
import "bootstrap.css"
import {getLifts, addLift, editLift, deleteLift} from 'api'

import Navigation from 'components/Nav'
import LiftItem from 'components/LiftItem'
import LiftForm from 'components/LiftForm'
import NewLiftForm from 'components/NewLiftForm'
import Menu from 'containers/Menu'


export default class LiftContainer extends Component {
  constructor(props) {
    super(props)

    const type = this.props.match.params.type

    console.log("constructing: type", type)
    this.state = {
      lifts: [],
      selectedLift: null,
      
    }
  }

  componentDidMount() {
    console.log('liftContainer did mount')
    // get user lifts
    getLifts({lift_type: this.state.liftFilter})
      .then(response => {
        this.setState({ lifts: response.data })
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentWillReceiveProps(props) {
    getLifts({lift_type: props.match.params.type})
      .then(response => {
        this.setState({ lifts: response.data })
      })
      .catch(error => { console.error(error) })
  }

  handleSubmit = data => {
    if (data._id) {
      
      editLift(data)
        .then(response => {
          const lifts = this.state.lifts.slice()
          const updatedLifts = lifts.map(lift => {
            return data._id === lift._id ? data : lift
          })
          this.setState({ lifts: updatedLifts, selectedLift: null })
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      addLift(data)
        .then(response => {
          this.setState({
            lifts: this.state.lifts.concat(response.data)
          })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  handleDelete = id => {
    deleteLift(id)
      .then(response => {
        const lifts = this.state.lifts.slice()
        const updatedLifts = lifts.filter(lift => lift._id !== id)
        this.setState({lifts: updatedLifts})
      })
      .catch(error => {
        console.error(error)
      })
  }

  handleEditItem = id => {
    this.setState({ selectedLift: id })
  }

  handleCancelEdit = id => {
    this.setState({ selectedLift: null })
  }

  displayNewLiftForm = () => {
    this.setState({ selectedLift: 'new' })
  }

  render() {
    return (
      <div className="lift-wrapper">
        <Navigation />
        <Menu liftType={this.state.liftFilter} handleFilter={this.handleFilter} />
        <LiftArea
          lifts={this.state.lifts}
          handleSubmit={this.handleSubmit}
          handleDelete={this.handleDelete}
          handleEditItem={this.handleEditItem}
          handleCancelEdit={this.handleCancelEdit}
          selectedLift={this.state.selectedLift}
          displayNewLiftForm={this.displayNewLiftForm}
        />
      </div>
    )
  }
}

class LiftArea1 extends Component {
  render() {
    const lifts = this.props.lifts.slice()

    const sortedLifts = lifts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

    const LiftItems = sortedLifts.map(lift => {
      return this.props.selectedLift !== lift._id ? (
        <LiftItem
          key={lift._id}
          handleEditItem={this.props.handleEditItem}
          {...lift}
        />
      ) : (
        <LiftForm
          key={lift._id}
          handleSubmit={this.props.handleSubmit}
          handleDelete={this.props.handleDelete}
          handleCancelEdit={this.props.handleCancelEdit}
          {...lift}
        />
      )
    })

    return <div className="lift-area">
      {LiftItems}
      {this.props.selectedLift === "new" ? 
        <LiftForm 
          handleSubmit={this.props.handleSubmit}
          handleDelete={this.props.handleDelete}
          handleCancelEdit={this.props.handleCancelEdit}
        /> : null }
          
      <div className="add-lift" onClick={this.props.displayNewLiftForm}> + Add </div>
    </div>
  }
}

class LiftArea extends Component {

  renderLiftCards(lifts) {
    return lifts.map(lift => {
      return this.props.selectedLift !== lift._id ? (
        <LiftItem
          key={lift._id}
          handleEditItem={this.props.handleEditItem}
          shouldShowDate={false}
          {...lift}
        />
      ) : (
        <LiftForm
          key={lift._id}
          handleSubmit={this.props.handleSubmit}
          handleDelete={this.props.handleDelete}
          handleCancelEdit={this.props.handleCancelEdit}
          {...lift}
        />
      )
    })
  }

  render() {
    const lifts = this.props.lifts.slice()

    const liftsByDate = lifts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .reduce((dates, lift) => {
        dates[lift.date] = dates[lift.date] || []
        dates[lift.date].push(lift)
        return dates;
      }, {})

    const DateCards = Object.keys(liftsByDate)
      .map(date => {
        return (
          <div>
            <h3>{date.slice(0, 10)} </h3>
            {this.renderLiftCards(liftsByDate[date])}
          </div>
        )
      })


    return ( 
      <div className="lift-area">
        <div className="add-lift" onClick={this.props.displayNewLiftForm}></div>
          <NewLiftForm 
            handleSubmit={this.props.handleSubmit}
            handleDelete={this.props.handleDelete}
            handleCancelEdit={this.props.handleCancelEdit}
          />
          {DateCards}
        
      </div>
    ) 
  }
}



