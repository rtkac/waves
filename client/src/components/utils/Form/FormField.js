import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const FormField = (props) => {

  const renderTemplate = () => {
    let template = '';
    let id = props.id;

    switch(props.formdata.element) {
      case 'input':
        template = (
          <TextField
            id={id}
            type={props.formdata.config.type}
            name={props.formdata.config.name}
            label={props.formdata.validation && props.formdata.validForm ? props.formdata.config.label : props.formdata.validationMessage}
            value={props.formdata.value}
            margin="normal"
            onBlur={(event) => props.change({event, id, blur: true})}
            onChange={(event) => props.change({event, id})}
            style={{...props.addStyles}}
            error={props.formdata.validation && props.formdata.validForm ? false : true}
          />
        )
      break;
      case 'textarea':
        template = (
          <TextField
            id={id}
            type={props.formdata.config.type}
            name={props.formdata.config.name}
            label={props.formdata.validation && props.formdata.validForm ? props.formdata.config.label : props.formdata.validationMessage}
            value={props.formdata.value}
            margin="normal"
            multiline
            onBlur={(event) => props.change({event, id, blur: true})}
            onChange={(event) => props.change({event, id})}
            style={{...props.addStyles}}
            error={props.formdata.validation && props.formdata.validForm ? false : true}
          />
        )
      break;
      case 'select':
        template = (
          <FormControl style={{...props.addStyles, margin: '16px 0 8px'}}>
            <InputLabel id="demo-simple-select-label">{props.formdata.name}</InputLabel>
            <Select
              name={`${id}-label`}
              id={id}
              value={props.formdata.value}
              onBlur={(event) => props.change({event, id, blur: true})}
              onChange={(event) => props.change({event, id})}
              error={props.formdata.validation && props.formdata.validForm ? false : true}
            >
              {props.formdata.config.options.map((option, index) => (
                <MenuItem key={`option-${props.formdata.config.name}-${index}`} value={option.key}>{option.value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      break;
      default:
        template = '';
    }

    return template;
  }

  return (
    renderTemplate()
  )
}

export default FormField;