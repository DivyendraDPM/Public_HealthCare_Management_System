const Doctor = require("../models/doctor");
const { createToken } = require("../utils/createToken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
module.exports.doctor_register = async (req, res) => {
  // const education = Object.values(req.body.education);
  // const specialization = Object.values(req.body.specialization);
  const {
    name,
    address,
    specialization,
    consultationFee,
    email,
    password
  } = req.body;
  try {
    const doctor = await Doctor.create({
      name,
      address,
      specialization,
      consultationFee,
      email,
      password,
    });

    res.status(200).json({ doctor });
  } catch (err) {
    res.status(404).json({ err });
  }
};

module.exports.doctor_login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const doctor = await Doctor.findOne({ email: email });
    if (doctor) {
      const result = await bcrypt.compare(password, doctor.password);
      // const result = doctor.password === password;
      if (result) {
        const token = createToken(doctor._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ doctor });
      }
      else {
        res.status(404).json({ err });
      }
    }
    else {
      res.status(404).json({ err });
    }
  } catch (err) {
    res.status(404).json({ err });
  }
};
