const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const   { searchLocation } = require('../controllers/getAllLocations')

router.get('/getLocations',searchLocation)



module.exports = router;
