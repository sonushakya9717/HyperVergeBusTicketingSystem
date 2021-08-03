import React, { Fragment, useEffect } from "react";
import { Spinner } from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import  DashboardActions  from "./DashboardActions";
const Dashboard = ({
  profile: { profile, loading },
  auth: { user },
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading===true && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <h1 className="lead mb-5">
         Welcome {user && user.name}
      </h1>

      {profile !== null  ? (
        <Fragment>
          <DashboardActions profile={profile}/>
        </Fragment>
      ) : (
        <div>
          <Link to="/create-profile" className="btn btn-primary btn-sm my-1">
            Create Profile
          </Link>
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
