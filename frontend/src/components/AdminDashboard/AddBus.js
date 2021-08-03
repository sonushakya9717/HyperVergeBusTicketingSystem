import React, {useState} from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addBus } from '../../actions/bus'
import { connect } from 'react-redux';
import {useHistory } from "react-router-dom";


const AddBus = ({locations,addBus}) => {
    let history = useHistory()
    let [formData,setFormData] = useState({
        busName: "",
        vehicleNo: "",
        seats: 0,
        driver:0,
        helper:0,
        fare:0,
        busType: "",
        seatCategory: "",
        policy: "",
        from: "",
        to:"",
        arrivalTime: "",
        departureTime: ""
    })

        let {
            busName,
            vehicleNo,
            seats,
            busType,
            seatCategory,
            policy,
            from,
            to,
            fare,
            driver,
            helper,
            arrivalTime,
            departureTime
        } = formData
    
    const [schedule,setSchedule] = useState([])
    const [images,setImages] = useState([]); 

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"]


    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    const getDays = (e)=>{
        const eventValue = parseInt(e.target.value)
        if(schedule.includes(eventValue)) {
            setSchedule(schedule.filter(day=>day!==eventValue))
         }else{
            setSchedule([...schedule,eventValue])
         }  
    }

    const onSubmit=(e)=>{    
        e.preventDefault();
        seats= parseInt(seats)
        driver = parseInt(driver)
        helper=parseInt(helper)
        fare=parseInt(fare)

        // to=to.toLowerCase();
        // from=from.toLowerCase()        
        if(to === from) {
        alert("Your cannot enter same starting and destination city");
            }
        else{
            console.log(from,to)
            addBus({
                busName,
                vehicleNo,
                seats,
                busType,
                seatCategory,
                policy,
                from,
                to,
                fare,
                driver,
                helper,
                images,
                arrivalTime,
                departureTime,
                schedule
            })

            history.push('/my-buses')

        }
    }


    // var availableLocations = locations.map(location=>`${location.city}, ${location.state}`);
    
    return (
        <form className="pb-5" onSubmit={e=>onSubmit(e)}>
            <div className="form-group row justify-content-around">
                <label className="col-2">Bus Name</label>
                <input type="text" className="form-control w-50 col" name="busName" value={busName} onChange={(e)=>onChange(e)} placeholder="Enter Bus Name" required/>
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2">Vehicle No</label>
                <input type="text" className="form-control w-50 col" name="vehicleNo" value={vehicleNo} onChange={(e)=>onChange(e)} placeholder="Enter Vehicle No"required />
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2">No. Seat Rows</label>
                <input type="number" className="form-control w-50 col" name="seats" value={seats} onChange={(e)=>onChange(e)} placeholder="Each Row Has 4 Seats Enter Numbers of Rows" required/>
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2">BusType</label>
                <input type="text" className="form-control w-50 col" name="busType" value={busType} onChange={(e)=>onChange(e)} placeholder="Enter Ac or NonAc" required/>
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2">SeatCategory</label>
                <input type="text" className="form-control w-50 col" name="seatCategory" value={seatCategory} onChange={(e)=>onChange(e)} placeholder="Enter sleeper or semi sleeper" required/>
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2">Policy</label>
                <input type="text" className="form-control w-50 col" name="policy" value={policy} onChange={(e)=>onChange(e)} placeholder="Enter the policy" required/>
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2">Image</label>
                <input type="text" className="form-control w-50 col" name="images" value={images} onChange={(e)=>setImages([...images,e.target.value])} placeholder="Enter the link of the image" required/>
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2" >Driver_Number</label>
                <input type="number" className="form-control w-50 col" name="driver" value={driver} onChange={(e)=>onChange(e)} placeholder="Enter The valid staff number" required/>
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2" >
                    Fare</label>
                <input type="number" className="form-control w-50 col" name="fare" value={fare} onChange={(e)=>onChange(e)} placeholder="Enter fare for the tickts" required/>
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2" >Helper_Number</label>
                <input type="number" className="form-control w-50 col" name="helper" value={helper} onChange={(e)=>onChange(e)} placeholder="Enter The valid staff number" required/>
            </div>
            <div className="form-group row">
            <label className="col-2">From</label>
                {/* <Autocomplete
                    id="combo-box-demo"
                    options={availableLocations}
                    style={{ width: 890 }}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Enter  the city and state name" name="from" value={from} onChange={(e)=>onChange(e)} variant="outlined" />}
                /> */}
                <input type="text" className="form-control w-50 col" name="from" value={from} onChange={(e)=>onChange(e)} placeholder="Enter the city name" required/>
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2">To</label>
                {/* <Autocomplete
                    id="combo-box-demo"
                    options={availableLocations}
                    style={{ width: 890 }}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Enter  the city and state name" name="to" value={to} onChange={setTolocation} variant="outlined" />}
                /> */}
                <input type="text" id="selector" className="form-control w-50 col" name="to" value={to} onChange={(e)=>onChange(e)} placeholder="Enter the city name" required/>
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2">ArrivalTime</label>
                <input type="text" className="form-control w-50 col" name="arrivalTime" value={arrivalTime} onChange={(e)=>onChange(e)} placeholder="Enter the arrivalTime" required/>
            </div>
            <div className="form-group row justify-content-around">
                <label className="col-2">DepartureTime</label>
                <input type="text" className="form-control w-50 col" name="departureTime" value={departureTime} onChange={(e)=>onChange(e)} placeholder="Enter the departureTime" required/>
            </div>
            <div className="schedule_sec">
                Bus Schedule {' '}
                {days.map((day,index) => <div className="form-check form-check-inline mr-0">
                    <input className="form-check-input" type="checkbox" value={index} onChange={e=>getDays(e)} />
                    <label className="form-check-label">{day}</label>
                </div>)}
            </div>
            <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </form>

    )
}

AddBus.propTypes = {
    locations:PropTypes.array.isRequired,
    addBus:PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    locations:state.locations.Locations
})


export default connect(mapStateToProps,{addBus})(AddBus)
