import axios from 'axios'
import { setAlert } from './alerts'
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ADMIN_CALLED,
    USER_CALLED,
    LOGOUT,
} from './types';


import setAuthToken from '../utils/setAuthToken'

// LOAD USER
export const loadUser = ()=> async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    
    try{
        const res = await axios.get('/api/users/auth')
        if(res.data.isAdmin){
            dispatch({
                type:ADMIN_CALLED,
                payload:res.data
            })
        }
        else{
            dispatch({
                type:USER_CALLED
            })
        }
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}





// User Register //  
export const userRegister = ({name,email,password,isAdmin}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }


    console.log(name)

    const body = JSON.stringify({name,email,password,isAdmin})
    

    try{
        const res = await axios.post('/api/users/signup',body,config)
        console.log(res.data)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })

        dispatch(loadUser())
        dispatch(setAlert("Registered Successfully",'success'))
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
                
            });
        }

        dispatch({
            type:REGISTER_FAIL,
        })

        dispatch(setAlert('User already exists','danger'))
    }
}





// User Login //  
export const userLogin = (email,password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email,password})
    

    try{
        const res = await axios.post('/api/users/login',body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })

        dispatch(loadUser())
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
                
            });
        }
        dispatch({
            type:LOGIN_FAIL,
        })

        dispatch(setAlert('Invalid creadentials','danger'))
    }
}


export const adminLogin = (email,password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email,password})
    
    try{
        const res = await axios.post('/api/users/adminLogin',body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })

        dispatch(loadUser())
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
                
            });
        }
        dispatch({
            type:LOGIN_FAIL,
        })

        dispatch(setAlert('Invalid creadentials','danger'))
    }
}

// LOGOUT//
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
}