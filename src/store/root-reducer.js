import {combineReducers} from 'redux';
import {monsterReducer} from './monster/monster.reducer';

export const rootReducer = combineReducers({
    monster: monsterReducer
});