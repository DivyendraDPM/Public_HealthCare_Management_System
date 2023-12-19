const Patient = require("../models/patient");
const Appointment = require("../models/appointment");

module.exports.search_patient = async (req, res) => {
  const healthID = req.params.healthID;
  try {
    const patient = await Patient.findOne({ healthID });
    res.status(200).json({ patient });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..." });
  }
};

module.exports.get_doctor = async (req, res) => {
  let doctor = req.doctor;
  let query = ""
  if(doctor.name.middleName!==""){
    query = doctor.name.firstName +  doctor.name.middleName + doctor.name.surName;
  }
  else{
    query = doctor.name.firstName + doctor.name.surName;
  }
  const appointment = await Appointment.find();
  const filteredAppointments = appointment.filter(appointments => appointments.docName === query);
  console.log(filteredAppointments);
  console.log(query);
  console.log(query.length);
  res.status(200).json({ doctor,filteredAppointments });
};

module.exports.get_appointments = async (req,res) => {
  console.log(req.body);
}

module.exports.save_appointment_status = async(req,res) => {
  console.log(JSON.stringify(req.body));
  const appointment = await Appointment.findByIdAndUpdate({_id: req.body.id}, { status: req.body.status });
  // console.log(appointment);
  res.status(200).json({appointment});
}