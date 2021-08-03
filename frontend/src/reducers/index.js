import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile'
import searchBuses from './searchBuses';
import busStatus from './busStatus';
import locations from './locations';
import tickets from './tickets';
export default combineReducers({
    alert,
    auth,
    searchBuses,
    profile,
    busStatus,
    locations,
    tickets
});
