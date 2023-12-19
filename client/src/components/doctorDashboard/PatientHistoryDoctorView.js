import Footer from "../landingPage/Footer";
import doctor_profile from "../../assets/img/dashboard/doctor2.png";
import PatientHistoryCompoDoctorView from "./PatientHistoryCompoDoctorView";
import { useEffect, useState, createContext } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import Modal from "../modal";

import { Hidden } from "@material-ui/core";

export const AppointmentContext = createContext();

const PatientHistory = (props) => {
  const navigate = useNavigate();
  const [dob, setDob] = useState("01/01/2006");
  const [modal, setModal] = useState(false);
  const [doctor, setDoctor] = useState({
    name: {
      firstName: "",
      middleName: "",
      surName: "",
    },
    address: "",
    specialization: "",
    consultationFee: "",
    email: "",
    password: "",
  });  
  const [doctorModel, setDoctorModel] = useState([{
    healthID: "",
    symptoms: [],
    prediction: "",
    docName: "",
    date: "",
    _id:"",
    status: ""
  }]);
  // console.log(doctorModel);
  const [prescriptions, setPrescriptions] = useState([{}]);
  const[rowId, setRowId] = useState("");
  // const test = {}
  // setTest("Hello");

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  let querystring = "";
      

  useEffect(() => {
    async function getdoctor() {
      const res = await fetch("/getdoctor");
      const data = await res.json();
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to Proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        setDoctor(data.doctor);
        setDoctorModel(data.filteredAppointments);
      }
    }
    
    getdoctor();
  }, [dob]);
  console.log(doctorModel);

  const AppointmentStatus = async event => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: event.currentTarget.id,
        id: doctorModel[rowId]._id
      }),
    };
    const response = await fetch("/doctor/saveappointmentstatus",options);
    const result = await response.json();
    if(result){
      setModal(false);
      window.location.reload();
    }
  }

  let i = 0;

  function getRowId(event) {
    let rowId = event.target.parentNode.parentNode.id;
    setRowId(rowId);
    setModal(true);
  }

  const[selectedDate, setSelectedDate] = useState(new Date);
  

  
  let hashMap = new Map();
  hashMap.set("Cardiology",["Heart attack","Hypertension"],
  "Neurology",["Migraine","Cervical spondolysis","Paralysis (brain hemorrhage)"],
  "Nephrology",["Hypertension"],
  "Gastroenterology",["GERD","Chronic cholestalsis","Peptic ulcer disease","Gastroenteritis","Jaundice",
  "Hepatitis A","Hepatitis B","Hepatitis C","Hepatitis D","Hepatitis E", "Alcoholic hepatitis"],
  "Gynacology",["Urinary tract infection"],
  "General Medicine",["Allergy","Drug Reaction","AIDS","Malaria","Chicken pox","Dengue","Typhoid","Common cold"],
  "General Surgery",["Chronic Choelstasis","Dimorphic hemmorhoids(piles)"],
  "Paediatrics",["Bronchial Asthma","Chicken pox","Common cold","Hypoglycemia","Impetigo"],
  "E.N.T.",["GERD","(vertigo) Paroymsal Positional Vertigo"],
  "Orthopaedics",["Cervical spondolysis","Osteoarthristis","Arthritis"],
  "Dermatology",["Fungal Infection","Acne","Psoriasis","Impetigo"],
  "Opthamology",["Hypoglycemia"],
  "Physiotherapy",["Cervical spondolysis","Paralysis (brain hemorrhage)","Osteoarthristis","Arthritis"],
  "Dietatics",["Diabetes","GERD","Heart attack"],
  "Urologist",["Urinary tract infection"],
  "Pulmonologist",["Bronchial Asthma","Tuberculosis","Pneumonia"],
  "Allergist",["Fungal Infection","Allergy","Drug Reaction","Acne"],
  "Endocrinology",["Diabetes","Hypothyroidism","Hypoglycemia"],
  "Vascular Surgery",["Varicose veins"],
  "Rheumatology",["Osteoarthristis","Arthritis","Psoriasis"],
  "Hepatology",["Hepatitis A","Hepatitis B","Hepatitis C","Hepatitis D","Hepatitis E", "Alcoholic hepatitis"]
  )

  
    
  return (
    <div className="col-span-10">
      <div className=" px-12">
        <div className="h-screen">
          <div className="font-poppins   mainf">
            {/* <Link to="/patient/profile"> */}
              <div className="flex bg-white rounded shadow  px-4 ml-auto h-14 w-1/5 mr-8 mt-8">
                <img
                  src={doctor_profile}
                  className="w-12 p-1 rounded-2xl"
                  alt="profile"
                ></img>
                <div className="grid grid-rows-2 ml-4 gap-2  mb-4">
                  <div className="mt-1 ml-4  font-bold font-poppins">
                    <h1 className="">
                      {`Dr. ${doctor.name.firstName} ${doctor.name.surName}`}
                    </h1>
                  </div>
                </div>
              </div>
            {/* </Link> */}
            <div className="flex justify-between m-8">
              <div className="font-bold text-2xl ml-4">
                <h1>Appointment Requests</h1>
              </div>
            </div>
            <div className="bg-white m-4 rounded-lg ">
              {/* <Link to="/patient/getdoctor"> */}
                <div id="scroll" style={{ overflowY: "scroll", height: "450px" }} className="grid grid-rows-2 p-6 gap-2 shadow">
                  <table className="pb-2 mb-20 " id="appointment">
                    {/* <div className="grid grid-cols-4 font-bold "> */}
                    <thead>
                      <tr className="text-left pb-10 bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th className="w-40">Health ID</th>
                        <th className="w-64">Predicted Disease</th>
                        <th className="w-72">Symptoms</th>
                        <th className="w-32">Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorModel && doctorModel.map((doctorModel, index) => (
                        <>
                          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700" id={index}>
                            <td>{doctorModel.healthID}</td>
                            <td>{doctorModel.prediction}</td>
                            <td className="w-72">{doctorModel.symptoms.map((item)=>{
                              return (<p className="pr-2">{item}</p>)
                            })}</td>
                            <td>{doctorModel.date.substring(0,10)}</td>
                            <td>{doctorModel.status!=="" ? doctorModel.status :<button onClick={(event) => {
                              getRowId(event)
                            }}
                              type="button"
                              className="btn bg-green-400" id="bookAppointment">Select
                            </button>}</td>
                          </tr>
                        </>
                      ))}

                    </tbody>

                  </table>
                  
                  {prescriptions.length > 0 ? (
                    prescriptions.map((prescription) => {
                      return (
                        <PatientHistoryCompoDoctorView
                          prescription={prescription}
                          setPrescriptionID={props.setPrescriptionID}
                        />
                      );
                    })
                  ) : (
                    <div className="font-bold mt-3 mx-auto">

                    </div>
                  )}
                </div>
              {/* </Link> */}
            </div>
          </div>
        </div>
        {modal && <div className="modalContainer h-24">
            <div className="titleCloseBtn">
                <button
                    onClick={() => {
                        setModal(false);
                    }}
                >
                    X
                </button>
            </div>
            <div className="title">
                <h1 className="text-xl font-bold pb-4">Do you want to Approve or Reject the appointment</h1>
            </div>
            <div className="footer min-h-0">
                <button
                    onClick={() => {
                        setModal(false);
                    }}
                    id="cancelBtn"
                >
                    Cancel
                </button>
                <button className="btn bg-green-400"
                  onClick={(event) => {
                    AppointmentStatus(event)
                  }}
                  id="approved"
                  >Approve</button>
                <button
                  onClick={(event) => {
                    AppointmentStatus(event);
                  }}
                  id="rejected"
                  >Reject</button>
            </div>
        </div> }
      </div>
      <div className="-mt-20 mb-0">
        <Footer></Footer>
      </div>
      
    </div>
  );
};

export default PatientHistory;
