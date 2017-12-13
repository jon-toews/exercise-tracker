import React from 'react';
import PropTypes from 'prop-types'

import styled from 'styled-components'

const LiftCard = styled.div`
  display: grid;
  grid-template-columns: minmax(160px, 1fr) 80px 80px 100px 160px;
  grid-gap: 8px;
  padding: 5px;
`
const LiftField = styled.div`
  color: cornflowerblue;
  text-align: left;
  background: #fff;
`
const LiftValue = styled.span`
  color: #2a2a2a;
  font-size: 16px;
`


const LiftItem = props => {
  const dateString = new Date(props.date).toLocaleDateString();
  return (
    <LiftCard onClick={() => props.handleEditItem(props._id)}>
      <LiftField>
        <LiftValue>{props.lift_type}</LiftValue>
      </LiftField>
      <LiftField>
        Sets: <LiftValue>{props.sets}</LiftValue>
      </LiftField>
      <LiftField>
        Reps: <LiftValue>{props.reps}</LiftValue>
      </LiftField>
      <LiftField>
        Weight: <LiftValue>{props.weight}</LiftValue>
      </LiftField>
      {props.shouldShowDate ? 
        <LiftField>
          Date: <LiftValue>{dateString}</LiftValue>
        </LiftField> :
        null
      }
    </LiftCard>
  )
}

const LiftItemz = props => {
  const dateString = new Date(props.date).toLocaleDateString();
  return (
    <div className="lift-card" onClick={() => props.handleEditItem(props._id)}>
      <div className="lift-field">
        <span className="lift-value">{props.lift_type}</span>
      </div>
      <div className="lift-field">
        Sets: <span className="lift-value">{props.sets}</span>
      </div>
      <div className="lift-field">
        Reps: <span className="lift-value">{props.reps}</span>
      </div>
      <div className="lift-field">
        Weight: <span className="lift-value">{props.weight} </span>
      </div>
      {props.shouldShowDate ? 
        <div className="lift-field">
          Date: <span className="lift-value">{dateString}</span>
        </div> :
        null
      }
    </div>
  )
}

LiftItem.propTypes = {
  lift_type: PropTypes.String,
  sets: PropTypes.String,
  reps: PropTypes.String,
  weight: PropTypes.String,
  date: PropTypes.Date,
  shouldShowDate: PropTypes.bool
}

export default LiftItem