import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { adminLogin } from "../../actions/auth";
import {useHistory } from "react-router-dom";


import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";

function AdminLogin({ adminLogin, isAdmin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    adminLogin(email, password);
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      marginBottom:theme.spacing(1),
      marginLeft: theme.spacing(12),
      backgroundColor: theme.palette.secondary.main,
    },
    title:{
      marginLeft: theme.spacing(11)
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  let history = useHistory()
  
  if (isAdmin) {
   history.push('/admin/dashboard')
  }

  return (
    <div className="page-login">
      <div className="ui centered grid container">
        <div className="four wide column">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={classes.title} component="h1" variant="h5">
            Log In
          </Typography>
          <div className="ui fluid card">
            <div className="content">
              <form className="ui form" onSubmit={(e) => onSubmit(e)}>
                <div className="field">
                  <label>Work Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    placeholder="Email"
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    placeholder="Password"
                  />
                </div>
                <button
                  className="ui primary labeled icon button"
                  type="submit"
                >
                  <i className="unlock alternate icon"></i>
                  Login
                </button>
                <div className='mt-2'>
                <span> Don't have an account?</span>
                <Link to="/admin/register"> Sign Up </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AdminLogin.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  adminLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { adminLogin })(AdminLogin);
