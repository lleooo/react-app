import {combineReducers} from 'redux';
import {monsterReducer} from './monster/monster.reducer';
import {tokenReducer} from './jwt-token/token.reducer';

export const rootReducer = combineReducers({
    monster: monsterReducer,
    user: tokenReducer
});