const { validationResult } = require("express-validator");
const Agency = require("../models/Agency");
const Staffs = require("../models/Staffs");

const addStaff = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { phone, name, address, isDriver } = req.body;
  const staffData = { phone, name, address, isDriver };
  staffData.adminId = req.user.id;
  try {
    let agencyProfile = await Agency.findOne({ agent: req.user.id });
    if (agencyProfile) {
      let staff = await Staffs.findOne({ phone: phone });
      if (staff) {
        return res.status(400).json({ msg: "This staff is already exists" });
      }
      staff = new Staffs({
        ...staffData,
      });

      await staff.save();
      res.status(200).json(staff);
    } else {
      return res.status(404).json({ msg: "No agency found of current admin" });
    }
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};

const getStaffs = async(req,res) =>{
  try {
    const staffs = await Staffs.find({adminId:req.params.adminId})
    if(staffs.length === 0){
      return res.status(400).json({ msg: "No Staff Found" });
    }
    res.status(200).json(staffs)
} catch (err) {
    res.status(500).send("server error");
}
}

const deleteStaff = async(req,res) =>{
  try {
      const staff = await Staffs.findOneAndDelete({ _id: req.params.staffId})
      if(!staff){
         return res.status(400).json({msg:"No such staff found"})
      }
      return res.status(200).json({msg:"staff deleted succesfully"})
      }
      catch (err) {
        console.error(err)
      return res.status(500).json({msg:"Server error"});
    }
  };

module.exports = { addStaff, getStaffs,deleteStaff };
