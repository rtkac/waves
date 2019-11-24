import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import FormField from '../utils/Form/FormField';
import MyButton from '../utils/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { update, generateData, isFormValid } from '../utils/Form/formActions';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/userActions';


class RegisterForm extends Component {
  
  state = {
    formError: false,
    formSuccess: false,
    loading: false,
    formdata: {
      name: {
        element: 'input',
        name: 'Name',
        value: '',
        config: {
          name: "name_input",
          type: 'text',
          label: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        validForm: true,
        touched: false,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        name: 'Lastname',
        value: '',
        config: {
          name: "lastname_input",
          type: 'text',
          label: 'Enter your lastname'
        },
        validation: {
          required: true
        },
        valid: false,
        validForm: true,
        touched: false,
        validationMessage: ''
      },
      email: {
        element: 'input',
        name: 'Email',
        value: '',
        config: {
          name: "email_input",
          type: 'email',
          label: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validForm: true,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        name: 'Password',
        value: '',
        config: {
          name: "password_input",
          type: 'password',
          label: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        validForm: true,
        touched: false,
        validationMessage: ''
      },
      confirmpassword: {
        element: 'input',
        name: 'Confirm password',
        value: '',
        config: {
          name: "confirm_password_input",
          type: 'password',
          label: 'Confirm your password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        validForm: true,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'register');

    this.setState({
      formdata: newFormdata,
      formError: false
    });
  }

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'register');
    let formIsValid = isFormValid(this.state.formdata, 'register');

    if(formIsValid) {
      
      const _this = this;

      this.setState({
        loading: true
      });
      
      async function waitForRegister() {
        let response = _this.props.dispatch(await registerUser(dataToSubmit));
        if(response.payload.success) {
          _this.setState({
            loading: false,
            formSuccess: true
          });
        } else {
          _this.setState({
            loading: false,
            formError: true
          });    
        }
      }
      waitForRegister();

    } else {
      this.setState({
        formError: true
      });
    }
  }

  handleClose = () => {
    this.setState({
      formSuccess: false
    });
  };

  render() {
    return (
      <form onSubmit={(event) => this.submitForm(event)}>
        <h2>Personal information</h2>
        <Grid container style={{marginBottom: '70px'}}>
          <Grid item xs={6} style={{paddingRight: '30px'}}>
            <FormField
              id={'name'}
              formdata={this.state.formdata.name}
              change={(element) => this.updateForm(element)}
              addStyles={{width: '100%'}}
            />
          </Grid>
          <Grid item xs={6} style={{paddingLeft: '30px'}}>
            <FormField
              id={'lastname'}
              formdata={this.state.formdata.lastname}
              change={(element) => this.updateForm(element)}
              addStyles={{width: '100%'}}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              id={'email'}
              formdata={this.state.formdata.email}
              change={(element) => this.updateForm(element)}
              addStyles={{width: '100%'}}
            />
          </Grid>
        </Grid>
        <h2>Pasword confirmation</h2>
        <Grid container>
          <Grid item xs={6} style={{paddingRight: '30px'}}>
            <FormField
              id={'password'}
              formdata={this.state.formdata.password}
              change={(element) => this.updateForm(element)}
              addStyles={{width: '100%'}}
            />
            {
              this.state.formError && (
                <div className="error_label">Please check your data</div>
              )
            }
          </Grid>
          <Grid item xs={6} style={{paddingLeft: '30px'}}>
            <FormField
              id={'confirmpassword'}
              formdata={this.state.formdata.confirmpassword}
              change={(element) => this.updateForm(element)}
              addStyles={{width: '100%'}}
            />
          </Grid>
          <Grid item xs={6}>
            <MyButton
              submit={(event) => this.submitForm(event)}
              type="submit"
              variant="contained"
              size="large"
              disabled={this.state.loading ? true : false}
              title={
                this.state.loading ? (
                  <CircularProgress
                    className="btn-loading--large"
                  />
                ) : 'REGISTER USER'
              }
              addStyles={{
                margin: '30px 0 0 0',
                backgroundColor: '#e1ddc3'
              }}
            />
          </Grid>
          <Grid item xs={6} style={{display: 'flex', justifyContent: 'flex-end'}}>
            <MyButton
              type="link"
              to="/login"
              variant="contained"
              size="large"
              title="GO TO LOGIN"
              addStyles={{
                margin: '30px 0 0 0',
                padding: '0',
                backgroundColor: '#e1ddc3'
              }}
              addLinkStyles={{
                padding: '10px 16px'
              }}
            />
          </Grid>
        </Grid>
        <Dialog aria-labelledby="customized-dialog-title" open={this.state.formSuccess} onClose={this.handleClose}>
          <MuiDialogTitle id="customized-dialog-title">
            <span style={{display: 'flex', justifyContent: 'space-between'}}>
              Registration success
              <FontAwesomeIcon icon="times-circle" className="icon" onClick={this.handleClose} style={{cursor: 'pointer'}} />
            </span>
          </MuiDialogTitle>
          <MuiDialogContent>
            New user has been successfully registered
          </MuiDialogContent>
        </Dialog>
      </form>
    )
  }
}

export default connect()(withRouter(RegisterForm));