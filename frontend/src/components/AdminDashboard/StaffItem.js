import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const StaffItem = ({staff:{phone,name,address,isDriver}}) => {
    return (
        <div className="row mb-4">
            <div className="card w-100">
            <div className="card-header d-flex flex-direction-column justify-content-between bg-warning">
                <div>
                <h4 className="Name"><strong> {name}</strong></h4>
            </div>
            <div>
                <h6 className="phone"><strong>{phone}</strong></h6>
            </div>
            <div>
                <h6 className="address"><strong>{address}</strong></h6>
            </div>
            <div>
                <h6 className="position"><strong>{isDriver ? "Driver": "Helper"}</strong></h6>
            </div>
            </div>
            </div>
        </div>
        )
}

StaffItem.propTypes = {
    deleteStaff:PropTypes.func.isRequired,
}


export default connect()(StaffItem)
