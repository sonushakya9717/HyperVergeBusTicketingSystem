const Bus = require("../models/Buses");
const Tickets = require("../models/Tickets");
const { validationResult } = require("express-validator");
const { allBookedTickets } = require("../utils/allBookedTickets");
const nodemailer = require("nodemailer");
const config = require('config');
const user = config.get('user');
const pass = config.get("pass");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass
  }
});


const bookTickets = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { seats_no, passengers, journeyDate, email,from,to, contactNo } = req.body;
  const createTicket = {
    seats_no,
    passengers,
    journeyDate,
    contactNo,
    from,
    to
  };

  try {
    const bus = await Bus.findById(req.params.busId);
    if (!bus) {
      return res.status(400).json({ msg: "there is no such bus found" });
    }
    let seats = bus.seats;

    const allBookedSeats = await allBookedTickets(req.params.busId);
    if (isOutOfRange(seats_no, seats)) {
      return res.status(400).json({ msg: "No such seats are available in the bus" });
    }
    let isBooked;

    isBooked = seats_no.filter((bookedSeat) => {
      return allBookedSeats.includes(bookedSeat);
    });

    if (isBooked.length > 0) {

      return res.status(400).json({ msg: "seats are already booked" });
    }

    createTicket.userId = req.user.id;
    createTicket.busId = bus._id;
    const generateTicket = new Tickets(createTicket);
    await generateTicket.save();

//     var mailOptions = {
//       from: 'kartik19@navgurukul.org',
//       to: `${email}`,
//       subject: "Tickets Status",
//       html: `<p>Hello Deepak</p>
//       <p> Your Ticket Detail </p>
//       <div> 
//         <Card className="container p-5">
//         <Table bordered size="sm">
//           <tbody>
//             <tr>
//               <td colSpan="2">
//                 <b> From </b>New Delhi, Delhi
//               </td>
//             </tr>
//              <tr>
//               <td colSpan="2">
//                <b> to </b> Dharamshala, Himachal pradesh
//               </td>
//             </tr>
//             <tr>
//               <td><b> Date of journey</b> </td>
//               <td>5/8/2021</td>
//             </tr>
//             <tr>
//               <td><b>Bus Name and Type</b></td>
//               <td>Pucchi Travels semi sleeper AC bus</td>
//             </tr>
//             <tr>
//               <td><b>Passenger Name</b></td>
//               <td>Kartik</td>
//             </tr>
//             <tr>
//               <td><b>Phone Number</b></td>
//               <td>1236547891</td>
//             </tr>
//             <tr>
//               <td><b>Seat Number</b></td>
//               <td>1A</td>
//             </tr>
//             <tr>
//               <td><b>Total Fare</b></td>
//               <td>500</td>
//             </tr>
//             <tr>
//               <td><b>Bus Number</b></td>
//               <td>DL 1004 </td>
//             </tr>
//             <tr>
//               <td><b>Departure Timing</b></td>
//               <td>9PM</td>
//             </tr>
//           </tbody>
//         </Table>
//       </Card>
//         </div>
// `
//     };

    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error,"error")
    //     return res.status(400).json({msg:"error"})
    //   } else {
    //     console.log('Email sent successfully: ');
    //     return res.status(200).json(generateTicket);
    //   }
    // });
    return res.status(200).json(generateTicket);
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
};




const isOutOfRange = (selected_seats, seats) => {
  var flag = true;
  for (let i = 0; i < selected_seats.length; i++) {
    for (let j = 0; j < seats.length; j++) {
      if (seats[j].includes(selected_seats[i])) {
        flag = false;
        break;
      } else {
        flag = true;
      }
    }
  }
  return flag;
};

const cancelTickets = async (req, res) => {
  try{
    const ticket =await Tickets.findOne({_id:req.params.ticketId,userId:req.user.id})
    if(!ticket){
    return res.status(400).json({msg:"ticket not found"})
    }
    await Tickets.findOneAndDelete({_id:req.params.ticketId})
    return res.status(200).json({msg:"ticket cancelled successfuly"})
  }catch(err){
    return res.status(500).json({msg:"server error"})
  }
}


const getTickets = async(req, res, next) => {
  const tickets = await Tickets.find({ userId: req.user.id }).populate('busId',['vehicleNo','departureTime']);
  if (!tickets.length) {
      return next({ status: 400, errors: "You have not booked any ticket" });
  }

  console.log(tickets);
  res.status(200).json(tickets);
};


module.exports = { bookTickets, cancelTickets, getTickets };
