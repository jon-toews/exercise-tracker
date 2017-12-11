import React from 'react';
import PropTypes from 'prop-types'

const LiftItem = props => {
  const dateString = new Date(props.date).toLocaleDateString();
  return (
    <div className="lift-card" onClick={() => props.handleEditItem(props._id)}>
      <div className="lift-field">
        <span className="lift-value">{props.lift_type}</span>
      </div>
      <div className="lift-field">
        Sets: <span className="lift-value">{props.sets}</span>
      </div>
      <div className="lift-field">
        Reps: <span className="lift-value">{props.reps}</span>
      </div>
      <div className="lift-field">
        Weight: <span className="lift-value">{props.weight} </span>
      </div>
      {props.shouldShowDate ? 
        <div className="lift-field">
          Date: <span className="lift-value">{dateString}</span>
        </div> :
        null
      }
    </div>
  );
};

LiftItem.propTypes = {
  lift_type: PropTypes.String,
  sets: PropTypes.String,
  reps: PropTypes.String,
  weight: PropTypes.String,
  date: PropTypes.Date,
  shouldShowDate: PropTypes.bool
}

export default LiftItem;