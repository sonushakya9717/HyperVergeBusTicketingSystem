const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
const { getAgency, createAgency, deleteAgency} = require('../controllers/admins');
const {addBus, resetBus} =require('../controllers/Buses')
const { addStaff, getStaffs, deleteStaff } = require('../controllers/staffs');
const {addLocation} = require('../controllers/addLocation');
const Staff = require('../models/Staffs')
const { check, validationResult } = require('express-validator')

// Get @route api/admins/agency
// Get the current admin agency profile
// private route
router.get('/agency', auth,isAdmin,getAgency );

// Get @route api/admins/admin/:adminId/staffs
// Get the current admin staffs
// private route
router.get('/:adminId/staffs', auth,isAdmin,getStaffs );

// delete @route api/admins/admin/:staffId
// private route
router.delete('/:staffId', auth,isAdmin,deleteStaff );

// delete @route api/admins/agencies/:agencyId
// Get the current admin agency profile
// private route
router.delete('/agency', auth,isAdmin,deleteAgency );


// POST @route api/admins/agency
// create the current admin agency profile
// private route
router.post('/addAgency', [auth,isAdmin, [
    check('phone', 'Phone number is required')
    .isInt()
    .isLength({ min: 10, max:10 }),
    check('agencyName', 'Agency name is required')
        .not()
        .isEmpty(),
    check('headOfficeLocation', 'Location of the agency situated is required')
    .not()
    .isEmpty()
]], createAgency)



// POST /api/admins/admin/location
router.post("/location",[auth,isAdmin,
    [
        check("city", "City is required").not().isEmpty(),
        check("state", "State is required").not().isEmpty()
    ]],
    addLocation
);


// POST /api/admins/admin/newbus
// Create or Update a bus
// Private Route 
router.post('/addBus',[auth,isAdmin, [
    check('busName', 'Bus name is required')
    .not()
    .isEmpty(),
    check('vehicleNo', 'vehicle number is required')
    .not()
    .isEmpty(),
    check('seats', 'Address of the staff is required')
    .isInt()
    .not()
    .isEmpty(),
    check('driver', 'driver should be inserted')
    .not()
    .isEmpty(),
    check('helper', 'helper should be inserted')
    .not()
    .isEmpty(),
    check('policy', 'policy should be inserted')
    .not()
    .isEmpty(),
    check('images', 'images should be inserted')
    .not()
    .isEmpty(),
    check('from', 'boarding point of the bus is required')
    .not()
    .isEmpty(),
    check('to', 'dropping point of the bus is required')
    .not()
    .isEmpty(),
    check('arrivalTime', 'arrivalTime of the bus is required')
    .not()
    .isEmpty(),
    check('departureTime', 'departureTime of the bus is required')
    .not()
    .isEmpty()
]],addBus)



// POST @route api/admins/
router.post('/addStaff',[auth,isAdmin, [
    check('phone', 'Phone number is required')
    .isInt()
    .isLength({ min: 10,max: 10 }),
    check('name', 'Agency name is required')
        .not()
        .isEmpty(),
    check('address', 'Address of the staff is required')
    .not()
    .isEmpty(),
    check('isDriver', 'Position is required')
    .isBoolean()
]],addStaff)



// Delete route api/admins/admin/:busId
// @desc Admin can reset the bus by deleting all the booked tickets.
router.delete('/:busId',auth,isAdmin,resetBus)

module.exports = router;
