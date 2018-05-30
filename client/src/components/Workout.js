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

const Workout = () => {
  return (
    <div>
      <WorkoutCard />
    </div>  
  )
}

// class EditLiftDialog extends Component {

const EditLiftDialog = (props) => (
  <Dialog
    open={props.open}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To subscribe to this website, please enter your email address here. We will send
        updates occasionally.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={props.handleClose}>
        Cancel
      </Button>
      <Button color="primary">
        Subscribe
      </Button>
    </DialogActions>
  </Dialog>
)

class WorkoutCard extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    return(
      <CssBaseline>
        <StyledCard>
  
          <CardContent>
            <Typography gutterBottom variant="display1">Wednesday May 5</Typography>
  
            <Table style={{marginBottom: 20}}>
              <TableHead>
                <TableRow>
                  <TableCell>Lift</TableCell>
                  <TableCell numeric>Sets</TableCell>
                  <TableCell numeric>Reps</TableCell>
                  <TableCell numeric>Weight (lbs)</TableCell>
                  <EditTableCell></EditTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.lifts.map(n => {
                  return (
                    <TableRow key={n.id}>
                      <TableCell component="th" scope="row">
                        {n.liftType}
                      </TableCell>
                      <TableCell numeric>{n.sets}</TableCell>
                      <TableCell numeric>{n.reps}</TableCell>
                      <TableCell numeric>{n.weight}</TableCell>
                      <EditTableCell>
                        <IconButton color="">
                          <Icon>edit</Icon>
                        </IconButton>
                        </EditTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
  
            <Icon color="secondary">star</Icon>
            <Icon color="secondary">star</Icon>
            <Icon color="secondary">star</Icon>
            <Icon>star</Icon>
            <Icon>star</Icon>
  
            <Typography variant="caption" component="p">{data.notes}</Typography>
  
          </CardContent>
  
          <CardActions>
            <Button size="small" color="primary" onClick={this.handleClickOpen}>Edit</Button>
          </CardActions>
          <EditLiftDialog open={this.state.open} handleClose={this.handleClose}></EditLiftDialog>
        </StyledCard>
      </CssBaseline>
    )
  }
}

const StyledCard = styled(Card)`
  max-width: 600px;
  margin-bottom: 16px;
`

const EditTableCell = styled(TableCell)`

`

export default Workout
