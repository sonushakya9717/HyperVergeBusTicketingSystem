import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AdminRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, isAdmin },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && !loading && isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect to="/admin/login" />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(AdminRoute);
