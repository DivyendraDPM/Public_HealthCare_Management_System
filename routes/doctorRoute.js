const { Router } = require("express");
const { requireDoctorAuth } = require("../middlewares/doctorAuthMiddleware");
const {
  doctor_login,
  doctor_register,
} = require("../controllers/doctorAuthControllers");
const {
  add_prescription,
  view_prescription,
} = require("../controllers/prescriptionControllers");
const { requireAdminAuth } = require("../middlewares/adminAuthMiddleware");
const {
  search_patient,
  get_doctor,
  get_appointments,
  save_appointment_status
} = require("../controllers/doctorControllers");

const router = Router();

router.post("/register/doctor", requireAdminAuth, doctor_register);
router.post("/login/doctor", doctor_login);
router.post("/prescription/:healthID", requireDoctorAuth, add_prescription);
router.get("/searchpatient/:healthID", requireDoctorAuth, search_patient);
router.get(
  "/viewprescription/:healthID/:id",
  requireDoctorAuth,
  view_prescription
);
router.get("/getdoctor", requireDoctorAuth, get_doctor);
router.get("/doctor/history/getappointment/:id", requireDoctorAuth, get_appointments);
router.post("/doctor/saveappointmentstatus",requireDoctorAuth,save_appointment_status);

module.exports = router;
