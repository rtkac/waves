import React from 'react';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;