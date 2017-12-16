import React from 'react';
import PropTypes from 'prop-types'

import styled from 'styled-components'

const LiftCard = styled.div`
  display: grid;
  grid-template-columns: minmax(160px, 1fr) 80px 80px 100px 160px;
  grid-gap: 8px;
  padding: 5px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background: #fff;

  &:hover {
    box-sizing:border-box;
    transition: 50ms transform linear;
    /* border: 1px solid rgba(0,0,0,.1); */
    background: #f5f5f5;
    /* box-shadow: 1px 1px 2px rgba(0,0,0,.1); */
  }
`
const LiftField = styled.div`
  color: cornflowerblue;
  text-align: left;
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

LiftItem.propTypes = {
  lift_type: PropTypes.String,
  sets: PropTypes.String,
  reps: PropTypes.String,
  weight: PropTypes.String,
  date: PropTypes.Date,
  shouldShowDate: PropTypes.bool
}

export default LiftItem