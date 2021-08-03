import axios from "axios";
import { setAlert } from "./alerts";
import { STATUS_ERROR, GET_BUSSTATUS } from "./types";


// Get the bus current status
export const getBusStatus = (busId) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/buses/${busId}/status`);
      dispatch({
        type: GET_BUSSTATUS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
  
      dispatch({
        type: STATUS_ERROR,
      });
    }
  };
  