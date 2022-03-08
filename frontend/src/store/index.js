import { createStore } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules/index';

export default function configureStore() {
  const store = createStore(rootReducer);
  return store;
}
