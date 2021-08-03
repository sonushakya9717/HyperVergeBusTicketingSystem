import axios from 'axios'
import { setAlert } from './alerts'

import {
    PROFILE_ERROR,
    GET_PROFILE,
  } from "./types";


// Get the current admin profile
export const getCurrentProfile = () => async dispatch => {
    try{
        const res = await axios.get('/api/admins/admin/agency'); 
        console.log(res.data)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    }catch(err){
        console.log(err.response,"error")
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Create the current admin profile
export const addProfile = ({agencyName,phone,headOfficeLocation}) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({agencyName,phone,headOfficeLocation})

        const res = await axios.post('/api/admins/admin/addAgency',body,config); 
        console.log(res.data,"body")

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Profile Created","success"))

    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
                
            });
        }

        dispatch({
            type:PROFILE_ERROR
        })
    }
}