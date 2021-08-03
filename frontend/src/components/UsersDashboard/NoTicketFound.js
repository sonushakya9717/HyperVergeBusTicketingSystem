import React from 'react'
import { Fragment } from 'react'
import travelFast from '../../img/travelFast.jpg'

const NoTicketFound = () => {
    return (
        <Fragment>
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Book The Tickets</h5>
            <p className="card-text">Travel The World</p>
        </div>
        <img className="card-img-bottom" style={{height: "30rem"}} src={travelFast} alt="Card image cap" />
    </div>
        </Fragment>
        )
}

export default NoTicketFound
