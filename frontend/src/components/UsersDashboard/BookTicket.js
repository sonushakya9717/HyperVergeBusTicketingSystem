import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import steering from '../../img/steering.jpg'
import { getBusStatus } from '../../actions/busStatus'
import { bookSeats } from "../../actions/bookSeats"
import { connect } from "react-redux";

const BookTicket = ({ buses,bookSeats, busStatus:{loading,status}, getBusStatus, match }) => {
  useEffect(() => {
    getBusStatus(match.params.busId);
  }, [getBusStatus, match.params.busId]);

  const [name, setName] = useState({});
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState({});
  const [gender, setGender] = useState({});
  const [seatNumber, setSeatnumber] = useState([]);

  const travelDate = localStorage.getItem("travelDate");
  let to = localStorage.getItem("to")
  let from = localStorage.getItem("from")
  to=to.toUpperCase()
  from = from.toUpperCase()



  const getSeatNumber = (e) => {
    let newSeat = e.target.value;
    if (seatNumber.includes(newSeat)) {
      setSeatnumber(seatNumber.filter((seat) => seat !== newSeat));
    }
    else {
      setSeatnumber([...seatNumber, newSeat]);
    }
    renderPassengerData(seatNumber);
    isTicketSelected(seatNumber)
  };

  const handleGender = (e, seat) => {
    const { value } = e.target;
    gender[`${seat}`] = value
    setGender({ ...gender });
  };
  const handlePassengerName = (e, seat) => {
    e.preventDefault();
    let value = e.target.value;
    if (!value) {
      name[`${seat}`] = 'Empty'
      setName({ ...name });
    } else {
      name[`${seat}`] = value
      setName({ ...name });
    }
  };


  const handlePassengerAge = (e, seat) => {
    e.preventDefault();
    let value = e.target.value;

    if (!value) {
      age[`${seat}`] = 'Empty'
      return setAge({ ...age });
    } else {
      age[`${seat}`] = value
      return setAge({ ...age });
    }
  };


  const handlePassengerEmail = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (!value) {
      return setEmail("Empty");
    } else {
      return setEmail(value);
    }
  };
  const handlePassengerPhone = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (!value) {
      return setPhone("Empty");
    } else {
      return setPhone(value);
    }
  };


  const handleSubmitDetails = e => {
    e.preventDefault()
    const passengers = []
    for (let i = 0; i < seatNumber.length; i++) {
      const currentSeat = seatNumber[i]
      if (name[currentSeat] || age[currentSeat] || gender[currentSeat] !== "Empty") {
        passengers.push({
          name: name[currentSeat],
          age: age[currentSeat],
          gender: gender[currentSeat]
        })
      }
      else {
        return alert("Please fill all the details")
      }

    }
    let userData = {
      seats_no: seatNumber,
      passengers,
      journeyDate: travelDate,
      email,
      contactNo: phone,
      to,
      from
    }

    bookSeats(match.params.busId, userData)
  }

  const renderPassengerData = (seatArray) => {
    console.log(seatNumber, "hello")
    return seatArray.map((seat, idx) => {
      return (
        <form key={idx} className="form seatfrm mb-3">
          <p className="text-capitalize text-center">Seat No:{seat}</p>
          <input className="form-control seatInp" onBlur={e => handlePassengerName(e, seat)} type="text" name="passenger-name" placeholder="Enter Name" /><br></br>
          <input className="form-control seatInp" onBlur={e => handlePassengerAge(e, seat)} type="int" name="passenger-age" placeholder="Enter Age " /><br></br>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onClick={e => handleGender(e, seat)} />
            <label className="form-check-label" for="male">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="gender" id="female" value="Female" onClick={e => handleGender(e, seat)} />
            <label className="form-check-label" htmlFor="female">Female</label>
          </div>
        </form>)
    })
  }

  const isBooked = (seat) => {
    if(!loading){
      return status['unbookedSeats'].includes(seat) ? seat : "booked"
    }
  }

  const isTicketSelected = (seatArray) => {
    return seatArray.length === 0 ? (<div><h1>Don't Think Select The Seats</h1></div>) : (<div className="mb-3">
      <form className="form seatfrm mb-3">
        <input className="form-control seatInp" onBlur={e => handlePassengerEmail(e)
        } type="email" name="email" placeholder="Enter Email to get Tickets" /><br></br>
        <input className="form-control seatInp" onBlur={e => handlePassengerPhone(e)} type="text" name="contactNO" placeholder="Enter Phone number" /><br></br>
      </form >
      <button
        onClick={(e) => handleSubmitDetails(e)}
        className="btn btn-info primary"
      >
        Book Ticket
  </button>
    </div >)
  }
  return (
    <div className="pl-5 ml-5 ss">
      <div className="row flex-direction-column">
        <div className="col-6">
          <div className="plane">
            <div className='form-row pl-2'>
              <img src={steering} alt="steering" className='steering' />
            </div>
            <form onChange={(e) => getSeatNumber(e)}>
              <ol className="cabin fuselage">
                <li className="row row--1">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="1A" id={isBooked("1A")} />
                      <label htmlFor="1A" className={isBooked("1A")}>1A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" id={isBooked("1B")} value="1B" />
                      <label htmlFor="1B" className={isBooked("1B")}>1B</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="1C" id={isBooked("1C")} />
                      <label htmlFor="1C" className={isBooked("1C")}>1C</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="1D" id={isBooked("1D")} />
                      <label htmlFor="1D" className={isBooked("1D")}>1D</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--2">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="2A" id={isBooked("2A")} />
                      <label htmlFor="2A" className={isBooked("2A")}>2A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="2B" id={isBooked("2B")}/>
                      <label htmlFor="2B" className={isBooked("2B")}>2B</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="2C" id={isBooked("2C")}/>
                      <label htmlFor="2C" className={isBooked("2C")}>2C</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="2D" id={isBooked("2D")}/>
                      <label htmlFor="2D" className={isBooked("2D")}>2D</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--3">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="3A" id={isBooked("3A")}/>
                      <label htmlFor="3A" className={isBooked("3A")}>3A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="3B" id={isBooked("3B")}/>
                      <label htmlFor="3B" className={isBooked("3B")} >3B</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="3C" id={isBooked("3C")}/>
                      <label htmlFor="3C" className={isBooked("3C")}>3C</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="3D" id={isBooked("3D")}/>
                      <label htmlFor="3D" className={isBooked("3D")}>3D</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--4">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="4A" id={isBooked("4A")}/>
                      <label htmlFor="4A" className={isBooked("4A")}>4A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="4B" id={isBooked("4B")}/>
                      <label htmlFor="4B" className={isBooked("4B")}>4B</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="4C" id={isBooked("4C")}/>
                      <label htmlFor="4C" className={isBooked("4C")}>4C</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="4D" id={isBooked("4D")}/>
                      <label htmlFor="4D" className={isBooked("4D")}>4D</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--5">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="5A" id={isBooked("5A")}/>
                      <label htmlFor="5A" className={isBooked("5A")}>5A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="5B" id={isBooked("5B")}/>
                      <label htmlFor="5B" className={isBooked("5B")}>5B</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="5C" id={isBooked("5C")}/>
                      <label htmlFor="5C" className={isBooked("5C")}>5C</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="5D" id={isBooked("5D")}/>
                      <label htmlFor="5D" className={isBooked("5D")}>5D</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--6">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="6A" id={isBooked("6A")}/>
                      <label htmlFor="6A" className={isBooked("6A")}>6A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="6B" id={isBooked("6B")}/>
                      <label htmlFor="6B" className={isBooked("6B")}>6B</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="6C" id={isBooked("6C")}/>
                      <label htmlFor="6C" className={isBooked("6C")}>6C</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="6D" id={isBooked("6D")}/>
                      <label htmlFor="6D" className={isBooked("6D")}>6D</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--7">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="7A" id={isBooked("7A")}/>
                      <label htmlFor="7A" className={isBooked("7A")}>7A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="7B" id={isBooked("7B")}/>
                      <label htmlFor="7B" className={isBooked("7B")}>7B</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="7C" id={isBooked("7C")}/>
                      <label htmlFor="7C" className={isBooked("7C")}>7C</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="7D" id={isBooked("7D")}/>
                      <label htmlFor="7D" className={isBooked("7D")}>7D</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--8">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="8A" id={isBooked("8A")}/>
                      <label htmlFor="8A" className={isBooked("8A")}>8A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="8B" id={isBooked("8B")}/>
                      <label htmlFor="8B" className={isBooked("8B")}>8B</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="8C" id={isBooked("8C")}/>
                      <label htmlFor="8C" className={isBooked("8C")}>8C</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="8D" id={isBooked("8D")}/>
                      <label htmlFor="8D" className={isBooked("8D")}>8D</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--9">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="9A" id={isBooked("9A")}/>
                      <label htmlFor="9A" className={isBooked("9A")}>9A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="9B" id={isBooked("9B")}/>
                      <label htmlFor="9B" className={isBooked("9B")}>9B</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="9C" id={isBooked("9C")}/>
                      <label htmlFor="9C" className={isBooked("9C")}>9C</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="9D" id={isBooked("9D")}/>
                      <label htmlFor="9D" className={isBooked("9D")}>9D</label>
                    </li>
                  </ol>
                </li>
                <li className="row row--10">
                  <ol className="seats" type="A">
                    <li className="seat">
                      <input type="checkbox" value="10A" id={isBooked("10A")} />
                      <label htmlFor="10A" className={isBooked("10A")}>10A</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="10B" id={isBooked("10B")} />
                      <label htmlFor="10B" className={isBooked("10B")}>10B</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="10C" id={isBooked("10C")} />
                      <label htmlFor="10C" className={isBooked("10C")}>10C</label>
                    </li>
                    <li className="seat">
                      <input type="checkbox" value="10D" id={isBooked("10D")} />
                      <label htmlFor="10D" className={isBooked("10D")}>10D</label>
                    </li>
                  </ol>
                </li>
              </ol>
            </form>
          </div>
        </div>
        <div className="col-6">
          <div className="seatInfo">
            <form className="form-group pb-4">
              {renderPassengerData(seatNumber)}
            </form>
            {isTicketSelected(seatNumber)}
          </div>
        </div>
      </div>
    </div>
  );
};

BookTicket.propTypes = {
  bookSeats: PropTypes.func.isRequired,
  getBusStatus: PropTypes.func.isRequired,
  busStatus: PropTypes.object.isRequired,
  buses:PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  busStatus: state.busStatus,
  buses:state.searchBuses.buses,
})

export default connect(mapStateToProps, { bookSeats, getBusStatus })(BookTicket);
