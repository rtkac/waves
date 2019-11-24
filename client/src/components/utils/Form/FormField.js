import React from 'react';
import TextField from '@material-ui/core/TextField';

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