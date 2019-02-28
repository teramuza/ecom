import { combineReducers } from 'redux';

import products from './products';
import carts from './carts';
import auth from './auth';
import user from './user'

const appReducer = combineReducers({
  	products, carts, auth, user
});

export default appReducer;