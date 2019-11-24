import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from './actions/userActions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function(ComposedClass, reload, adminRoute = null) {
  
  class Auth extends Component {

    state = {
      loading: true
    }
    
    componentDidMount() {
      const _this = this;

      async function authUser() {
        let response = _this.props.dispatch(await auth());
        let user = response.payload;
        
        if(!user.isAuth) {
          if(reload) {
            _this.props.history.push('/login');
          }
        } else {
          if(adminRoute && !user.isAdmin) {
            _this.props.history.push('/user');
          } else {
            if(reload === false) {
              _this.props.history.push('/user');
            }
          }
        }

        _this.setState({loading: false})
      }
      authUser();
    }

    render() {
      if(this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress
              style={{color: '#2196F3'}}
              thickness={7}
            />
          </div>
        )
      }
      return (
        <ComposedClass {...this.props} user={this.props.user} />
      )
    }
  }
  
  function mapStateToProps(state) {
    return {
      user: state.user
    }
  }
  
  return connect(mapStateToProps)(Auth);
}

