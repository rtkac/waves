import axios from 'axios';
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT
} from './action-types';

import { PRODUCT_SERVER } from '../constants/api';

export async function getProductsBySell() {
  const request = await axios.get(`${PRODUCT_SERVER}/article`, {
    params: {
      orderBy: 'sold',
      sort: 'desc',
      limit: 4
    }
  })
    .then(res => res.data);
  
  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  }
}

export async function getProductsByArrival() {
  const request = await axios.get(`${PRODUCT_SERVER}/article`, {
    params: {
      orderBy: 'createdAt',
      sort: 'desc',
      limit: 4
    }
  })
    .then(res => res.data);
  
  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  }
}

export async function addProduct(data) {
  const request = await axios.post(`${PRODUCT_SERVER}`, data)
    .then(res => res.data);
  
  return {
    type: ADD_PRODUCT,
    payload: request
  }
}

export async function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: ''
  }
}

//-------------------------------------------
// --------------- CATEGORIES ---------------
//-------------------------------------------

export async function getBrands() {
  const request = await axios.get(`${PRODUCT_SERVER}/brands`)
    .then(res => res.data);
  
  return {
    type: GET_BRANDS,
    payload: request
  }
}

export async function getWoods() {
  const request = await axios.get(`${PRODUCT_SERVER}/woods`)
    .then(res => res.data);
  
  return {
    type: GET_WOODS,
    payload: request
  }
}

//-------------------------------------
// --------------- SHOP ---------------
//-------------------------------------

export async function getProductsToShop(skip, limit, filters = [], previousState = []) {
  const data = {
    skip: skip,
    limit: limit,
    filters: filters
  }

  const request = await axios.post(`${PRODUCT_SERVER}/shop`, data)
    .then(res => {
      let newState = [
        ...previousState,
        ...res.data.articles
      ];

      return {
        size: res.data.size,
        articles: newState
      }
    });

  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request
  }
}