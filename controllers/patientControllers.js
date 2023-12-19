const Patient = require("../models/patient");
const Prediction = require("../models/predictions");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
const { model } = require("mongoose");

let prediction = "";
let docFilter = [];
let hID = "";

module.exports.preview_prescription = async (req, res) => {
  const id = req.params.id;
  const healthID = req.patient.healthID;
  try {
    const patient = await Patient.findOne({ healthID });
    const prescription = patient.prescriptions.filter((pres) => pres._id == id);
    res.status(200).json({ prescription });
  } catch (err) {
    res.status(404).json({ error: "Something went wrong..." });
  }
};

module.exports.get_patient = async (req, res) => {
  let patient = req.patient;
  hID = patient.healthID;
  let appointment = await Appointment.find({healthID: hID});
  // console.log(appointment);
  res.status(200).json({ patient,appointment });
};
module.exports.save_prediction = async (req, res) => {
  const healthID = req.body.healthID;
  const symptoms = req.body.Symptom;
  prediction = req.body.Prediction;
  // console.log(req.body);
  const date = new Date();
  let dateString = date.toString();
  try {
    const userPrediction = Prediction.create({"healthID":req.body.healthID,
    "symptoms":req.body.Symptom,
    "prediction":req.body.Prediction,
    "date": dateString
  })
    res.status(200).json({userPrediction});
  } catch (err) {
    res.status(404).json({ error: "Something went wrong..." });
  }
};

let hashMap = new Map();
  hashMap.set("Cardiology",["Heart attack","Hypertension"]);
  hashMap.set("Neurology",["Migraine","Cervical spondylosis","Paralysis (brain hemorrhage)"]);
  hashMap.set("Nephrology",["Hypertension"]);
  hashMap.set("Gastroenterology",["GERD","Chronic cholestalsis","Peptic ulcer disease","Gastroenteritis","Jaundice",
  "Hepatitis A","Hepatitis B","Hepatitis C","Hepatitis D","Hepatitis E", "Alcoholic hepatitis"])
  hashMap.set("Gynacology",["Urinary tract infection"])
  hashMap.set("General Medicine",["Allergy","Drug Reaction","AIDS","Malaria","Chicken pox","Dengue","Typhoid","Common cold"])
  hashMap.set("General Surgery",["Chronic Choelstasis","Dimorphic hemmorhoids(piles)"]);
  hashMap.set("Paediatrics",["Bronchial Asthma","Chicken pox","Common cold","Hypoglycemia","Impetigo"]);
  hashMap.set("E.N.T.",["GERD","(vertigo) Paroymsal Positional Vertigo"]);
  hashMap.set("Orthopaedics",["Cervical spondylosis","Osteoarthristis","Arthritis"]);
  hashMap.set("Dermatology",["Fungal infection","Acne","Psoriasis","Impetigo"]);
  hashMap.set("Opthamology",["Hypoglycemia"]);
  hashMap.set("Physiotherapy",["Cervical spondylosis","Paralysis (brain hemorrhage)","Osteoarthristis","Arthritis"]);
  hashMap.set("Dietatics",["Diabetes","GERD","Heart attack"]);
  hashMap.set("Urologist",["Urinary tract infection"]);
  hashMap.set("Pulmonologist",["Bronchial Asthma","Tuberculosis","Pneumonia"]);
  hashMap.set("Allergist",["Fungal infection","Allergy","Drug Reaction","Acne"]);
  hashMap.set("Endocrinology",["Diabetes","Hypothyroidism","Hypoglycemia"]);
  hashMap.set("Vascular Surgery",["Varicose veins"]);
  hashMap.set("Rheumatology",["Osteoarthristis","Arthritis","Psoriasis"]);
  hashMap.set("Hepatology",["Hepatitis A","Hepatitis B","Hepatitis C","Hepatitis D","Hepatitis E", "Alcoholic hepatitis"]);



module.exports.get_doctor = async (req, res) => {
  let doctor = await Doctor.find().exec();
  let allPrediction = await Prediction.find({healthID: hID});
  if(allPrediction.length===0){
    const doctorFilter = doctor;
    res.status(200).json({ doctorFilter });
  }
  else{
    let specialityFilter = [];
  hashMap.forEach((values,keys)=>{
    if(values.includes(prediction)){
      specialityFilter.push(keys);
    }
  })
  if(specialityFilter === "" || specialityFilter.length===0){
    const doctorFilter = doctor;
    res.status(200).json({ doctorFilter });
  }
  else{
    if(specialityFilter.length === 1){
      const doctorFilter = doctor.filter(doctor => doctor.specialization === specialityFilter[0]);
      res.status(200).json({ doctorFilter });
    }
    else{
      let doctorFilter = [];
      for(let i=0;i<specialityFilter.length;i++){
        let finalFilter = doctor.filter(doctor => doctor.specialization === specialityFilter[i]);
          for(let i=0;i<finalFilter.length;i++){
            doctorFilter.push(finalFilter[i]);
          }
      }
      res.status(200).json({ doctorFilter });
    }
  }
  }
  
  
};
module.exports.get_appointment_details = async (req, res) => {
  // console.log(req.params);
  let appointment = await Prediction.find({healthID: req.params.id}).sort({_id: -1}).limit(1);
  // console.log(appointment);
  res.status(200).json({ appointment });
};
module.exports.save_appointment = async(req,res) =>{
  // console.log(req.body);
  let drname = req.body.docName.replace(/\s/g,'');
  let appointment = await Appointment.create({
    healthID: req.body.doctorModel.healthID,
    symptoms: req.body.docSymp,
    prediction: req.body.doctorModel.prediction,
    docName: drname,
    date: req.body.selectedDate,
    status: ""
  });
  if(appointment){
    res.status(200).json(appointment);
  }
  else{
    res.status(500);
  }
  
};