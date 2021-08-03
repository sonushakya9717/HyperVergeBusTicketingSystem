import React,{useEffect} from "react";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBusStatus } from '../../actions/busStatus'

const BusesItem = ({ bus, busStatus:{loading,status},key }) => {
  useEffect(() => {
    getBusStatus(bus._id);
  }, [getBusStatus, bus._id]);

  let travelDate = localStorage.getItem("travelDate");
  travelDate = new Date(travelDate);
  const month = travelDate.toLocaleString("default", { month: "short" });
  const date = travelDate.getDate();

  return (
    <div className="row mb-5" key={key}>
      <div className="card w-100">
        <div className="card-header d-flex flex-direction-column justify-content-between">
          <div>
            <h4 className="agencyName">{bus.agency.agencyName}</h4>
            <h6 className="busName">{bus.busName}</h6>
            <h6>
              {bus.busType}/ {bus.seatCategory}
            </h6>
          </div>
          <div>
            <h6>{bus.arrivalTime}</h6>
            <h6>
              {bus.from.city}, {bus.from.state}
            </h6>
            <h6>
              {date} {month}
            </h6>
          </div>
          <div>
            <h6>{bus.departureTime}</h6>
            <h6>
              {bus.to.city}, {bus.to.state}
            </h6>
          </div>
          <div>
            <h6>Fare</h6>
            <h6 className="fare">Rs {bus.fare}</h6>
          </div>
          <div>
            <h6 className="seatsLeft">Total {!loading && status.unbookedSeats.length} seats left</h6>
            <h6 className="windowSeats">{!loading && status.windowSeats} window seats</h6>
          </div>
        </div>
        <div className="card-body d-flex flex-direction-column justify-content-between align-items-end">
          <Link to={`/bus/${bus._id}/bookTickets`} className="btn btn-primary">
            Select Seats
          </Link>
          <div className="dropdown policies mb-0">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Policies
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <p className="dropdown-item">{bus.policy}</p>
            </div>
          </div>
          <div className="dropdown images mb-0">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              images
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              {bus.images.map((image) => (
                <img className="d-block w-100" src={image} alt="Third slide" />
              ))}
            </div>
          </div>
          <div className="dropdown reviews mb-0">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Reviews
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <h5 className="dropdown-item" type="button">
                Awesome
              </h5>
            </div>
          </div>

          <div className="btn-group dropleft staff mb-0">
            <button
              id="dropdownMenu2"
              className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              staff
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu3">
              <h6 className="dropdown-item">Driver : {bus.driver.name}</h6>
              <h6 className="dropdown-item">Helper: {bus.helper.name}</h6>
              <h6 className="dropdown-item r-0">
                Emergency No: {bus.agency.phone}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BusesItem.propTypes = {
  bus: PropTypes.object.isRequired,
  getBusStatus:PropTypes.func.isRequired,
  busStatus:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  busStatus: state.busStatus,
})


export default connect(mapStateToProps, { getBusStatus })(BusesItem);
