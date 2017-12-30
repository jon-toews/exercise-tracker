import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"

import Label from "react-icons/lib/md/label"

const FilterLinks = ({ types }) => {
  var colors = [
    "#dc3912",
    "#ff9900",
    "#109618",
    "#990099",
    "#0099c6",
    "#dd4477",
    "#66aa00",
    "#b82e2e",
    "#316395",
    "#994499",
    "#22aa99",
    "#aaaa11",
    "#6633cc",
    "#e67300",
    "#8b0707",
    "#651067",
    "#329262",
    "#5574a6",
    "#3b3eac"
  ]

  return (
    <div>
      <h4>Lifts</h4>
      <ul>
        <li>
          <StyledLink to="/lifts/">
            <StyledLabel color="#3366cc" />
            <span>All</span>
          </StyledLink>
        </li>
        {types.map((type, i) => (
          <li key={type}>
            <StyledLink
              to={`/lifts/type/${type}`}
              activeStyle={{
                color: "black",
                textDecoration: "none"
              }}
            >
              <StyledLabel color={colors[i]} />
              <span>{type}</span>
            </StyledLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: #111;
  }
`

const StyledLabel = styled(Label)`
  color: ${props => props.color};
  margin-right: 4px;
`

export default FilterLinks
