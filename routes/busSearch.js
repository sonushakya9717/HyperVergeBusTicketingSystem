const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const { searchBuses,getBus, getBusStatus,deleteBus } = require('../controllers/Buses')
const { bookTickets } = require('../controllers/tickets')
const { check } = require('express-validator');
const isAdmin = require('../middlewares/isAdmin');


//private route
// POST  api/buses
// @ desc search buses by source and destination
router.post("/",[auth,
    [
        check("source", "Source location is required").not().isEmpty(),
        check("destination", "Destination location is required").not().isEmpty(),
        check("date","Travel Date is required").not().isEmpty()
    ]],
    searchBuses
);


//private route
// get  api/buses/:adminId
// @ desc search buses by adminId
router.get("/:adminId",auth,isAdmin,
    getBus
);


//private route
// delete  api/buses/:busId
router.delete("/:busId",auth,isAdmin,
deleteBus
);


//private route
// get  api/buses/:busId/status
// @ desc get bus status by busId
router.get("/:busId/status",auth,getBusStatus)


//private route
// get  api/buses/:busId/ticket
// @ desc book tickets from a particular bus
router.post("/:busId/tickets",[auth,[
    check("seats_no", "seats are required").not().isEmpty(),
    check("passengers", "passengers are required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("contactNo", "contact number is required").isInt()
    .isLength({ min: 10, max:10 })

]],
bookTickets
);






module.exports = router;