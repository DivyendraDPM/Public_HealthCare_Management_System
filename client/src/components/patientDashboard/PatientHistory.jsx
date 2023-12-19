import Footer from "../landingPage/Footer";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import PatientHistoryCompo from "./PatientHistoryCompo";
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
  const [doctor, setDoctor] = useState([{
    name: {
      firstName: "",
      middleName: "",
      surName: ""
    },
    address: "",
    specialization: [],
    consultationFee: ""
  }]);
  const [patient, setPatient] = useState({
    name: {
      firstName: "",
      middleName: "",
      surName: "",
    },
    dob: "",
    mobile: "",
    email: "",
    adharCard: "",
    bloodGroup: "",
    address: {
      building: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
    },
    password: "",
    diseases: [{ disease: "", yrs: "" }],
    contactPerson: {
      name: {
        firstName: "",
        surName: "",
      },
      mobile: "",
      email: "",
      relation: "",
      address: {
        building: "",
        city: "",
        taluka: "",
        district: "",
        state: "",
        pincode: "",
      },
    },
  });

  const [doctorModel, setDoctorModel] = useState({
    healthID: "",
    prediction: ""
  });
  const [docSymp, setDocSymp] = useState([])
  const [docName, setDocName] = useState("")
  // console.log(doctorModel);
  const [prescriptions, setPrescriptions] = useState([{}]);
  // const test = {}
  // setTest("Hello");

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
        if (data.patient.prescriptions) {
          setPrescriptions(data.patient.prescriptions.reverse());
        }
        setDob(convertDatetoString(patient.dob));
      }
    }
    getpatient();
  }, [dob]);

  useEffect(() => {
    async function getdoctor() {
      const params = new Proxy(new URLSearchParams("http://localhost:3000/patient/history"), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
      let value = params.ultimate_result;
      console.log(value);
      const res = await fetch("/patient/history/getdoctor");
      const data = await res.json();
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        console.log(data.doctorFilter.index);
        setDoctor(data.doctorFilter);
        // for (let i = 0; i < data.doctor.length; i++) {
        //   doctorModel.push(data.doctor[i]);
        // }
        // console.log(doctormodel);
      }
    }
    getdoctor();
  }, [dob]);

  const Appointment = async event => {
    if (event) event.preventDefault();
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        healthID: patient.adharCard
      }),
    };
    const response = await fetch(`/patient/appointment/${patient.adharCard}`,options);
    const modalData = await response.json();
    console.log(modalData.appointment[0]);
    if(modalData.appointment[0]){
      setDoctorModel({
        healthID: modalData.appointment[0].healthID,
        prediction: modalData.appointment[0].prediction
      })
      // docSymp.push()
      setDocSymp(modalData.appointment[0].symptoms);
      console.log(docSymp)
    }
    else{
      setDoctorModel({
        healthID: patient.adharCard,
        prediction: "Not Generated"
      })
      setDocSymp();
    }
  }

  let i = 0;

  function bookButton(){
    // setModal(true);
    Appointment();
    getDocNameFromTr();
  }



  const getDocNameFromTr = async event =>{
    let rowId = event.target.parentNode.parentNode.id;
    let data = document.getElementById(rowId).innerText;
    let drarray = data.split("\t");
    let name = drarray[0];
    const final = name.split("/\s/");
    console.log(final[0]);
    
    setDocName(final[0])
  }

  const[selectedDate, setSelectedDate] = useState(new Date);

  const saveAppointment = async event => {
    if (event) event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctorModel,
        docSymp,
        docName,
        selectedDate
      }),
    };
    const body = {
      "healthID": doctorModel.healthID,
        "symptoms": docSymp,
        "prediction": doctorModel.prediction,
        "docName": docName,
        "date": selectedDate
    }
    const response =  await fetch("/doctor/appointment",options);
    const data = await response.json();
    // console.log(data);
    setModal(false);
    alert("Appointment is redirected to Doctor");
  }

 
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
                <h1>Book an Appointment</h1>
              </div>
            </div>
            <div className="bg-white m-4 rounded-lg ">
              <Link to="/patient/getdoctor">
                <div id="scroll" style={{ overflowY: "scroll", height: "450px" }} className="grid grid-rows-2 p-6 gap-2 shadow">
                  <table className="pb-2 mb-20" id="appointment">
                    {/* <div className="grid grid-cols-4 font-bold "> */}
                    <thead>
                      <tr className="text-left">
                        <th>Doctor's Name</th>
                        <th>Address</th>
                        <th>Specialization</th>
                        <th>Consultation Fee</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <div>{console.log(doctor)}</div> */}
                      {doctor && doctor.map((doctor, index) => (
                        <>
                          <tr id={index}>
                            <td>{doctor.name.firstName}&nbsp;{doctor.name.middleName}&nbsp;{doctor.name.surName}</td>
                            <td>{doctor.address}</td>
                            <td>{doctor.specialization}</td>
                            <td>{doctor.consultationFee}</td>
                            <td> <button onClick={(event) => {
                              // bookButton(event)
                              Appointment()
                              getDocNameFromTr(event)
                              setModal(true)
                            }}
                              type="button"
                              className="btn bg-green-400" id="bookAppointment">Book
                            </button></td>
                          </tr>
                        </>
                      ))}

                    </tbody>

                  </table>
                  

                  {prescriptions.length > 0 ? (
                    prescriptions.map((prescription) => {
                      return (
                        <PatientHistoryCompo
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
              </Link>
            </div>
          </div>
        </div>
        {modal && <div className="modalContainer">
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
                <h1 className="text-xl font-bold pb-4">Appointment Details</h1>
            </div>
            <div className="body">
                <table id="modalTable" className="table-fixed">
                    
                        <tr>
                            <th className="text-left">Patient ID</th>
                            <td className="text-left pl-6 py-2 w-1/2 flex whitespace-nowrap">{doctorModel.healthID}</td>
                        </tr>
                        <tr>
                            <th className="text-left">Symptoms</th>
                            <td className="text-left pl-6 py-2 w-48 flex whitespace-nowrap">{docSymp && docSymp.map((item)=>{
                              return (<p className="pr-4">{item}</p>)
                            })}                            
                            </td>
                        </tr>
                        <tr>
                            <th className="text-left mr-6 whitespace-nowrap">Predicted Disease</th>
                            <td className="text-left pl-6 py-2 flex whitespace-nowrap">{doctorModel.prediction}</td>
                        </tr>
                        <tr>
                            <th className="text-left mr-6">Doctor's Name</th>
                            <td className="text-left pl-6 py-2 flex whitespace-nowrap">{docName}</td>
                        </tr>
                        <tr>
                            <th className="text-left mr-6">Preferred Day</th>
                            <td>
                            <input
                                type="date"
                                className=" bg-blue-100 lg:h-10 rounded pl-4 h-8"
                                required
                                value={selectedDate}
                                onChange={(e) => {
                                  let tempdate = e.target.value;
                                  setSelectedDate(tempdate);
                                }}
                              ></input>
                            </td>
                        </tr>
                    
                    
                </table>
            </div>
            <div className="footer">
                <button
                    onClick={() => {
                        setModal(false);
                    }}
                    id="cancelBtn"
                >
                    Cancel
                </button>
                <button
                  onClick={(event) => {
                    saveAppointment();
                  }}
                  id="confirm"
                  >Continue</button>
            </div>
        </div> }
      </div>
      {/* <AppointmentContext.Provider value={test}>{props.children}</AppointmentContext.Provider> */}
      
      {/* <AppointmentContext.Provider value={{doctorModel, setDoctorModel}}>{props}</AppointmentContext.Provider> */}
      <div className="-mt-20 mb-0">
        <Footer></Footer>
      </div>
      
    </div>
  );
};

export default PatientHistory;
