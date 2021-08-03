import React from "react";
import PropTypes from "prop-types";
import { deleteTicket } from "../../actions/bookSeats";
import { connect } from "react-redux";


const TicketItem = ({ticket:{_id,passengers,seats_no,journeyDate,from,to,busId:{vehicleNo,departureTime}}, deleteTicket}) => {
  let travelDate = new Date(journeyDate);
  const month = travelDate.toLocaleString("default", { month: "short" });
  const date = travelDate.getDate();
  const year = travelDate.getFullYear();
  let today = new Date().toISOString().slice(0, 10)

  return (
    <div className="row bg-warning rounded mb-3">
      <div className="col-auto bg-primary rounded"></div>
      <div className="col">
        <h3>BUS TICKET</h3>
        <div className="form-row ml-1 mr-1 pl-2 pr-2 bg-primary rounded align-items-center mb-3">
          <p className="text-white m-0">
            <strong>BOARDING PASS</strong>
          </p>
        </div>
        <div className="form-row pb-4">
          <div className="col">
            <h6>Passengers</h6>
            {passengers.map((passenger,index) => (
                <h6>
                <strong>
                  {passenger.name} - {seats_no[index]}
                </strong>
              </h6>
              ))}
              
          </div>
          <div className="col">
            <h6 className="bus">Bus</h6>
            <h6 className="bus_no">
              <strong>{vehicleNo}</strong>
            </h6>
          </div>
          <div className="col">
            <h6 className="date">Date</h6>
            <p className="date_of_ticket">
              <strong>{date} {month} {year}</strong>
            </p>
          </div>
        </div>
        <div className="form-row pb-4">
          <div>
            <h6 className="from">from</h6>
            <p className="from_locations">
              <strong>{from}</strong>
            </p>
          </div>
        </div>
        <div className="form-row pb-4">
          <div>
            <h6 className="to">to</h6>
            <p className="to_locations">
              <strong>{to}</strong>
            </p>
          </div>
        </div>
        <div className="form-row align-items-center justify-content-center pb-2">
          <div>
            <h6 className="time">boarding time</h6>
            <h2 className="boarding_time text-danger mt-0">
              <strong>{departureTime}</strong>
            </h2>
          </div>
        </div>
      </div>
      <div className="col-auto d-flex align-items-center">
        <div>
          {journeyDate>today && (<button type="button" className="btn btn-danger" onClick={e=>deleteTicket(_id)}>
            <strong>Cancel Ticket</strong>
          </button>)}
          
        </div>
      </div>
    </div>
  );
};

TicketItem.propTypes = {
  deleteTicket:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth:state.auth
})

export default connect(mapStateToProps,{deleteTicket})(TicketItem);
