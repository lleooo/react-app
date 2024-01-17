import {legacy_createStore as createStore, applyMiddleware} from 'redux';

import {thunk} from 'redux-thunk';
import logger from 'redux-logger';

import {rootReducer} from './root-reducer';

const enhancer = applyMiddleware(thunk);

export const store = createStore(rootReducer, {}, enhancer);