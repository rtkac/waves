import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import FormField from '../utils/Form/FormField';
import MyButton from '../utils/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import { update, generateData, isFormValid } from '../utils/Form/formActions';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/userActions';


class LoginForm extends Component {
  state = {
    formError: false,
    formSuccess: '',
    loading: false,
    formdata: {
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
      }
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'login');

    this.setState({
      formdata: newFormdata,
      formError: false
    });
  }

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login');

    if(formIsValid) {
      
      const _this = this;
      const { history } = this.props;

      this.setState({
        loading: true
      });
      
      async function waitForLogin() {
        let response = _this.props.dispatch(await loginUser(dataToSubmit));
        if(response.payload.loginSuccess) {
          history.push('/user');
          _this.setState({
            loading: false
          });
        } else {
          _this.setState({
            loading: false,
            formError: true
          });    
        }
      }
      waitForLogin();

    } else {
      this.setState({
        formError: true
      });
    }
  }

  render() {

    return (
      <div className="signin_wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>
          <Grid container>
            <Grid item xs={12}>
              <FormField
                id={'email'}
                formdata={this.state.formdata.email}
                change={(element) => this.updateForm(element)}
                addStyles={{
                  width: '100%'
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                id={'password'}
                formdata={this.state.formdata.password}
                change={(element) => this.updateForm(element)}
                addStyles={{
                  width: '100%'
                }}
              />
            </Grid>
            {
              this.state.formError && (
                <div className="error_label">Please check your data</div>
              )
            }
            <Grid item xs={12}>
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
                  ) : 'LOG IN'
                }
                addStyles={{
                  margin: '10px 0 0 0',
                  backgroundColor: '#e1ddc3'
                }}
              />
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

export default connect()(withRouter(LoginForm));