import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';

class Header extends Component {

  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Guitars',
        linkTo: '/guitars',
        public: true
      }
    ],
    user: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false,
        type: 'cart'
      },
      {
        name: 'My Account',
        linkTo: '/user',
        public: false
      },
      {
        name: 'Login',
        linkTo: '/login',
        public: true
      },
      {
        name: 'Logout',
        linkTo: '/logout',
        public: false,
        type: 'logout'
      }
    ]
  }

  render() {

    const logoutHandler = () => {
      const _this = this;
      async function logoutAsync() {
        let response = _this.props.dispatch(await logoutUser());
        if(response.payload.success) {
          _this.props.history.push('/login');
        }
      }
      logoutAsync();
    }

    const cartLink = (item, i) => {
      const user = this.props.user.userData;

      return (
        <div className="cart_link" key={i}>
          <span>{user.cart ? user.cart.length : 0}</span>
          <Link to={item.linkTo}>
            {item.name}
          </Link>
        </div>
      )
    }

    const defaultLink = (item, i) => (
      item.type === 'logout' ? (
        <div
          className="log_out_link"
          key={i}
          onClick={() => logoutHandler()}
        >
          {item.name}
        </div>
      ) : (
        <Link to={item.linkTo} key={i}>
          {item.name}
        </Link>
      )
    )

    const showLinks = (type) => {
      let list = [];

      if(this.props.user.userData) {
        type.forEach(item => {
          if(!this.props.user.userData.isAuth) {
            if(item.public === true) {
              list.push(item)
            }
          } else {
            if(item.name !== 'Login') {
              list.push(item)
            }
          }
        })
      }

      return list.map((item, i) => {
        if(item.type === 'cart') {
          return cartLink(item, i)
        } else {
          return defaultLink(item, i)
        }
      })
    }

    return (
      <header id="header" className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">
              <Link to="/">WAVES</Link>
            </div>
          </div>
          <div className="right">
            <div className="top">
              {showLinks(this.state.user)}
            </div>
            <div className="bottom">
              {showLinks(this.state.page)}
            </div>
          </div>
        </div>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps)(withRouter(Header));