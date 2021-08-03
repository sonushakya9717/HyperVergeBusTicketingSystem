import React, { useEffect } from "react";
import PropTypes from "prop-types";
import StaffItem from "./StaffItem";
import { connect } from "react-redux";
import { Spinner } from "../layout/Spinner";
import { useHistory } from "react-router";
import BusNotFound from "../UsersDashboard/BusNotFound";
import { getAllStaffs } from "../../actions/staff";


const Staffs = ({ getAllStaffs, profile: {profile:{agent}, loading, staffs } }) => {
    useEffect(() => {
        getAllStaffs(agent._id)
    }, [getAllStaffs])

    let history = useHistory()
    const addStaffRoute = ()=>{

        history.push('/addStaff')
    }
  return loading ? (
    <Spinner />
  ) : (
    <div className="col-12">
      <div className="row mb-5 pt-5 pb-5" id="addBus">
        <button onClick={addStaffRoute} className="btn btn-primary">
          <strong>Add Staff</strong>
        </button>
      </div>
      {staffs.length === 0 ? (
        <BusNotFound />
      ) : (
        staffs.map((staff) => <StaffItem key={staff._id} staff={staff} />)
      )}
    </div>
  );
};

Staffs.propTypes = {
  profile: PropTypes.object.isRequired,
  getAllStaffs:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps,{getAllStaffs})(Staffs);
