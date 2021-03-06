import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT
} from '../actions/action-types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_PRODUCTS_BY_SELL:
      return {
        ...state,
        bySell: action.payload
      }
    case GET_PRODUCTS_BY_ARRIVAL:
      return {
        ...state,
        byArrival: action.payload
      }
    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload
      }
    case GET_WOODS:
      return {
        ...state,
        woods: action.payload
      }
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShopSize: action.payload.size,
        toShop: action.payload.articles,
      }
    case ADD_PRODUCT:
      return {
        add: action.payload
      }
    case CLEAR_PRODUCT:
      return {
        add: action.payload
      }
    default:
      return state;
  }
}