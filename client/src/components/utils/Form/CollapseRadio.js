import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

class CollapseCheckbox extends Component {

  state = {
    open: false,
    value: []
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

  handleChange = (event) => {
    this.props.handleFilters(event.target.value);
    this.setState({value: event.target.value});
  }

  renderList = () => (
    this.props.list ? (
      this.props.list.map(item => (
        <FormControlLabel
          key={item._id}
          value={`${item._id}`}
          control={<Radio />}
          label={item.name}
          style={{paddingLeft: '22px'}}
        />
      ))
    ) : (
      null
    )
  )

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
              <RadioGroup
                aria-label="price"
                name="price"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    )
  }
}

export default CollapseCheckbox;