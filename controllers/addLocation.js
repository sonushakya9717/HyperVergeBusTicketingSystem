const { validationResult } = require("express-validator");
const Location = require("../models/Locations");
const {locationSearch} = require('../utils/searchLocation')

const addLocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { city, state } = req.body;
    try {
        let location = await locationSearch({city, state})
        if(location){
            return res
                .status(400)
                .json({ errors: "Location Already Exists" });
        }
        location = new Location({
            city,
            state,
        });
        await location.save();
        return res.status(200).json({msg:"Location Added Succesfully!!"})
    } catch (err) {
        console.error(err);
        return res.status(500).send("server error");
    }
};


module.exports = {addLocation};