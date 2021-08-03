import axios from "axios";
import { setAlert } from "./alerts";
import { BUS_FOUND, BUS_NOTFOUND } from "./types";

// Search Buses by locations//

export const searchbuses =
  ({ to, from, date }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(config);
    // to=to.toLowerCase()
    // from=from.toLowerCase()

    let [toCity, toState] = to.split(",");
    let [fromCity, fromState] = from.split(",");
    toCity=toCity.trim()
    toState=toState.trim()
    fromCity=fromCity.trim()
    fromState=fromState.trim()
    const data = {
        destination: {
        city: toCity,
        state: toState,
      },
      
      source: {
        city: fromCity,
        state: fromState,
      },
      date,
    };

    const body = JSON.stringify(data);

    try {
      const res = await axios.post("/api/buses", body, config);
      console.log("found", res.data);
      if (res.data.length === 0) {
        dispatch({
          type: BUS_NOTFOUND,
        });
      } else {
        dispatch({
          type: BUS_FOUND,
          payload: res.data,
        });

        // dispatch(loadUser())
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }

      dispatch({
        type: BUS_NOTFOUND,
      });
    }
  };




  // search buses of a particular admin //

  export const currentAdminBuses = (adminId) => async (dispatch) => {
    try {
      console.log("data found")
      const res = await axios.get(`/api/buses/${adminId}`);
      dispatch({
        type: BUS_FOUND,
        payload: res.data,
      });
    } catch (err) {
      console.log(err,"error aaya")
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
  
      dispatch({
        type: BUS_NOTFOUND,
      });
    }
  };