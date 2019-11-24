import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
  {
    name: 'My account',
    linkTo: '/user'
  },
  {
    name: 'User information',
    linkTo: '/user/profile'
  },
  {
    name: 'My cart',
    linkTo: '/user/cart'
  }
]

const admin = [
  {
    name: 'Site info',
    linkTo: '/admin/site-info'
  },
  {
    name: 'Add products',
    linkTo: '/admin/products/add'
  },
  {
    name: 'Manage categories',
    linkTo: '/admin/manage-categories'
  }
]

const generateLinks = (links) => (
  links.map((link, i) => (
    <Link
      to={link.linkTo}
      key={i}
    >
      {link.name}
    </Link>
  ))
)

const UserLayout = (props) => {
  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My account</h2>
          <div className="links">
            {generateLinks(links)}
          </div>
          {
            props.user.userData.isAdmin && (
              <React.Fragment>
                <h2>Admin</h2>
                <div className="links">
                  {generateLinks(admin)}
                </div>
              </React.Fragment>
            )
          }
        </div>
        <div className="user_right">
          {props.children}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserLayout);