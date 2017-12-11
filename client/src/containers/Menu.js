import React, {Component} from 'react'
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
    // create set of lift types
    const liftTypes = this.state.liftTypes.slice();

    const liftTypeList = liftTypes.map( (type, i) => {
      return (
        <li className="lift-type-filter" key={type}>
          <Link to={`/lifts/${type}`} >
            <Label color={colors[i]}/><span>{type}</span>
          </Link>
        </li>
      )
    })
    
    return (
    <div className="menu-area">
      <ul>
        <li>This Week</li>
        <li>Last Week</li>
        <li>Custom</li>
      </ul>
      
      <h4>Lifts</h4>
      <ul>
        <li className="lift-type-filter" key="all">
          <Link to='/lifts/' >
            <Label color="#3366cc" /><span>All</span>
          </Link>
        </li>
        {liftTypeList}
      </ul>
    </div>
    )
  }
}

export default Menu