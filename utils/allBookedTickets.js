const Tickets = require("../models/Tickets")


const allBookedTickets = async (busId) => {
  let tickets = await Tickets.find({ busId });

  tickets = tickets.map((ticket) => ticket.seats_no);

  let allBookedSeats = [].concat.apply([], tickets);

  return allBookedSeats
};

module.exports = { allBookedTickets };
