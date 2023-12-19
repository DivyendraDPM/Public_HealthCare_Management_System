var querystring = require("querystring");
const {getPrediction} = require("../machinelearning/childProcess");
const {spawn} = require('child_process');
const { Router } = require("express");
const cors = require('cors');
const express = require('express');
const {
  preview_prescription,
  get_patient,
  save_prediction,
  get_doctor,
  get_appointment_details,
  save_appointment
} = require("../controllers/patientControllers");
const { requirePatientAuth } = require("../middlewares/patientAuthMiddleware");
var bodyParser = require('body-parser');
var disease;
const router = Router();
router.get("/prescription/:id", requirePatientAuth, preview_prescription);
router.get("/getpatient", requirePatientAuth, get_patient);
router.get("/patient/history/getdoctor", requirePatientAuth, get_doctor);
router.get("/patient/appointment/:id",requirePatientAuth, get_appointment_details);

router.post("/patient/manualsym/sendsymptoms",(req,res) => {
  
  const body = {healthID:req.body.healthID,
    Symptom:req.body.Symptom,
    Algorithm:req.body.Algorithm
  };
  var result = querystring.stringify(body);
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Content-Type","application/json");

 var show= res.redirect("http://localhost:4000/childprocess?"+result);
 console.log(show)
 console.log(typeof(show))
});
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}
router.get("/childprocessresult?", cors(corsOptions), (req, res) => {  
  disease =  Object.keys(req.query)[0];
  disease.replace(/\s/g,'');
  console.log(typeof(disease));
});
router.post("/patient/manualsym/getdisease",(req,res) => {
  console.log(disease);
  res.send(disease); 
});
router.post("/patient/saveprediction",requirePatientAuth,save_prediction);
router.post("/doctor/appointment",requirePatientAuth,save_appointment);
module.exports = disease;
module.exports=router;
