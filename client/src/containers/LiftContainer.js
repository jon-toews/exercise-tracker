import React, { Component } from "react"
import {getLifts, addLift, editLift, deleteLift} from 'api'

import styled from 'styled-components'

import Navigation from 'components/Nav'
import LiftItem from 'components/LiftItem'
import LiftForm from 'components/LiftForm'
import NewLiftForm from 'components/NewLiftForm'
import Menu from 'containers/Menu'

import moment from 'moment'
import { json } from "body-parser";


export default class LiftContainer extends Component {
  constructor(props) {
    super(props)

    const type = this.props.match.params.type

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
        console.log(JSON.stringify(response.data))
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
      <AppWrapper>
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
      </AppWrapper>
    )
  }
}

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(160px, 200px) minmax(600px, 800px) 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:  
    ". header header ."
    ". aside main .";
  min-height: 100vh;
`

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
      // .sort((a, b) => moment(b.date) - moment(a.date))
      .reduce((dates, lift) => {
        const date = moment(lift.date).format('YYYYMMDD');
        dates[date] = dates[date] || []
        dates[date].push(lift)
        console.log("dates: ", dates)
        return dates;
      }, {})


    const DateCards = Object.keys(liftsByDate)
      .sort((a,b) => b - a)
      .map(date => {
        return (
          <div>
            <h3>{moment(date).format("ddd, MMM Do YYYY")} </h3>
            {this.renderLiftCards(liftsByDate[date])}
          </div>
        )
      })


    return ( 
      <LiftAreaWrapper>
          <LiftForm 
            handleSubmit={this.props.handleSubmit}
            handleDelete={this.props.handleDelete}
            handleCancelEdit={this.props.handleCancelEdit}
          />
          {DateCards}
      </LiftAreaWrapper>
    ) 
  }
}

const LiftAreaWrapper = styled.div`
  grid-area: main;
  max-width: 900px;
  padding: 1rem;
  text-align: left;
  background: #fff;
  box-shadow: 1px 1px 2px rgba(0,0,0,.075);
`



