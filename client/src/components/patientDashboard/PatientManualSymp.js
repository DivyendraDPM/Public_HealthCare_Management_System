import Footer from "../landingPage/Footer";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import PatientHistoryCompo from "./PatientHistoryCompo";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import patient_dashboard from "../../pages/PatientDashboard";
import { Navigate } from 'react-router-dom';

var querystring = require("querystring");
const PatientManualSymp = (props) => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [healthID, setID] = useState();
  const [Symptom, setSymptom] = useState([]);
  const [Prediction5, setPrediction5] = useState("");
  const [dob, setDob] = useState("01/01/2006");
  const [patient, setPatient] = useState({
    name: {
      firstName: "",
      middleName: "",
      surName: "",
    },
  });

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    async function getpatient() {
      const res = await fetch("/getpatient");
      const data = await res.json();
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        setPatient(data.patient);
        setDob(convertDatetoString(patient.dob));
        setID(patient.healthID);
      }
    }
    getpatient();
  }, [dob]);

  function SendToAppointments(ultimate_result) {
    // const options = {
    //   method: "POST",
    // };
    // const history = useHistory();
    // const response = fetch(`/patient/history/${ultimate_result}`);
    // history.push(`/patient/history/${ultimate_result}`)
    // return (
    //   <BrowserRouter>
    //   <Routes>
    //     <Route path="/patient/history/:id" element={patient_dashboard id = {ultimate_result}}/>
    //   </Routes>
    // </BrowserRouter>
    // );
  }

  const patientSymptomFetch = async event => {
    if (event) event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        healthID,
        Symptom,
        Algorithm: event.currentTarget.id
      }),
    };
    const body = {
      "healthID": healthID,
      "Symptom": Symptom,
      Algorithm: event.currentTarget.id
    }
    try {

      var result = querystring.stringify(body);
      const response = await fetch("http://localhost:4000/childprocess?" + result);
      var result1 = await response.json()
      var algo = result1.result.split(":")[1];
      console.log(algo);
      var algo1 = algo.substring(1, algo.length);
      console.log(algo1);
      var final_result = result1.result.split(":")[2];
      var ultimate_result = final_result.substring(0, final_result.length - 6);
      console.log(body.Algorithm);
      setPrediction5(ultimate_result);
      if (response.ok) {
        console.log("response ok");
      } else {
        console.log("response NOT ok");
      }
      setTimeout(function () {
        if (window.confirm('Do you wish to book an appointment?')) {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              healthID,
              Symptom,
              "Prediction": ultimate_result
            }),
          };
          const response =  fetch("/patient/saveprediction", options);
          console.log(response.json);
          setTimeout(function ()
          // {SendToAppointments(ultimate_result)}
          {window.location.pathname = "/patient/history"}
          ,1000);
          
        }
        else {
          console.log("no")
        }
      }, 3000);
    }
    catch { }
  }

  useEffect(() => { getdisease() }, []);
  async function getdisease() {
    await axios("/patient/manualsym/getdisease")
      .then((response) => {
        console.log('hello');
      })
      .catch((error) => {
        console.log("error");
      })
      .finally(() => {
        setLoading(false);
      })
  }
  const data = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'];

  return (
    <div className="col-span-10">
      <div className=" px-12">
        <div className="h-screen">
          <div className="font-poppins   mainf">
            <Link to="/patient/profile">
              <div className="flex bg-white rounded shadow  px-4   ml-auto h-14 w-1/5 mr-8 mt-8">
                <img
                  src={patient_profile}
                  className="w-12 p-1 rounded-2xl"
                  alt="profile"
                ></img>
                <div className="grid grid-rows-2 ml-4 gap-2  mb-4">
                  <div className="mt-2 ml-4  font-bold font-poppins">
                    <h1 className="ml-2">
                      {`${patient.name.firstName} ${patient.name.surName}`}
                    </h1>
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex justify-between m-8">
              <div className="font-bold text-2xl ml-2">
                <h1>Disease Prediction</h1>
              </div>
            </div>
            <div className="bg-white m-4 rounded-lg ">
              <div className="grid grid-rows-2 p-6 gap-6 shadow font-bold">
                <form className="symptomForm">
                  <div className="">
                    <div className="flex justify-center grid grid-cols-2 my-2">
                      <label className="text-right mr-6">
                        Symptom 1
                      </label>
                      <select className="w-64 ml-6 pl-2" id="drop1" onChange={(e) => {
                        Symptom.push(e.target.value);
                        setSymptom(Symptom);
                      }}>
                        {
                          data.map(opt => <option>{opt}</option>)
                        }
                      </select>
                    </div>

                    <div className="grid grid-cols-2 my-2">
                      <label className="text-right mr-6 ">
                        Symptom 2
                      </label>
                      <select className="w-64 ml-6 pl-2" id="drop2" onChange={(e) => {
                        Symptom.push(e.target.value);
                        setSymptom(Symptom);
                      }}>
                        {
                          data.map(opt => <option>{opt}</option>)
                        }
                      </select>
                    </div>

                    <div className="grid grid-cols-2">
                      <label className="text-right mr-6">
                        Symptom 3
                      </label>
                      <select className="w-64 ml-6 pl-2" id="drop3" onChange={(e) => {
                        Symptom.push(e.target.value);
                        setSymptom(Symptom);
                      }}>
                        {
                          data.map(opt => <option>{opt}</option>)
                        }
                      </select>
                    </div>

                    <div className="grid grid-cols-2 my-2">
                      <label className="text-right mr-6">
                        Symptom 4
                      </label>
                      <select className="w-64 ml-6 pl-2" id="drop4" onChange={(e) => {
                        Symptom.push(e.target.value);
                        setSymptom(Symptom);
                      }}>
                        {
                          data.map(opt => <option>{opt}</option>)
                        }
                      </select>
                    </div>

                    <div className="grid grid-cols-2">
                      <label className="text-right mr-6">
                        Symptom 5
                      </label>
                      <select className="w-64 ml-6 pl-2" id="drop5" onChange={(e) => {
                        Symptom.push(e.target.value);
                        setSymptom(Symptom);
                      }}>
                        {
                          data.map(opt => <option>{opt}</option>)
                        }
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 pt-6">

                  </div>
                  <div className="grid grid-col-1 justify-center pt-6 ">
                    <button onClick={patientSymptomFetch}
                      type="button"
                      className="finalPredict btn bg-green-400 text-xl" id="Ensemble">Get Prediction
                    </button>
                    <div className="text-center text-2xl mt-2">{Prediction5}</div>
                  </div>

                  <div className="grid grid-col-1 justify-center mt-3 mb-6">
                    <button className="finalPredict btn bg-red-400">Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-20 mb-0">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default PatientManualSymp;
