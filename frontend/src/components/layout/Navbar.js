import React, { Fragment } from "react";
import { Link, useHistory } from 'react-router-dom';
import  { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth' 

const Navbar = ({auth:{isAuthenticated},logout}) => {
  let history = useHistory();
  const getAdminLogin = ()=> {
    history.push('/admin/login')
  }

  const getAdminSignUp = ()=>{
    history.push('/admin/register')
  }

  const authLinks = (
    <ul>
      <li>
      <Link onClick={logout} to='/'>Logout</Link>
    </li>
    
  </ul>
  );

  const guestLinks = (
    <ul>
    <li className="nav-item dropdown">
        <button className="nav-link dropdown-toggle" id="navbarDropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Partner
        </button>
        <div className="dropdown-menu bg-secondary" aria-labelledby="navbarDropdown">
          <button type="button" className="dropdown-item" onClick={getAdminLogin}>Login</button>
          <button type="button" className="dropdown-item" onClick={getAdminSignUp}>Register</button>
          </div>
      </li>

  </ul>
  );
  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to="/">
        TravelSafe
        </Link>
      </h1>
      {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
    </nav>
  );
};

Navbar.propTypes = {
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth:state.auth,
})

export default connect(mapStateToProps,{logout})(Navbar);