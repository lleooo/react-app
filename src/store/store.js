import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {thunk} from 'redux-thunk';
import logger from 'redux-logger';

import {rootReducer} from './root-reducer';

const enhancer = applyMiddleware(thunk, logger);

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // 選擇性的白名單，這裡是你想要持久化的reducer的名稱
    blacklist: [], // 選擇性的黑名單，這裡是你不想要持久化的reducer的名稱
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, {}, enhancer);
export const persistor = persistStore(store);

export default store;