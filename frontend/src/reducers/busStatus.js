import { STATUS_ERROR, GET_BUSSTATUS} from "../actions/types";
  
  const initialState = {
    status : {},
    loading : true,
    error: {},
  };
  
  export default (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_BUSSTATUS:
        return {
          ...state,
          status: payload,
          loading: false,
        };
      case STATUS_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  