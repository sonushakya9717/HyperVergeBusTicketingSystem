import React from "react";
import PropTypes from "prop-types";

const PassengerDetail = ({ id, bookedSeats }) => {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  console.log(bookedSeats, id);
  return bookedSeats.map((seat, idx) => {
    return (
      <form key={idx} className="form seatfrm mb-3">
        <p className="text-capitalize text-center">Seat No:{seat}</p>
        <input
          className="form-control seatInp"
          onBlur={(e) => handlePassengerName(e)}
          type="text"
          name="passenger-name"
          placeholder="Enter Name"
        />
        <br></br>
        <input
          className="form-control seatInp"
          onBlur={(e) => handlePassengerAge(e)}
          type="int"
          name="passenger-age"
          placeholder="Enter Age "
        />
        <br></br>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="male"
            value="Male"
            onClick={(e) => handleGender(e)}
          />
          <label className="form-check-label" for="male">
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="female"
            value="Female"
            onClick={(e) => handleGender(e)}
          />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
      </form>
    );
  });
};

PassengerDetail.propTypes = {
  bookedSeats: PropTypes.array.isRequired,
};

export default PassengerDetail;
