import {  combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import { configureStore } from '@reduxjs/toolkit'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
        JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: { cartItems: cartItemsFromStorage}
}

const middleware = [thunk, logger]

const store = configureStore({
    reducer, 
    initialState, 
    middleware,
    // middleware : (curryGetDefaultMiddleware) => curryGetDefaultMiddleware().concat(logger),
})

// const store = configureStore(reducer, initialState, middleware)

export default store