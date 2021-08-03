import {REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_CALLED,
    ADMIN_CALLED,
    LOGOUT,
} from "../actions/types";


const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : null,
    loading: true,
    isAdmin:false,
    user : null,
};

const auth=(state = initialState, action)=>{
    const {type, payload} = action;
    switch(type){
        case ADMIN_CALLED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false, 
                isAdmin:true,
                user:payload
            }
        case USER_CALLED:
                return{
                    ...state,
                    isAuthenticated:true,
                    loading:false, 
                    isAdmin:false,
                    user:payload
                }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false, 
                user:payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log(payload)
            localStorage.setItem('token',payload.token);
            return{ 
                ...state,
                token:payload.token,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                isAdmin:false,
                user:null,
                loading:true    
            }
        default:
            return state;
    } 
}
export default auth;
