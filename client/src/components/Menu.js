import React from "react";
import styled from "styled-components";
import LiftTypes from 'containers/LiftTypes'


const Menu = (props) => {
  return (
    <MenuArea>
      <LiftTypes />
    </MenuArea>
  );
}

const MenuArea = styled.div`
  grid-area: aside;
  background: #f1f1f1;
  color: #666;
  border: 1px solid #eee;
  padding-left: 2rem;
  min-width: 120px;

  & h4 {
    margin-bottom: 0
  }

  & ul {
    list-style: none;
    padding: 1rem 0;

    & li {
      padding-top: 0.5rem;
    }
  }
`;

export default Menu;
