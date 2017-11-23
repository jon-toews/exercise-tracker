import React from 'react';
import './TextField.css';


const TextField = (props) => {
  const label = props.label ? 
    <label htmlFor={props.name} className="control-label">{props.label}</label> : null;

  const errorMessage = props.error ? 
    <p className="help-block">{props.error.msg}</p> : null;

  const classes = [
    "form-group",
    props.error ? "has-error" : null
  ]

  return (
    <div className={classes.join(' ')}>
      {label}
      <input
        className="form-control"
        name={props.name}
        type={props.type || 'text'}
        onChange={props.onChange}
        value={props.value}
      />
      {errorMessage}
  </div>
  )
}

export default TextField;