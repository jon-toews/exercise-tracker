import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const LiftCard = ({
  _id,
  lift_type,
  sets,
  reps,
  weight,
  date,
  shouldShowDate,
  handleEditItem
}) => {
  const dateString = new Date(date).toLocaleDateString()
  const oneRepMax = Math.floor(weight * (1 + reps / 30))

  return (
    <LiftCardLayout onClick={() => handleEditItem(_id)}>
      <LiftField>
        <LiftValue>{lift_type}</LiftValue>
      </LiftField>
      <LiftField>
        Sets: <LiftValue>{sets}</LiftValue>
      </LiftField>
      <LiftField>
        Reps: <LiftValue>{reps}</LiftValue>
      </LiftField>
      <LiftField>
        Weight: <LiftValue>{weight}</LiftValue>
      </LiftField>
      <LiftField>
        1RM: <LiftValue special>{oneRepMax}</LiftValue>
      </LiftField>
      {shouldShowDate ? (
        <LiftField>
          Date: <LiftValue>{dateString}</LiftValue>
        </LiftField>
      ) : null}
    </LiftCardLayout>
  )
}

LiftCard.propTypes = {
  lift_type: PropTypes.String,
  sets: PropTypes.String,
  reps: PropTypes.String,
  weight: PropTypes.String,
  date: PropTypes.Date,
  shouldShowDate: PropTypes.bool
}

const LiftCardLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(160px, 1fr) 80px 80px 100px 100px 160px;
  grid-gap: 8px;
  padding: 5px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background: #fff;

  &:hover {
    box-sizing: border-box;
    transition: 50ms transform linear;
    /* border: 1px solid rgba(0,0,0,.1); */
    background: #f5f5f5;
    /* box-shadow: 1px 1px 2px rgba(0,0,0,.1); */
  }
`
const LiftField = styled.div`
  color: ${props => (props.special ? "#3f51b5" : "cornflowerblue")};
  text-align: left;
`
const LiftValue = styled.span`
  color: ${props => (props.special ? "green" : "#2a2a2a")};
  font-size: 16px;
`

export default LiftCard
