import axios from "axios";
import config from '../config/config'

export const allActions = {
    
    // login: (user) => async (dispatch) => {
    //     const data = await axios.post(config.URL + "/api/login", { ...user })
    //     if (data.data.token) {
    //         dispatch({ data: data, type: "LOGIN" })
    //     } else {
    //         dispatch({ data: {}, type: "LOGIN" })
    //     }
    // },
    getCats: () => async (dispatch) => {
        const data = await axios.get(config.URL + "/cat/show")
        dispatch({ data: data.data, type: "GET_CATS" })
    },
    deleteCat: (cat) => async (dispatch) => {
        const data = await axios.delete(config.URL + "/cat/delete/" + cat.id)
        if (data.data.status) {
            dispatch({ data: cat, type: "DELETE_CAT" })
        }
    },
    addCat: (cat) => async (dispatch) => {
        const data = await axios.post(config.URL + "/cat/add", { ...cat })
        dispatch({ data: cat, type: "ADD_CAT" })
    },
    updateCat: (cat) => async (dispatch) => {
        const data = await axios.put(config.URL + "/cat/update/" + cat.id, { ...cat })
        dispatch({ data: cat, type: "UPDATE_CAT" })
    },
    // register: (user) => async (dispatch) => {
    //     const data = await axios.post(config.URL + "/auth/register", { ...user })
    //     console.log(data.data);
    // }




};
