import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userLogin } from '../../actions/auth'

import PropTypes from 'prop-types'


const UserLogin = ({ userLogin,isAuthenticated }) => {

    const [formData,setFormData] = useState({
        email:"",
        password:"",
    })

    const {email,password} = formData;

    const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value})
    const onSubmit =async e => {
        e.preventDefault()
        userLogin(email,password)
    }


    // Redirect to seach buses//
    if(isAuthenticated){
        return <Redirect to="/searchBuses" />
    }

    return (
        <Fragment>
        <div className="fluid-container limit">
                <div className="login-container">
                    <div className="bb-login">
                        <form className="bb-form validate-form" onSubmit={e => onSubmit(e)}> <span className="bb-form-title p-b-26"> Welcome </span> <span className="bb-form-title p-b-48"> <i className="mdi mdi-symfony"></i> </span>
                            <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c"> <input className="input100" type="email" name="email" value={email} onChange={e => onChange(e)}/> <span className="bbb-input" data-placeholder="Email"></span> </div>
                            <div className="wrap-input100 validate-input" data-validate="Enter password"> <span className="btn-show-pass"> <i className="mdi mdi-eye show_password"></i> </span>
                             <input className="input100" type="password" name="password" value={password} onChange={e => onChange(e)} /> <span className="bbb-input" data-placeholder="Password"></span> </div>
                            <div className="login-container-form-btn">
                                <div className="bb-login-form-btn">
                                    <div className="bb-form-bgbtn"></div> <button className="bb-form-btn"> Login </button>
                                </div>
                            </div>
                            <div className="text-center p-t-115"> <span className="txt1"> Don’t have an account? </span> <Link className="txt2" to="/user/register"> Sign Up </Link> </div>
                        </form>
                    </div>
                </div>
            </div>
            </Fragment>
    )
}


UserLogin.propTypes = {
    userLogin:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
}


const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})



export default connect(mapStateToProps,{ userLogin })(UserLogin)