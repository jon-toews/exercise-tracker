import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment'


class LiftForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: this.props._id || null,
      lift_type: this.props.lift_type || null,
      sets: this.props.sets || null,
      reps: this.props.reps || null,
      weight: this.props.weight || null,
      date: moment()
    }
  }

  handleInputChange = event => {
    console.log(event)
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleDateChange = date => {
    this.setState({ date })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.handleSubmit(this.state)
  }

  render() {
    const buttonText = this.state._id ? "Update" : "Add"
    console.log(this.state.date)
    const dateString = new Date(this.state.date).toISOString().slice(0, 10)

    return (
        <form className="form-inline lift-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="sr-only" for="lift_type" />
            <input
              name="lift_type"
              type="text"
              className="form-control"
              placeholder="Lift"
              onChange={this.handleInputChange}
              value={this.state.lift_type}
            />
          </div>
          <div className="form-group">
            <label className="sr-only" for="sets" />
            <input
              name="sets"
              type="number"
              className="form-control"
              placeholder="Sets"
              onChange={this.handleInputChange}
              value={this.state.sets}
            />
          </div>
          <div className="form-group">
            <label className="sr-only" for="reps" />
            <input
              name="reps"
              type="number"
              className="form-control"
              placeholder="Reps"
              onChange={this.handleInputChange}
              value={this.state.reps}
            />
          </div>
          <div className="form-group">
            <label className="sr-only" for="weight" />
            <input
              name="weight"
              type="number"
              className="form-control"
              placeholder="Weight"
              onChange={this.handleInputChange}
              value={this.state.weight}
            />
          </div>
          {/* <div className="form-group">
            <label className="sr-only" for="date" />
            <input
              name="date"
              type="date"
              className="form-control"
              onChange={this.handleInputChange}
              value={dateString}
            />
          </div> */}
          <div className="form-group">
            <DatePicker
              className="form-control date-picker"
              selected={this.state.date}
              onChange={this.handleDateChange} 
            />
          </div>
          <div className="form-group form-buttons-add-only">
            <button type="submit" className="btn btn-primary">
              {buttonText}
            </button>
          </div>
        </form>
    )
  }
}

export default LiftForm
