import axios from "axios";
import { setAlert } from "./alerts";
import { GET_LOCATIONS, LOCATIONS_ERROR,ADD_LOCATION,ADD_LOCATION_ERROR } from "./types";

export const getAllLocations = () => async dispatch => {
    try{
        const res = await axios.get('/getLocations'); 
        console.log(res.data)
        dispatch({
            type: GET_LOCATIONS,
            payload: res.data
        });

    }catch(err){
        console.log(err.response,"error")
        dispatch({
            type: LOCATIONS_ERROR,
            payload: { msg: err.response.statusText }
        });
    }
}

export const addLocations = ({city,state}) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            city,
            state
        })

        console.log(body)
        const res = await axios.post('/api/admins/admin/location',body, config); 
        console.log(res.data)
        dispatch({
            type: ADD_LOCATION,
            payload: res.data
        });

        dispatch(setAlert("Location added successfully","success"))
    }catch(err){
        dispatch(setAlert(err.response.data.errors,"danger"))

        dispatch({
            type: ADD_LOCATION_ERROR,
            payload: { msg: err.response.statusText }
        });
    }
}
