import React from 'react'
import LiftCard from 'components/LiftCard'
import LiftCardEdit from 'components/LiftCardEdit'
import Lift from 'containers/Lift'

import styled from 'styled-components'

const LiftArea = ({ ids }) => {
  console.log(ids)
  return ( 
    <LiftAreaWrapper>
        {ids.map(id => <Lift id={id} />)}
    </LiftAreaWrapper>
  ) 
}
  
const LiftAreaWrapper = styled.div`
  grid-area: main;
  max-width: 900px;
  padding: 1rem;
  text-align: left;
  background: #fff;
  box-shadow: 1px 1px 2px rgba(0,0,0,.075);
`

  export default LiftArea
