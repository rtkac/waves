import React, { Component } from 'react';
import MyButton from '../utils/MyButton';
import LoginForm from './LoginForm';

class Login extends Component {
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <h1>New Customers</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <MyButton
                type="link"
                to="/register"
                variant="contained"
                title="CREATE AN ACCOUNT"
                addStyles={{
                  padding: '0',
                  margin: '10px 0 0 0',
                  backgroundColor: '#e1ddc3'
                }}
                addLinkStyles={{
                  padding: '10px 16px'
                }}
              />
            </div>
            <div className="right">
              <h2>Register customers</h2>
              <p>If you have an account please log in.</p>
              LOGIN
              <LoginForm/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;