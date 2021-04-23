import { combineReducers } from "redux";

const initialUser = {
    id: '',
    username: '',
    password: '',
    email: '',
    name: '',
    surname: '',
    cats: []

}

const catReducer = (state = [], { data, type }) => {
    console.log(data);
    switch (type) {
        case 'GET_CATS':
            return data
        case 'DELETE_CAT':
            return state.filter(item => data.id != item.id)
        case 'ADD_CAT':
            return [...state, { ...data, id: state.length ? state[state.length - 1].id + 1 : 1 }]
        case 'UPDATE_CAT':
            return state.map(cat => {
                return (+cat.id === +data.id) ? data : cat
            })
        default:
            return state
    }
}

const userReducer = (state = initialUser, { data, type }) => {
    switch (type) {
        case 'LOGIN':

            return data
        case 'LOGOUT':
            return ""
        default:
            return state
    }
}

const reducer = {
    cats: catReducer,
    user: userReducer
};

export default combineReducers(reducer);
