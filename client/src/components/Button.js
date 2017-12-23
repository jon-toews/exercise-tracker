import styled from 'styled-components'

const Button = styled.button`
  color: ${props =>  props.primary ? '#fff' : '#333' };
  background: ${props => props.primary ? '#3f51b5' : '#fff'};
  font-size: 14px;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: .25em 1em;
  line-height: 1.4;
  cursor: pointer:
  white-space: nowrap;

  &:hover,
  &:active,
  &:focus {
    background: ${props => props.primary ? '#002984' : '#e6e6e6'};
    border-color: ${props => props.primary ? 'transparent' : '#adadad'};
  }
`

export default Button
