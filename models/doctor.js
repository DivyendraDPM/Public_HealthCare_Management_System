const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const doctorSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: [true, "Please enter full Name"],
    },
    middleName: {
      type: String,
    },
    surName: {
      type: String,
      required: [true, "Please enter full Name"],
    },
  },
  address:{
    type: String
  },
  specialization: {
    type: String
  },
  consultationFee: {
    type: String
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    // unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [8, "Minimum length of password should must be 8 characters"],
  },
});

doctorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

doctorSchema.statics.login = async function (email, password) {
  const doctor = await this.findOne({ email });
  if (doctor) {
    const auth = await bcrypt.compare(password, doctor.password);
    if (auth) {
      return doctor;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Invalid email");
};

const Doctor = mongoose.model("doctor", doctorSchema);

module.exports = Doctor;
