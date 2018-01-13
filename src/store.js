import createStore from 'redux-zero';
import {boards, tboard } from './Databoards'

const initialState = {
    successLogin: false,
    user:
        {
            id: null,
            email: null,
            firstName: null,
            lastName: null,
            password: null,
            boards: boards,
        },
    selectedBoard: -1,
    showReply: false,
    inputNewCard: "",
    tboard: tboard
};

const store = createStore(initialState);
export default store;