import React, { Component } from "react";
import logo from "./logo.svg";
import "./Lift.css";
import "./bootstrap.css";
import axios from "axios";

export default class LiftContainer extends Component {
  constructor() {
    super();
    this.state = {
      lifts: [],
      user_id: "59f687762d27d05aa197a646",
      selectedLift: null
    };
  }

  componentDidMount() {
    axios
      .get("/api/lifts", {
        params: {
          user_id: this.state.user_id
        }
      })
      .then(response => {
        console.log("axios response \n", response);
        this.setState({ lifts: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit = data => {
    if (data._id) {
      console.log("updating", data);
      axios
        .put("/api/lifts", {
          user_id: this.state.user_id,
          ...data
        })
        .then(response => {
          const lifts = this.state.lifts.slice();
          const updatedLifts = lifts.map(lift => {
            return data._id === lift._id ? data : lift;
          });
          this.setState({ lifts: updatedLifts, selectedLift: null });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("submitting");
      axios
        .post("/api/lifts", {
          user_id: this.state.user_id,
          ...data
        })
        .then(response => {
          this.setState({
            lifts: this.state.lifts.concat(response.data)
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleDelete = id => {
    console.log("deleting", id);
    axios
      .delete("/api/lifts", {
        params: {
          user_id: this.state.user_id,
          _id: id
        }
      })
      .then(response => {
        const lifts = this.state.lifts.slice();
        const updatedLifts = lifts.filter(lift => lift._id !== id);
        this.setState({lifts: updatedLifts});
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleEditItem = id => {
    console.log("editing item: ", id);
    this.setState({ selectedLift: id });
  };

  handleCancelEdit = id => {
    console.log("cancelling edit", id);
    this.setState({ selectedLift: null })
  }

  displayNewLiftForm = () => {
    this.setState({ selectedLift: 'new' })
  }

  render() {
    return (
      <div>
        <MenuArea 
          lifts={this.state.lifts}
        />
        <LiftArea
          lifts={this.state.lifts}
          handleSubmit={this.handleSubmit}
          handleDelete={this.handleDelete}
          handleEditItem={this.handleEditItem}
          handleCancelEdit={this.handleCancelEdit}
          selectedLift={this.state.selectedLift}
          displayNewLiftForm={this.displayNewLiftForm}
        />
      </div>
    );
  }
}

class MenuArea extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const liftTypes = this.props.lifts.map(x => x.lift_type);
    const liftSet = new Set(liftTypes);
    console.log(liftSet);

    return (
    <ul>
      Filters and such
    </ul>

    )
  }
}

class LiftArea extends Component {
  render() {
    const lifts = this.props.lifts.slice();

    const sortedLifts = lifts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    const LiftItems = sortedLifts.map(lift => {
      return this.props.selectedLift !== lift._id ? (
        <LiftItem
          key={lift._id}
          handleEditItem={this.props.handleEditItem}
          {...lift}
        />
      ) : (
        <LiftForm
          key={lift._id}
          handleSubmit={this.props.handleSubmit}
          handleDelete={this.props.handleDelete}
          handleCancelEdit={this.props.handleCancelEdit}
          {...lift}
        />
      );
    });

    return <div className="lift-area">
      {LiftItems}
      {this.props.selectedLift === "new" ? 
        <LiftForm 
          handleSubmit={this.props.handleSubmit}
          handleDelete={this.props.handleDelete}
          handleCancelEdit={this.props.handleCancelEdit}
        /> : null }
          
      <div className="add-lift" onClick={this.props.displayNewLiftForm}> + Add </div>
    </div>;
  }
}

class LiftForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props._id || null,
      lift_type: this.props.lift_type || null,
      sets: this.props.sets || null,
      reps: this.props.reps || null,
      weight: this.props.weight || null,
      date: this.props.date || new Date().toLocaleDateString()
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  };

  render() {
    const buttonText = this.state._id ? "Update" : "Add";
    console.log(this.state.date);
    const dateString = new Date(this.state.date).toISOString().slice(0, 10);

    return (
      <form className="form-inline lift-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="sr-only" for="lift_type" />
          <input
            name="lift_type"
            type="text"
            className="form-control"
            placeholder="Lift"
            onChange={this.handleInputChange}
            value={this.state.lift_type}
          />
        </div>
        <div className="form-group">
          <label className="sr-only" for="sets" />
          <input
            name="sets"
            type="number"
            className="form-control"
            placeholder="Sets"
            onChange={this.handleInputChange}
            value={this.state.sets}
          />
        </div>
        <div className="form-group">
          <label className="sr-only" for="reps" />
          <input
            name="reps"
            type="number"
            className="form-control"
            placeholder="Reps"
            onChange={this.handleInputChange}
            value={this.state.reps}
          />
        </div>
        <div className="form-group">
          <label className="sr-only" for="weight" />
          <input
            name="weight"
            type="number"
            className="form-control"
            placeholder="Weight"
            onChange={this.handleInputChange}
            value={this.state.weight}
          />
        </div>
        <div className="form-group">
          <label className="sr-only" for="date" />
          <input
            name="date"
            type="date"
            className="form-control"
            onChange={this.handleInputChange}
            value={dateString}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            {buttonText}
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={() => this.props.handleCancelEdit(this.state._id)}
          >
            Cancel
          </button>
          {this.state._id ? (
            <button type="button" className="btn btn-default" onClick={() => this.props.handleDelete(this.state._id)}>Delete</button>
          ) : null}
        </div>
      </form>
    );
  }
}

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
      <div className="lift-field">
        Date: <span className="lift-value">{dateString}</span>
      </div>
    </div>
  );
};
