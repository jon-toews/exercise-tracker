import React, {Component} from 'react'
import styled from 'styled-components'
import {getLiftTypes} from 'api'
import {Link} from 'react-router-dom'

import Label from 'react-icons/lib/md/label'

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      liftTypes: []
    }
  }

  componentWillMount() {
    getLiftTypes()
      .then(response => {
        this.setState({ liftTypes: response.data })
      })
  }

  render() {
    var colors = [ "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
    const liftTypeList = this.state.liftTypes.map((type, i) => {
      return (
        <li className="lift-type-filter" key={type}>
          <StyledLink to={`/lifts/${type}`} >
            <StyledLabel color={colors[i]}/><span>{type}</span>
          </StyledLink>
        </li>
      )
    })
    
    return (
    <MenuArea>
      <ul>
        <li>This Week</li>
        <li>Last Week</li>
        <li>Custom</li>
      </ul>
      
      <h4>Lifts</h4>
      <ul>
        <li className="lift-type-filter" key="all">
          <StyledLink to='/lifts/' >
            <StyledLabel color="#3366cc" /><span>All</span>
          </StyledLink>
        </li>
        {liftTypeList}
      </ul>
    </MenuArea>
    )
  }
}

const MenuArea = styled.div`
  grid-area: aside;
  background: #f1f1f1;
  color: #666;
  border: 1px solid #eee;
  padding-left: 2rem;
  min-width: 120px;

  & ul {
    list-style: none;
    padding: 1rem 0;

    & li {
      padding-top: .5rem;
    }
  }
`

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: #111;
  }
`

const StyledLabel = styled(Label)`
  color: ${ props => props.color };
  margin-right: 4px;
`

export default Menu
