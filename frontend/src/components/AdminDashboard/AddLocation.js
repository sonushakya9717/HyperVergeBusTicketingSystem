import React, {useState} from "react";
import { Fragment } from "react";
import { addLocations } from "../../actions/location";
import PropTypes from 'prop-types'
import { connect } from "react-redux";

const AddLocation = ({ addLocations }) => {
    const [formData,setFormData] = useState({
        city: "",
        state: ""
    })
    

    const onSubmit=(e)=>{    
        e.preventDefault(); 
        city=city.toLocaleLowerCase()
        state = state.toLocaleLowerCase()
        console.log({city,state})

        addLocations({city,state})
    }

    let {city,state} = formData

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});


  return (
    <Fragment>
      <div className="container mt-4">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group row justify-content-around">
            <label className="col-2">City</label>
            <input
              type="text"
              className="form-control w-50 col"
              name="city"
              value={city}
              onChange={(e) => onChange(e)}
              placeholder="Enter the city"
              required
            />
          </div>
          <div className="form-group row justify-content-around">
            <label className="col-2">State</label>
            <input
              type="text"
              className="form-control w-50 col"
              name="state"
              value={state}
              onChange={(e) => onChange(e)}
              placeholder="Enter the state"
              required
            />
          </div>
          <button className="btn btn-primary"> Add location</button>
        </form>
      </div>
    </Fragment>
  );
};

AddLocation.propTypes = {
  addLocations:PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth:state.auth
})

export default connect(mapStateToProps,{ addLocations })(AddLocation);
