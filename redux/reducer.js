import { combineReducers } from 'redux';

import network from './modules/network'

export default combineReducers({
  networkInfo: network,
})