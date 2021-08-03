import axios from "axios";
import { setAlert } from "./alerts";
import { ADD_STAFF, DELETE_STAFF, GET_STAFF, STAFF_ERROR } from "./types";

export const getAllStaffs = (adminId) => async dispatch => {
    try{
        const res = await axios.get(`/api/admins/admin/${adminId}/staffs`); 
        console.log(res.data)
        dispatch({
            type: GET_STAFF,
            payload: res.data
        });

    }catch(err){
        console.log(err.response,"error")
        dispatch({
            type: STAFF_ERROR,
            payload: { msg: err.response.statusText }
        });
    }
}

export const addStaff = ({name,address,phone,isDriver}) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            name,
            phone,
            address,
            isDriver
        })

        const res = await axios.post('/api/admins/admin/addStaff',body, config); 
        dispatch({
            type: ADD_STAFF,
            payload: res.data
        });

        dispatch(setAlert("Staff added successfully","success"))
    }catch(err){
        console.log(err.response.data)
        dispatch(setAlert(err.response.data.msg,"danger"))

        dispatch({
            type: STAFF_ERROR,
            payload: { msg: err.response.statusText }
        });
    }
}


// export const deleteStaff = (staffId) => async dispatch => {
//     try{
//         const res = await axios.delete(`/api/admins/admin/${staffId}`)
//         dispatch({
//             type: DELETE_STAFF,
//             payload:staffId
//         })
//         dispatch(setAlert("Staff removed succesfully","success"))
//     }
//     catch(err){
//         dispatch({
//             type:STAFF_ERROR,
//             payload: {msg: err.response.statusText, status: err.response.status}
//         })
//     }
// }
