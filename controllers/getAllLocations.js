const Location = require("../models/Locations");

const searchLocation = async (req, res) => {
    try {
        const locations = await Location.find()
        res.status(200).json(locations)
    } catch (err) {
        console.error(err);
        res.status(500).send("server error");
    }
};


module.exports = {searchLocation};