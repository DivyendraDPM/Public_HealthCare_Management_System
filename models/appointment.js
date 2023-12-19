const mongoose = require("mongoose");
const prescriptionSchema = require("./prescription");
const res = require("express/lib/response");

const appointmentSchema = new mongoose.Schema({
healthID: {
    type: String,
},
symptoms: {
    type: Array
},
prediction:{
    type: String
},
docName:{
    type: String
},
date:{
    type: Date
},
status:{
    type: String
}
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
