import axios from "axios";
import { setAlert } from "./alerts";
import { ADD_BUS, BUS_ERROR, REMOVE_BUS } from "./types";

export const addBus = ({
    busName,
    vehicleNo,
    seats,
    busType,
    seatCategory,
    policy,
    from,
    to,
    fare,
    driver,
    helper,
    images,
    arrivalTime,
    departureTime,
    schedule
}) => async dispatch => {

    let [toCity, toState] = to.trim().split(",");
    let [fromCity, fromState] = from.trim().split(",");
    toCity=toCity.trim()
    toState=toState.trim()
    fromCity=fromCity.trim()
    fromState=fromState.trim()


    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({
            busName,
            vehicleNo,
            seats,
            busType,
            seatCategory,
            policy,
            to:{city:toCity,
            state:toState
            },
            from:{city:fromCity,
            state:fromState
            },
            driver,
            helper,
            fare,
            images,
            schedule,
            arrivalTime,
            departureTime
        })
        console.log(body,"data is coming")
        const res = await axios.post(`/api/admins/admin/addBus`,body,config)
        console.log("response",res)
        dispatch({
            type: ADD_BUS,
            payload:res.data
        })
        dispatch(setAlert("Bus added succesfully"))
    }
    catch(err){
        console.log(err.message,"error is coming")
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }

        dispatch(setAlert(err.response.data.msg,"danger"))

        dispatch({
            type:BUS_ERROR,
        })
    }
}


export const deleteBus = (busId) => async dispatch => {
    console.log(busId,"delete bus is calling")
    try{
        const res = await axios.delete(`api/buses/${busId}`)
        dispatch({
            type: REMOVE_BUS,
            payload:busId
        })
        dispatch(setAlert("Bus deleted succesfully","success"))
    }
    catch(err){
        dispatch({
            type:BUS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}


