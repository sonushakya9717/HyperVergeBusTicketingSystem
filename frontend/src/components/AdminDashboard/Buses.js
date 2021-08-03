import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BusNotFound from "../UsersDashboard/BusNotFound";
import { Spinner } from "../layout/Spinner";
import BusesItem from './BusItem';
import { getAllLocations } from '../../actions/location'
import {currentAdminBuses} from '../../actions/searchBuses'


const AdminBuses = ({currentAdminBuses,profile:{_id},getAllLocations,searchBuses:{loading,buses}}) => {
    useEffect(() => {
        currentAdminBuses(_id)
    }, [currentAdminBuses])
    let history = useHistory()
    const addBus = ()=>{
        getAllLocations()
        history.push('/addbus')
    }

    const addLocations = () => {
        history.push('/addLocation')
    }

    return loading ? <Spinner /> : (<div className="col-12">
    <div className="row mb-5 pt-5 pb-5" id="addBus">
        <button onClick={addBus} className="btn btn-primary"><strong>Add Bus</strong></button>
        <button onClick={addLocations} className="btn btn-primary"><strong>Add Location</strong></button>
    </div> 
    {buses.length ===0 ? <BusNotFound /> : (buses.map(bus => <BusesItem key={bus._id} bus={bus} />)) }
    </div>)
}

AdminBuses.propTypes = {
    searchBuses:PropTypes.object.isRequired,
    getAllLocations:PropTypes.func.isRequired,
    currentAdminBuses:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    searchBuses:state.searchBuses,
    profile:state.profile.profile
})
export default connect(mapStateToProps, { getAllLocations,currentAdminBuses })(AdminBuses)
