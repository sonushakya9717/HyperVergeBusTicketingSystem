import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { userRegister } from "../../actions/auth";
import { setAlert } from '../../actions/alerts'

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AdminSignup = ({ setAlert, userRegister, isAdmin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const {name,email,password,confirm_password} = formData;

  const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value})
    const onSubmit =async e => {
        e.preventDefault()
        if(password !== confirm_password){
            setAlert('Password does not match','danger')
        }else{
            const newUser = {
                name,
                email,
                password,
                isAdmin:true
            }
            userRegister(newUser)
        }
    }


  const classes = useStyles();
  if (isAdmin) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                value={name} onChange={e => onChange(e)}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                name="email"
                value={email} onChange={e => onChange(e)}
                label="Email Address"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={password} onChange={e => onChange(e)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm_password"
                value={confirm_password} onChange={e => onChange(e)}
                label="Confirm Password"
                type="password"
                id="comfirm_password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <span>Already have an account? </span>
              <Link to="/admin/login"> Sign in </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

AdminSignup.propTypes = {
  userRegister:PropTypes.func.isRequired,
  setAlert:PropTypes.func.isRequired,
  isAdmin:PropTypes.bool,
}

const mapStateToProps = state => ({
  isAdmin:state.auth.isAdmin
})

export default connect(mapStateToProps,{setAlert,userRegister})(AdminSignup);
