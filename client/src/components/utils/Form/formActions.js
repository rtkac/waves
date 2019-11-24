import { REGEX_EMAIL } from '../../../constants/others';

export const validate = (element, formdata = []) => {
  let error = [true, ''];

  if(element.validation.email) {
    let isValid = REGEX_EMAIL.test(element.value);
    error = !isValid ? [isValid, 'Must be a valid email'] : error;
  }

  if(element.validation.confirm) {
    let isValid = element.value.trim() === formdata[element.validation.confirm].value;
    error = !isValid ? [isValid, 'Passwords do not match'] : error;
  }
  
  if(element.validation.required) {
    let isValid = element.value.trim() !== '';
    error = !isValid ? [isValid, `${element.name} is required`] : error;
  }

  return error;
}

export const update = (element, formdata, type) => {
  const newFormdata = formdata;
  const newElement = newFormdata[element.id];
  
  newElement.value = element.event.target.value;

  if(element.blur) {
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validForm = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormdata[element.id] = newElement;

  return newFormdata;
}

export const generateData = (formdata, type) => {
  const dataToSubmit = {};

  for(let key in formdata) {
    if(formdata[key] !== 'confirm_password') {
      dataToSubmit[key] = formdata[key].value;
    }
  }

  return dataToSubmit;
}

export const isFormValid = (formdata, type) => {
  let isValid = true;

  for(let key in formdata) {
    isValid = formdata[key].valid && isValid;
  }

  return isValid;
}