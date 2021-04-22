import axios from "axios";
import config from '../config/config'

export const allActions = {
    logout: () => async (dispatch) => {

    },
    login: (user) => async (dispatch) => {
        const data = await axios.post(config.URL + "/api/login", { ...user })
        if (data.data.token) {
            dispatch({ data: data, type: "LOGIN" })
        }else{
            dispatch({ data: {}, type: "LOGIN" })
        }

    },
    getCats: () => async (dispatch) => {
        const data = await axios.get(config.URL + "/cat/show")
        console.log(data.data);
        dispatch({ data: data.data, type: "GET_CATS" })
    },
    deleteCat: (cat) => async (dispatch) => {
        const data = await axios.delete(config.URL + "/cat/delete/" + cat.id)
        if (data.data.status) {
            dispatch({ data: cat, type: "DELETE_CAT" })
        }
    }



};
