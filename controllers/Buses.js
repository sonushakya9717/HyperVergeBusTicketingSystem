const Bus = require("../models/Buses");
const { validationResult } = require("express-validator");
const Agency = require("../models/Agency");
const { locationSearch } = require("../utils/searchLocation");
const { allBookedTickets } = require("../utils/allBookedTickets");
const Staffs = require("../models/Staffs");
const Tickets = require("../models/Tickets");


// create a new bus or update the bus
const addBus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    busName,
    id,
    vehicleNo,
    seats,
    busType,
    seatCategory,
    policy,
    images,
    from,
    to,
    fare,
    schedule,
    arrivalTime,
    departureTime,
  } = req.body;

  let { driver, helper } = req.body;

  let busDetails = {
    busName,
    vehicleNo,
    policy,
    images,
    fare,
    schedule,
    arrivalTime,
    departureTime,
  };

  if (seatCategory) busDetails.seatCategory = seatCategory;
  if (busType) busDetails.busType = busType;

  try {
    let agencyProfile = await Agency.findOne({ agent: req.user.id });
    if (agencyProfile) {
      let bus = await Bus.findOne({ vehicleNo });

      busDetails.agency = agencyProfile._id;
      busDetails.seats = generateBus(seats);
      console.log(from)
      console.log(to)
      let fromLocation = await locationSearch(from);
      let toLocation = await locationSearch(to);
      if (!toLocation || !fromLocation) {
        return res.status(404).json({ msg: "No such location found" });
      }
      driver = await searchStaff(driver);
      helper = await searchStaff(helper);
      if (!driver || !helper) {
        return res.status(400).json({ msg: "No such staff found" });
      } else if (!driver.isDriver) {
        return res.status(400).json({ msg: "No such driver found" });
      } else if (helper.isDriver) {
        return res.status(400).json({ msg: "No such helper found" });
      }
      busDetails.driver = driver;
      busDetails.helper = helper;
      busDetails.from = fromLocation._id;
      busDetails.to = toLocation._id;

      if (bus) {
        // Update the bus
        bus = await Bus.findOneAndUpdate(
          { vehicleNo },
          { $set: busDetails },
          { new: true }
        );
        return res.status(200).json(bus);
      }

      // testing purpose only
      if (id) busDetails._id = id;

      bus = new Bus(busDetails);

      console.log("done successfully",bus);
      await bus.save();
      return res.status(200).json(bus);
    } else {
      return res.status(400).json({ msg: "No agency found of current admin" });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: "Server error" });
  }
};

// Create a bus of size n
const generateBus = (seats) => {
  let bus_size = [];
  list = ["A", "B", "C", "D"];
  for (let i = 0; i < 4; i++) {
    row = [];
    for (let j = 1; j <= seats; j++) {
      row.push(j + list[i]);
    }
    bus_size.push(row);
  }
  return bus_size;
};

const searchStaff = (phone) => {
  return new Promise((resolve, reject) => {
    let staff = Staffs.findOne({ phone });
    if (staff) {
      resolve(staff);
    }
  });
};

// function which will search buses with some specific fields
const searchBuses = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { source, destination, date } = req.body;

  try {
    source = await locationSearch(source);
    destination = await locationSearch(destination);
    if (!destination || !source) {
      return res.status(400).json([]);
    }

    let buses = await Bus.find({
      $and: [{ to: destination }, { from: source }],
    }).populate('to',['city','state'])
    .populate('from',['city','state'])
    .populate('driver',['name'])
    .populate('helper','name')
    .populate('agency',['agencyName','phone']);
    

    if (!buses) { 
      return res.status(400).json([]);
    }
    buses = buses.filter((bus) => {
      if (bus.schedule.includes(date)) {
        return bus;
      }
    });
    if (buses.isEmpty) {
      return res.status(400).json([]);
    }
    return res.status(200).json(buses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
};

//get bus by adminId
const getBus = async (req, res) => {
  try {
    const bus = await Bus.find({agency:req.params.adminId}).populate('to',['city','state'])
    .populate('from',['city','state']);

    if (bus.length===0) {
      return res.status(400).json({ msg: "there is no such bus" });
    }
    return res.status(200).json(bus);
  } catch (err) {
    res.status(500).json({ msg: "server Error" });
  }
};


// delete bus by busId
const deleteBus = async(req,res) => {
  try{
    const bus = await Bus.findById(req.params.busId)
    const agency = await Agency.findOne({agent:req.user.id})
    if(!bus || !agency){
      return res.status(400).json({msg:"bus not found"})
    }

    if(bus.agency.toString() === agency._id.toString()){
      console.log("hello")
      await Bus.findOneAndDelete({_id:req.params.busId})
      return res.status(200).json({msg:"Bus deleted successfully"})
    }
    else{
      return res.status(400).json({msg:"bus not found"})
    }
  }catch(err){
    return res.status(500).json({msg:"server error"})
  }
}


// get bus status
const getBusStatus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.busId);
    if (!bus) {
      return res.status(400).json({ msg: "there is no such bus" });
    }
    const seats = bus.seats;

    let allBookedSeats = await allBookedTickets(req.params.busId);
    let statusObj = {};
    const unbookedSeats = []
    let windowSeats = 0

    for (let i = 0; i < seats.length; i++) {
      for (let j = 0; j < seats[i].length; j++) {
        if (!allBookedSeats.includes(seats[i][j])) {
          unbookedSeats.push(seats[i][j])
          if(seats[i][j].charAt(seats[i][j].length-1) === "A" || seats[i][j].charAt(seats[i][j].length-1) === "D" ){
            windowSeats+=1
          }
        }
      }
    }
    statusObj= {unbookedSeats,windowSeats}
    return res.status(200).json(statusObj);
  } catch (err) {
    res.status(500).json("server Error");
  }
};

const resetBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.busId);
    if (!bus) {
      return res.status(400).json({ msg: "there is no such bus" });
    }
    await Tickets.deleteMany({ busId: req.params.busId })

    res.status(200).json({msg:"bus reset is done successfully"})

  } catch (err) {
    res.status(500).json({msg:"server error"})
  }
};

module.exports = { addBus, searchBuses, getBus, getBusStatus, resetBus, deleteBus };
