import axios from 'axios';
import { setAlert } from './alerts'
import {
    BOOKING_FAIL,
    BOOKING_SUCCESS,
    DELETE_TICKET,
    NO_TICKETS_FOUND,
    TICKETS_FOUND,
    TICKET_ERROR
 } from './types';


 export const bookSeats = (busId,userData) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify(userData)
        const res = await axios.post(`/api/buses/${busId}/tickets`,body,config)
        console.log("response",res)
        dispatch({
            type: BOOKING_SUCCESS,
            payload:res.data
        })
        dispatch(setAlert("Tickets booked succesfully","success"))
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
                
            });
        }

        dispatch(setAlert(err.response.data.msg,"danger"))

        dispatch({
            type:BOOKING_FAIL,
        })
    }
}



export const getTickets = () => async dispatch => {
    try {
        const res = await axios.get('/api/users/user/tickets');

        dispatch({
            type: TICKETS_FOUND,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: NO_TICKETS_FOUND
        });
    }
};

export const deleteTicket = (ticketId) => async dispatch => {
    console.log(ticketId,"delete bus is calling")
    try{
        const res = await axios.delete(`/api/users/user/${ticketId}`)
        dispatch({
            type: DELETE_TICKET,
            payload:ticketId
        })
        dispatch(setAlert("Ticket cancelled succesfully","success"))
    }
    catch(err){
        dispatch({
            type:TICKET_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

