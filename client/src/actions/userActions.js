import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER
} from './action-types';

import { USER_SERVER } from '../constants/api';

export async function loginUser(dataToSubmit) {
  const request = await axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then(res => res.data);
  
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export async function registerUser(dataToSubmit) {
  const request = await axios.post(`${USER_SERVER}/register`, dataToSubmit)
    .then(res => res.data);
  
  return {
    type: REGISTER_USER,
    payload: request
  }
}

export async function auth() {
  const request = await axios.get(`${USER_SERVER}/auth`)
    .then(res => res.data);
  
  return {
    type: AUTH_USER,
    payload: request
  }
}

export async function logoutUser() {
  const request = await axios.get(`${USER_SERVER}/logout`)
    .then(res => res.data)

    return {
      type: LOGOUT_USER,
      payload: request
    }
}