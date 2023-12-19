import patient_profile from "../assets/img/dashboard/patient2_pbl.png";

import reports from "../assets/img/dashboard/report2_pbl.png";

import search from "../assets/img/dashboard/search2.png";
import Footer from "../components/landingPage/Footer";
import eye from "../assets/img/dashboard/eye.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PatientDashboard = (props) => {
  const navigate = useNavigate();

  const [dob, setDob] = useState("01/01/2006");
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
  const [prescriptions, setPrescriptions] = useState([{}]);

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [doctorModel, setDoctorModel] = useState([{
    prediction: "",
    docName: "",
    date: "",
    status: ""
  }]);

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
        setDoctorModel(data.appointment);
        console.log(doctorModel);
        if (data.patient.prescriptions) {
          setPrescriptions(data.patient.prescriptions.reverse());
        }
      }
    }
    getpatient();
  }, [dob]);
  console.log(doctorModel);

  return (
    <div className="full-body col-span-10 h-screen">
      <div className="body-without-footer max-h-min bg-bgprimary ">
        <div className=" main ">
          <div className="">
            <div className="flex  h-12 m-2 bg-bgprimary rounded mt-4  ">
              <div>
                <h1 className="text-2xl font-poppins font-bold p-2 ">
                  Patient DashBoard
                </h1>
              </div>

              <div className="flex ml-20  h-10   ">
                <input
                  placeholder="Search"
                  className="w-96 rounded ml-4 text-xl   pl-4 border focus:outline-none "
                ></input>
                <div className="bg-white pl-2 rounded ">
                  <img src={search} className=" h-6 mt-2  " alt="search"></img>
                </div>
              </div>

              <Link to="/patient/profile">
                <button className="flex bg-white rounded shadow  px-4  ml-48 h-14 ">
                  <img
                    src={patient_profile}
                    className="h-14 p-1 rounded-2xl"
                    alt="profile"
                  ></img>
                  <div className="mt-2 ml-4  font-bold font-poppins">
                    <h1>{`${patient.name.firstName}  ${patient.name.surName}`}</h1>
                  </div>
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="m-4 p-4">
              <div>
                <h1 className="font-bold font-poppins text-xl ">
                  Patient Details
                </h1>
              </div>
              <div className="bg-white font-poppins p-4 mt-4 px-8 rounded-xl shadow">
                <div className="flex">
                  <div>
                    <h1>Name : </h1>
                  </div>
                  <div className="flex ml-2   ">
                    <h1 className="pl-1">{patient.name.firstName}</h1>
                    <h1 className="pl-1">{patient.name.middleName}</h1>
                    <h1 className="pl-1">{patient.name.surName}</h1>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <h1>Date : </h1>
                  </div>
                  <div className="ml-2">
                    <h1>{convertDatetoString(patient.dob)}</h1>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <h1>Blood group : </h1>
                  </div>
                  <div className="ml-2">
                    <h1>{patient.bloodGroup}</h1>
                  </div>
                </div>
                <div>
                  <h1 className="font-bold mt-4">Past Health History</h1>
                  <div>{`${patient.diseases[0].disease} (${patient.diseases[0].yrs} yrs.)`}</div>
                </div>
              </div>
            </div>
            <div className="m-4 p-4 ">
              <div>
                <h1 className="font-bold font-poppins text-xl ">
                  Recent Health Checkup
                </h1>
              </div>
              {/* {prescriptions.length > 0 ? (
                <div className="bg-white mt-4 font-poppins p-4 rounded-xl shadow px-8">
                  <div className="flex ">
                    <div>
                      <h1>Consultant Doctor :</h1>
                    </div>
                    <div className="ml-2">
                      <h1>{`Dr. ${prescriptions[0].doctor}`}</h1>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <h1>Date :</h1>
                    </div>
                    <div className="ml-2">
                      <h1>{convertDatetoString(prescriptions[0].createdAt)}</h1>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <h1>Diagnosis : </h1>
                    </div>
                    <div className="ml-2">
                      <h1>{prescriptions[0].diagnosis}</h1>
                    </div>
                  </div>
                  <Link
                    to="/patient/prescription"
                    onClick={() => {
                      props.setPrescriptionID(prescriptions[0]._id);
                    }}
                  >
                    <div className=" mt-2 flex items-center justify-evenly text-base bg-primary py-1 px-2 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-5/12  ">
                      <img src={reports} className="h-4" alt="report"></img>

                      <button className=" font-semibold pl-1">
                        Preview Prescription
                      </button>
                    </div>
                  </Link>
                </div>
              ) : ( */}
                <div className="bg-white mt-4 font-poppins p-4 rounded-xl shadow px-8 flex justify-center font-bold">
                  {" "}
                  No Data Found...{" "}
                </div>
              {/* )} */}
            </div>
            <div></div>
          </div>

          <div className="font-poppins">
            <div className="flex justify-between mx-8 mt-2">
              <div className="font-bold text-xl ml-4">
                <h1>Appointments</h1>
              </div>
            </div>
            <div className="bg-white m-4 rounded-lg ">
            <div id="scroll" style={{ overflowY: "scroll", height: "200px" }} className="grid grid-rows-2 p-6 mx-4 gap-2 rounded-xl shadow">
                  <table className="pb-2 mb-48" id="appointment">
                    {/* <div className="grid grid-cols-4 font-bold "> */}
                    <thead>
                      <tr className="text-left pb-10 bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th className="w-96">Doctor's Name</th>
                        <th className="w-48">Date</th>
                        <th className="w-96">Disease</th>
                        <th className="w-48">Status</th>
            
                      </tr>
                    </thead>
                    <tbody>
                      {doctorModel && doctorModel.map((doctorModel, index) => (
                        <>
                          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700" id={index}>
                            <td>Dr. {doctorModel.docName.replace(/([A-Z])/g, ' $1').trim()}</td>
                            <td>{doctorModel.date.substring(0,10)}</td>
                            <td>{doctorModel.prediction}</td>
                            <td>{doctorModel.status}</td>
                          </tr>
                        </>
                      ))}

                    </tbody>

                  </table>
                  

                  {prescriptions.length > 0 ? (
                    prescriptions.map((prescription) => {
                      // return (
                      //   // <PatientHistoryCompo
                      //   //   prescription={prescription}
                      //   //   setPrescriptionID={props.setPrescriptionID}
                      //   // />
                      // );
                    })
                  ) : (
                    <div className="font-bold mt-3 mx-auto">

                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1 mb-0">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default PatientDashboard;
