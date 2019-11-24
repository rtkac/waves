import React from 'react';
import UserLayout from '../HOC/UserLayout';
import MyButton from '../utils/MyButton';

const UserDashboard = ({user}) => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>{user.userData.name}</span>
            <span>{user.userData.lastname}</span>
            <span>{user.userData.email}</span>
          </div>
          <MyButton
            type="link"
            to="/user/profile"
            variant="contained"
            size="large"
            title="Edit account info"
            addStyles={{
              margin: '30px 0 0',
              backgroundColor: '#e1ddc3'
            }}
          />
        </div>
        <div className="user_nfo_panel">
          <h1>History purchases</h1>
          <div className="user_product_block_wrapper">
            history...
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default UserDashboard;