import React from 'react'
import LiftCard from 'components/LiftCard'
import LiftCardEdit from 'components/LiftCardEdit'

import styled from 'styled-components'
import moment from 'moment'

const LiftListByDate = ({
  liftsByDate,
  selectedLift,
  onLiftSubmit,
  onLiftEdit,
  onLiftDelete,
  onLiftSelect,
  onLiftDeselect
}) => {

  const DateCards = Object.keys(liftsByDate)
    .sort((a,b) => b - a)
    .map(date => {
      return (
        <div>
          <h3>{moment(date).format("ddd, MMM Do YYYY")} </h3>
          {renderLiftCards(liftsByDate[date])}
        </div>
      )
    })

  return ( 
    <LiftAreaWrapper>
        <LiftCardEdit
          key={"new"}
          onLiftSubmit={onLiftSubmit}
          onLiftEdit={onLiftEdit}
          onLiftDelete={onLiftDelete}
          onLiftDeselect={onLiftDeselect}
        />
        {DateCards}
    </LiftAreaWrapper>
  ) 
  
  function renderLiftCards(lifts) {
    return lifts.map(lift => {
      return selectedLift !== lift._id ? (
        <LiftCard
          key={lift._id}
          handleEditItem={onLiftSelect}
          shouldShowDate={false}
          {...lift}
        />
      ) : (
        <LiftCardEdit
          key={lift._id}
          onLiftSubmit={onLiftSubmit}
          onLiftEdit={onLiftEdit}
          onLiftDelete={onLiftDelete}
          onLiftDeselect={onLiftDeselect}
          {...lift}
        />
      )
    })
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

  export default LiftListByDate
