import {
    BUS_FOUND,
    BUS_NOTFOUND,
    ADD_BUS,
    BUS_ERROR,
    REMOVE_BUS
} from '../actions/types';


const initialState = {
    buses: [],
    loading: true,
    error: {},
  };


const searchBuses = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case BUS_FOUND:
        return {
          ...state,
          buses: payload,
          loading: false,
        };
      case ADD_BUS:
        return {
          ...state,
          buses:[payload,...state.buses]
        }

  
      case REMOVE_BUS:
        return {
          ...state,
          buses:state.buses.filter(bus=> bus._id !== payload)
        }
      case BUS_NOTFOUND:
      case BUS_ERROR:
          return {
            ...state,
            error:payload,
            loading:false
          }
      default:
        return state;
    }
  }
  
  export default searchBuses;