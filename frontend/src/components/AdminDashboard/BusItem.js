import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteBus } from '../../actions/bus'

const BusItem = ({bus,deleteBus}) => {
    return (
    <div className="row mb-4">
        <div className="card w-100">
        <div className="card-header d-flex flex-direction-column justify-content-between bg-warning">
            <div>
            <h4 className="Bus_No"><strong> {bus.vehicleNo}</strong></h4>
            <h5><strong>Ac seater/ Sleeper</strong></h5>
        </div>
        <div>
            <h6><strong>{bus.arrivalTime}</strong></h6>
            <h6><strong>{bus.from.city}, {bus.from.state}</strong></h6>
        </div>
        <div>
            <h6><strong>{bus.departureTime}</strong></h6>
            <h6><strong>{bus.to.city}, {bus.to.state}</strong></h6>
        </div>
        <div>
            <h6 className="fare"><strong>Rs {bus.fare}</strong></h6>
        </div>
        <div>
            <h6 className="seatsLeft"><strong>Total {bus.seats[0].length*4} seats</strong></h6>
        </div>
        </div>
        <div className="card-body bg-primary">
            <button type="button" className="btn btn-danger" onClick={e=>deleteBus(bus._id)}><strong>Delete Bus</strong></button>
            <button type="button" className="btn btn-success"><strong>Reset Bus</strong></button>
        </div>
        </div>
    </div>
    )
}

BusItem.propTypes = {
    bus:PropTypes.object.isRequired,
    deleteBus:PropTypes.func.isRequired,
}



export default connect(null,{ deleteBus })(BusItem)
