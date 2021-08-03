import { GET_LOCATIONS, LOCATIONS_ERROR,ADD_LOCATION_ERROR,ADD_LOCATION } from "../actions/types";

const initialState = {
    Locations: [],
    loading: true,
    error:{}
  };


  export default (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_LOCATIONS:
      case ADD_LOCATION:
        return {
          ...state,
          Locations: payload,
          loading: false,
        };
      case LOCATIONS_ERROR:
        return {
          ...state,
          Locations: [],
          loading: true,
        };
      case ADD_LOCATION_ERROR:
        return {
          ...state,
          loading:false,
          error:payload
        }
        
      default:
        return state;
    }
  };
  