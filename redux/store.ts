import axios from 'axios';
import { createStore as _createStore, applyMiddleware} from 'redux';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import reducer from './reducer'


// export function createStore(history, client, data) {
//   // Sync dispatched route actions to the history
//   const reduxRouterMiddleware = routerMiddleware(history);

//   const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];

//   let finalCreateStore;
//   finalCreateStore = applyMiddleware(...middleware)(_createStore);

//   // if (data) {
//   //   data.pagination = Immutable.fromJS(data.pagination);
//   // }
//   const store = finalCreateStore(reducer, data);

//   return store;
// }

// const store = createStore({}, axios, {});
// export default store

export default _createStore(reducer, applyMiddleware(thunk))