const mongoose = require("mongoose");
const prescriptionSchema = require("./prescription");
const res = require("express/lib/response");

const predictionSchema = new mongoose.Schema({
healthID: {
       type: String,
},
symptoms: {
    type: Array
},
prediction:{
    type: String
},
date:{
    type: Date
}
});

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;
