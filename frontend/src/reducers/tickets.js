import {
    BOOKING_FAIL,
    BOOKING_SUCCESS,
    TICKETS_FOUND,
    NO_TICKETS_FOUND,
    TICKET_ERROR,
    DELETE_TICKET,
    LOGOUT
} from '../actions/types';

const initialState = {
    tickets: [],
    loading: true,
    error:{}
};



export default function(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case BOOKING_SUCCESS:
            return {
                ...state,
                tickets:[payload,...state.tickets],
                loading: false
            };
        case TICKETS_FOUND:
            return {
                ...state,
                tickets:[...payload,...state.tickets],
                loading: false
            };
        case DELETE_TICKET:
            return {
                ...state,
                tickets:state.tickets.filter(ticket=> ticket._id !== payload)
            }
        case NO_TICKETS_FOUND:
        case LOGOUT:
            return {
                ...state,
                tickets:[],
                loading:false
            }
        case BOOKING_FAIL:
        case TICKET_ERROR:
            return {
                ...state,
                error:payload,
                loading: false
            }

        default:
            return state;
    }
}