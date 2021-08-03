import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alerts'
import { userRegister } from '../../actions/auth'

import PropTypes from 'prop-types'

const UserSignUp = ({ setAlert, userRegister, isAuthenticated }) => {

    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirm_password:""
    })

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
                isAdmin:false
            }

            userRegister(newUser)
        }
    }


    if(isAuthenticated){
        return <Redirect to='/searchBuses' />
    }

    return (
        <Fragment>
        <div className="signup-form">
        <form onSubmit={e => onSubmit(e)}>
            <h2>Sign Up</h2>
            <p>Please fill in this form to create an account!</p>
            <hr />
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <span className="fa fa-user"></span>
                        </span>
                    </div>
                    <input type="text" className="form-control" name="name" value={name} onChange={e => onChange(e)} placeholder="Username"  />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-paper-plane"></i>
                        </span>
                    </div>
                    <input type="email" className="form-control" name="email" value={email} onChange={e => onChange(e)} placeholder="Email Address"  />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-lock"></i>
                        </span>
                    </div>
                    <input type="password" className="form-control" name="password" value={password} onChange={e => onChange(e)} placeholder="Password"  />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-lock"></i>
                            <i className="fa fa-check"></i>
                        </span>
                    </div>
                    <input type="password" className="form-control" name="confirm_password" value={confirm_password} onChange={e => onChange(e)} placeholder="Confirm Password" required="required" />
                </div>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
            </div>
        </form>
        <div className="text-center">Already have an account? <Link to="/user/login">Login here</Link></div>
    </div>
    </Fragment>
    )
}

UserSignUp.propTypes = {
    setAlert:PropTypes.func.isRequired,
    userRegister:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
}



const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{ setAlert, userRegister })(UserSignUp);