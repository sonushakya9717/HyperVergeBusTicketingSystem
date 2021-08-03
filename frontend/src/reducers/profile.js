import {
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_AGENCY,
  GET_PROFILE,
  LOGOUT,
  ADD_STAFF,
  STAFF_ERROR,
  GET_STAFF,
  DELETE_STAFF,
} from "../actions/types";

const initialState = {
  profile: null,
  buses: [],
  staffs: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_AGENCY:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_STAFF:
        return {
          ...state,
          staffs:[...payload]
        }
    case ADD_STAFF:
      return {
        ...state,
        staffs:[...state.staffs,payload]
      }
    case DELETE_STAFF:
      return {
        ...state,
        staffs:state.staffs.filter(staff=> staff._id !== payload)
      }
    case STAFF_ERROR:
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
    case LOGOUT:
      return {
        ...state,
        profile: null,
        buses: [],
        staffs: [],
        loading: true,
      };
      
    default:
      return state;
  }
};
