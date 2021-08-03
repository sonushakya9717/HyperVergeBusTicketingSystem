const Agency = require("../models/Agency");
const Staffs = require('../models/Staffs');
const Buses = require('../models/Buses')
const { validationResult } = require("express-validator");



const getAgency = async (req, res) => {
  try {
    const agency = await Agency.findOne({ agent: req.user.id }).populate(
      "agent",
      ["name", "email"]
    );
    if (!agency) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    return res.status(200).json(agency);
  } catch (err) {
    return res.status(500).json({msg:"Server error"});
  }
};



const createAgency = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { phone, agencyName, headOfficeLocation } = req.body;

  /// profile object

  const agencyFields = { phone, agencyName, headOfficeLocation };
  agencyFields.agent = req.user.id;

  try {
    let agencyProfile = await Agency.findOne({ agent: req.user.id });
    if (agencyProfile) {
      // Update needed
      agencyProfile = await Agency.findOneAndUpdate(
        { agent: req.user.id },
        { $set: agencyFields },
        { new: true }
      );
      return res.status(200).json(agencyProfile);
    }

    // Need to create
    
    agencyProfile = new Agency(agencyFields);
    await agencyProfile.save();
    res.status(200).json(agencyProfile);
  } catch (err) {
    res.status(500).json({msg:"Server Error"});
  }
};


const deleteAgency = async(req,res) =>{
  try {
      const agency = await Agency.findOneAndDelete({ agent: req.user.id})
      if(!agency){
         return res.status(400).json({msg:"No such Agency found"})
      }
      await Buses.deleteMany({agency:agency.adminId})
      await Staffs.deleteMany({ adminId:agency.adminId });
      return res.status(200).json({msg:"agency deleted succesfully"})
      }
      catch (err) {
        console.error(err)
      res.status(500).json({msg:"Server error"});
    }
  };


module.exports = { getAgency, createAgency, deleteAgency };
