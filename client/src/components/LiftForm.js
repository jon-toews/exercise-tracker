import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import DatePicker from 'react-datepicker'
import Button from 'components/Button'
import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment'
import styled from 'styled-components'


class LiftForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: this.props._id || null,
      lift_type: this.props.lift_type || null,
      sets: this.props.sets || null,
      reps: this.props.reps || null,
      weight: this.props.weight || null,
      date: moment(this.props.date) || moment()
    }
  }

  handleInputChange = event => {
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
      <ReactCSSTransitionGroup
       transitionName="lift"
       transitionEnterTimeout={2000}
       transitionLeaveTimeout={2000}
       transitionAppear={true}
       transitionAppearTimeout={5000}>
        <LiftFormLayout onSubmit={this.handleSubmit}>
          <StyledInput
            name="lift_type"
            type="text"
            placeholder="Lift"
            onChange={this.handleInputChange}
            value={this.state.lift_type}
          />
          <StyledInput
            name="sets"
            type="number"
            placeholder="Sets"
            onChange={this.handleInputChange}
            value={this.state.sets}
          />
          <StyledInput
            name="reps"
            type="number"
            placeholder="Reps"
            onChange={this.handleInputChange}
            value={this.state.reps}
          />
          <StyledInput
            name="weight"
            type="number"
            placeholder="Weight"
            onChange={this.handleInputChange}
            value={this.state.weight}
          />
          <StyledDatePicker
            className="date-picker"
            selected={this.state.date}
            onChange={this.handleDateChange} 
          />
          <FormButtonGroup>
            <Button primary type="submit">
              {buttonText}
            </Button>
            {this.state._id 
              ? <Button type="button" onClick={() => this.props.handleCancelEdit(this.state._id)}>Cancel</Button>
              : null
            }
            {this.state._id 
              ? <Button type="button" onClick={() => this.props.handleDelete(this.state._id)}>Delete</Button>
              : null}
          </FormButtonGroup>
        </LiftFormLayout>
      </ReactCSSTransitionGroup>
    )
  }
}

const FormButtonGroup = styled.div`
  grid-row: 2;
  grid-column: 1/6;
  justify-self: start;
  
  & > button {
    margin-right: .25em;
  }
`
const LiftFormLayout = styled.form`
  display: grid;
  grid-template-columns: minmax(160px, 1fr) 80px 80px 100px 120px;
  grid-column-gap: 2px;
  grid-row-gap:8px;
  padding:8px 4px;
  background: #f6f6f6;
`

const StyledDatePicker = styled(DatePicker)`
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.4;
  width: 100%;
  color: #555;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: inset 0 1px 1px rgba(0,0,0, .075);

  &:focus {
    border-color: #C5CAE9;
    box-shadow: inset 0 1px 1px rgba(0,0,0, .075), 
      0 0 8px rgba(159,168,218 ,.6);
  }
`
const StyledInput = styled.input`
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.4;
  width: 100%;
  color: #555;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: inset 0 1px 1px rgba(0,0,0, .075);

  &:focus {
    border-color: #C5CAE9;
    box-shadow: inset 0 1px 1px rgba(0,0,0, .075), 
      0 0 8px rgba(159,168,218 ,.6);
  }
`

export default LiftForm
