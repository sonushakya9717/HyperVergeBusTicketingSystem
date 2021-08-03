import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {useHistory } from "react-router-dom";
import { connect } from "react-redux";


const DashboardActions = ({profile:{agencyName,phone,headOfficeLocation,createdAt,agent:{email}}}) => {
  let history = useHistory()
  const busesFunc= ()=>{
    history.push('/my-buses')
  }
  const staffFunc = () =>{
    history.push('/my-staffs')
  }
  let startedAt = createdAt.slice(0, 10);
    return (
    <div>
        <h2 className="agencyName">Agency Name: {agencyName}</h2>
        <h2 className="email">
            Email: {email}
        </h2>
        <h2 className="contact no.">
            Contact:{phone}
        </h2>
        <h2 className="Location">
            Office: {headOfficeLocation}
        </h2>
        <h2 className="StartedAt">Partner Since: {startedAt} </h2>
      <div className="dash-buttons mt-4">
        <button className="btn btn-danger">
           Delete
        </button>
        <button to="/my-buses" onClick={busesFunc} className="btn btn-primary">
           Buses
        </button>
        <button to="/my-staff" onClick={staffFunc} className="btn btn-primary">
           Staffs
        </button>
      </div>
    </div>
  );
};

DashboardActions.propTypes = {
    profile:PropTypes.object.isRequired,
}

export default connect()(DashboardActions)