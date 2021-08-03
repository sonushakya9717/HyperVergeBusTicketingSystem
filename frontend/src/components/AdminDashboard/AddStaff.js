import React,{useState,Fragment} from "react";
import PropTypes from "prop-types";
import { addStaff } from "../../actions/staff";
import { connect } from "react-redux";

const AddStaff = ({addStaff}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    isDriver: false,
  });

  const { name, phone, address} = formData;
  let { isDriver } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    isDriver = (isDriver === 'true');
    console.log({
        name,
        phone,
        address,
        isDriver
    });
    addStaff({
        name,
        phone,
        address,
        isDriver
    })
  };
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  return (
    <Fragment>
      <div className="container mt-4">
        <form onSubmit={e=>onSubmit(e)}>
          <div className="form-group row justify-content-around">
            <label className="col-2">Name</label>
            <input
              type="text"
              className="form-control w-50 col"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              placeholder="Enter the Name"
              required
            />
          </div>
          <div className="form-group row justify-content-around">
            <label className="col-2">phone No</label>
            <input
              type="text"
              className="form-control w-50 col"
              name="phone"
              value={phone}
              onChange={(e) => onChange(e)}
              placeholder="Enter phone No"
              required
            />
          </div>
          <div className="form-group row justify-content-around">
            <label className="col-2">address</label>
            <input
              type="text"
              className="form-control w-50 col"
              name="address"
              value={address}
              onChange={(e) => onChange(e)}
              placeholder="Enter the address"
              required
              
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="isDriver"
              value="true"
              onChange={(e) => onChange(e)}
              id="driver1"
            />
            <label className="form-check-label" for="driver1">
              Driver
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="isDriver"
              value="false"
              onChange={(e) => onChange(e)}
              id="helper1"
            />
            <label className="form-check-label" for="helper1">
              Helper
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-5"> Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

AddStaff.propTypes = {
    addStaff:PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps,{addStaff})(AddStaff);
