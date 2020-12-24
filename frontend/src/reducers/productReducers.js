import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_PRODUCT_DETAILS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_MY_WAITLIST_REQUEST,
    PRODUCT_MY_WAITLIST_SUCCESS,
    PRODUCT_MY_WAITLIST_FAIL,
    PRODUCT_MY_WAITLIST_RESET, 
    PRODUCT_DISPATCH_READY_REQUEST,
    PRODUCT_DISPATCH_READY_SUCCESS,
    PRODUCT_DISPATCH_READY_FAIL,
    PRODUCT_DISPATCH_READY_RESET,
    PRODUCT_DISPATCH_REQUEST,
    PRODUCT_DISPATCH_SUCCESS,
    PRODUCT_DISPATCH_FAIL,
  } from '../constants/productConstants'
  
/*
Reducer takes in two things - initial state and action.
action gets dispatched to the reducer.
*/
  export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, products: [] }
      case PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload }
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_PRODUCT_DETAILS:
      return { loading: true, product: { reviews: [] } };
    default:
      return state
  }
} 

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productListMyReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_MY_WAITLIST_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_MY_WAITLIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case PRODUCT_MY_WAITLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PRODUCT_MY_WAITLIST_RESET:
      return { products: [] }
    default:
      return state
  }
}

export const productDispatchReadyReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DISPATCH_READY_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_DISPATCH_READY_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case PRODUCT_DISPATCH_READY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PRODUCT_DISPATCH_READY_RESET:
      return { products: [] }
    default:
      return state
  }
}

export const productDispatchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DISPATCH_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_DISPATCH_SUCCESS:
      return {
        loading: false,
      }
    case PRODUCT_DISPATCH_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}