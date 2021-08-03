import React from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { connect } from "react-redux";
import { Spinner } from "../layout/Spinner";
import NoTicketFound from "./NoTicketFound";
import TicketItem from "./TicketItem";

const Tickets = ({ tickets: { tickets, loading } }) => {
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {tickets.length === 0 ? (
        <NoTicketFound />
      ) : (
        <Fragment>
          <div className="fluid-container pb-5">
            {tickets.map((ticket) => (
              <Fragment>
                  <TicketItem key={ticket._id} ticket={ticket}/>
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Tickets.propTypes = {
  tickets: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tickets: state.tickets,
  auth: state.auth,
});

export default connect(mapStateToProps)(Tickets);
