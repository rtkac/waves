import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

class CollapseCheckbox extends Component {

  state = {
    open: false,
    checked: []
  }

  componentDidMount() {
    if(this.props.initState) {
      this.setState({
        open: this.props.initState
      })
    }
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
  }

  renderList = () => (
    this.props.list ? (
      this.props.list.map(item => (
        <ListItem key={item._id} style={{padding: '10px 0px 10px 23px'}}>
          <ListItemText primary={item.name} />
          <ListItemSecondaryAction>
            <Checkbox
              color="primary"
              onChange={this.handleToggle(item._id)}
              checked={this.state.checked.indexOf(item._id) !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))
    ) : (
      null
    )
  )

  handleToggle = value => () => {
    const { checked } = this.state;

    
    if(checked.indexOf(value) === -1) {
      checked.push(value);
    } else {
      checked.splice(checked.indexOf(value), 1);
    }
    
    this.setState({
      checked: checked
    });
    
    this.props.handleFilters(checked);
  }

  render() {
    return (
      <div className="collapse_items_wrapper">
        <List
          component="nav"
          style={{borderBottom: '1px solid #dbdbdb'}}
        >
          <ListItem
            button
            onClick={this.handleClick}
            style={{padding: '10px 23px'}}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            <FontAwesomeIcon
              icon={this.state.open ? 'angle-up' : 'angle-down'}
              className="icon"
              style={{cursor: 'pointer'}}
            />
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    )
  }
}

export default CollapseCheckbox;