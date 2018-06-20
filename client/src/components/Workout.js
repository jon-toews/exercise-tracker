import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const data ={
  lifts: [
    {
      id: 1,
      liftType: "Klokov Press",
      sets: 2,
      reps: 5,
      weight: 165,
    },
    {
      id: 2,
      liftType: "Front Squat",
      sets: 3,
      reps: 3,
      weight: 225,
    },
    {
      id: 3,
      liftType: "Rows",
      sets: 5,
      reps: 5,
      weight: 185,
    },
  ],
  notes: "Well rested and raring to go.  Running on 9 hours of sleep.  YOLO!"
}

class Today extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lifts: [
        {
          id: 1,
          liftType: "Klokov Press",
          sets: 2,
          reps: 5,
          weight: 165,
        },
        {
          id: 2,
          liftType: "Front Squat",
          sets: 3,
          reps: 3,
          weight: 225,
        },
        {
          id: 3,
          liftType: "Rows",
          sets: 5,
          reps: 5,
          weight: 185,
        },
      ],
      notes: "Feeling rested and ready to go.  Ready to move some major weight.  Ain't nothin' to it but to do it!",
      open: false,
      tempLift: {},
      selected: [],
    }
  }
  handleClickOpen = (n) => {
    this.setState({ 
      open: true,
      tempLift: n
    });
  };

  handleAddNew = () => {
    this.setState({ 
      open: true,
      tempLift: {}
    });
  };

  handleRemove = () => {
    if (!this.state.selected) return;
    
    const newLifts = this.state.lifts.filter(lift => {
      if (this.state.selected.indexOf(lift.id) === -1) return lift;
    })

    this.setState({
      lifts: newLifts,
    })
  }

  handleClose = () => {
    this.setState({ 
      open: false,
      tempLift: {}
    })
  }

  handleSubmit = () => {
    console.log('submitting', this.state.tempLift)
    let revised = []

    if (this.state.tempLift.id) {
      revised = this.state.lifts.map(lift => {
        if (lift.id === this.state.tempLift.id) {
          return this.state.tempLift
        }
        return lift
      }, [])

    } else {

      const nextId = this.state.lifts
        .map(lift => lift.id)
        .reduce((acc, cur) => {
          return Math.max(acc, cur)
        }, [])
      this.state.tempLift.id = nextId + 1

      revised = [
        ...this.state.lifts, 
        this.state.tempLift
      ]
    }

    this.setState({
      lifts: revised,
      open: false,
    })
  }

  handleInputChange = event => {
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({
      tempLift: { ...this.state.tempLift, [name]: value, }
    })
  }

  handleSelectAllClick = (event, checked) => {
    console.log(checked)
    if (checked) {
      this.setState({ selected: this.state.lifts.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };



  render() {
    const { selected, lifts } = this.state

    console.log("selected:", selected)

    return (
      <Card style={{margin: 20, width: 800}}>
        <CardContent>
          <Typography variant="headline">Workout</Typography>
          <Table >
            <TableHead>
              <TableRow>
              <TableCell colSpan={12} style={{padding: 0}}>
                <Button color="primary" onClick={this.handleAddNew}>Add</Button>
                <Button color="primary" onClick={this.handleRemove}>Remove</Button>
              </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < lifts.length}
                    checked={selected.length === lifts.length}
                    onChange={this.handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>Lift</TableCell>
                <TableCell numeric>Sets</TableCell>
                <TableCell numeric>Reps</TableCell>
                <TableCell numeric>Weight (lbs)</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.lifts.map(n => {
                const isSelected = this.state.selected.indexOf(n.id) !== -1
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={event => this.handleClick(event, n.id)}
                        checked={isSelected}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.liftType}
                    </TableCell>
                    <TableCell numeric>{n.sets}</TableCell>
                    <TableCell numeric>{n.reps}</TableCell>
                    <TableCell numeric>{n.weight}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="" 
                        onClick={() => this.handleClickOpen(n)}
                      >
                        <Icon>edit</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <AddLiftDialog 
            open={this.state.open} 
            handleInputChange={this.handleInputChange} 
            handleClose={this.handleClose} 
            handleSubmit={this.handleSubmit}
            {...this.state.tempLift}
          />
          <br />
          <Typography component="p" variant="caption">{this.state.notes}</Typography>
        </CardContent>
      </Card>
    )
  }
}


const Workout = () => {
  return (
    <CssBaseline>
        <Today />

    </CssBaseline>
  )
}




class AddLiftDialog extends Component {

  render() {
    console.log('dialog:', this.props)
    return(
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
      <p>{this.props.selected}</p>
        <DialogTitle id="form-dialog-title">Enter a lift</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <form>
            <WideTextField
              autoFocus
              margin="dense"
              name="liftType"
              label="Lift"
              type="text"
              value={this.props.liftType}
              onChange={this.props.handleInputChange}
            />
            <NarrowTextField
              margin="dense"
              name="sets"
              label="Sets"
              type="number"
              value={this.props.sets}
              onChange={this.props.handleInputChange}
            />
            <NarrowTextField
              margin="dense"
              name="reps"
              label="Reps"
              type="number"
              value={this.props.reps}
              onChange={this.props.handleInputChange}
            />
            <NarrowTextField
              margin="dense"
              name="weight"
              label="Weight"
              type="number"
              value={this.props.weight}
              onChange={this.props.handleInputChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.props.handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default Workout


const FlexForm = styled.form`
  display:flex;
  flex-flow: row wrap;
`

const NarrowTextField = styled(TextField)`
  width: 100px;
  margin-right: 8px;
`
const WideTextField = styled(TextField)`
  flex: 1;
  margin-right: 8px;
`