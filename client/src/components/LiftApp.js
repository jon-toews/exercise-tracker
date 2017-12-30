import React from "react"

import styled from 'styled-components'

import Navigation from 'components/Nav'
import Menu from 'components/Menu'
import LiftsByDate from 'containers/LiftsByDate'
import LiftsOfType from 'containers/LiftsOfType'

const LiftApp = ({ match }) => {

  // render different view if url contains a filter value
  const typeFilter = match.params.filter

  return (
    <AppWrapper>
      <Navigation />
      <Menu />
      {typeFilter
      ? <LiftsOfType />
      : <LiftsByDate /> }
    </AppWrapper>
  )
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

export default LiftApp
