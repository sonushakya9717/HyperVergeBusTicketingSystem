import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const Landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Redirect to="/searchBuses" />
  }

    return (
      <Fragment>
        <div className="col-12 landing-section d-flex justify-content-center align-items-center">
          <div>
          <h1 className="x-large">Book Tickets</h1>
          <p className="lead">
            Create a profile, book tickets, have safe journey
          </p>
          <div className="buttons d-flex justify-content-around">
            <Link to="/user/register" className="btn btn-success">Sign Up</Link>
            <Link to="/user/login" className="btn btn-light">Login</Link>
          </div>
          </div>
        </div>
  </Fragment>

    )
}


Landing.propTypes = {
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
})



export default connect(mapStateToProps)(Landing);