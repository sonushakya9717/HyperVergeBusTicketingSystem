import React,{useState} from "react";
import { connect } from "react-redux";
import { addProfile } from "../../actions/profile";
import PropTypes from 'prop-types'

const Profile = ({addProfile}) => {
    const [formData,setFormData] = useState({
        agencyName:"",
        phone:"",
        headOfficeLocation:"",
});

const {agencyName,headOfficeLocation} = formData;
let { phone } = formData;

const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value})

const onSubmit =async e => {
    e.preventDefault()

    phone = Number(phone)
    const data={
        agencyName,
        phone,
        headOfficeLocation,
    }

    console.log(data)
    addProfile(data)
}

  return (
    <form
      className="form"
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <div className="form-group">
        <input
          type="text"
          placeholder="*Agency Name"
          name="agencyName"
          value={agencyName}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="*Phone"
          name="phone"
          value={phone}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="headOfficeLocation"
          name="headOfficeLocation"
          value={headOfficeLocation}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary"
          type="submit">Submit</button>
      </div>
    </form>
  );
};

Profile.propTypes = {
    addProfile: PropTypes.func.isRequired,
  };

export default connect(null,{ addProfile })(Profile);
