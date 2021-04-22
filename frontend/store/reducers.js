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
    user : userReducer
};

export default combineReducers(reducer);
