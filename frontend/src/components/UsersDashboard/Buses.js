import React, { Fragment } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import BusNotFound from "./BusNotFound";
import { Spinner } from "../layout/Spinner";
import BusesItem from "./BusesItem";

const Buses = ({searchBuses:{ buses,loading }}) => {
  
  return loading ? <Spinner /> : (
    <Fragment>
      {buses.length === 0 ? (
        <BusNotFound />
      ) : (
        <Fragment>
          <div className="fluid-container pb-5">
            {buses.map((bus) => (
              <Fragment><BusesItem key={bus._id} bus={bus} /></Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Buses.propTypes = {
  searchBuses: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  searchBuses: state.searchBuses,
});

export default connect(mapStateToProps)(Buses);
