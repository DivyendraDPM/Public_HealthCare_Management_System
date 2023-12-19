import Footer from "../landingPage/Footer";

import patient_card_profile from "../../assets/img/dashboard/admin-card-profile.png";
import name from "../../assets/img/dashboard/patient-profile-name.png";
import birth from "../../assets/img/dashboard/patient-profile-birth.png";
import address from "../../assets/img/dashboard/patient-profile-address.png";
import phone from "../../assets/img/dashboard/patient-profile-phone.png";
import mail from "../../assets/img/dashboard/patient-profile-mail.png";
import blood from "../../assets/img/dashboard/patient-profile-blood.png";
import hospital from "../../assets/img/dashboard/doctor-profile-hospital.png";
import hospital_contact from "../../assets/img/dashboard/doctor-profile-contact.png";
import speciality from "../../assets/img/dashboard/doctor-profile-speciality.png";
import rupee from "../../assets/img/dashboard/rupee.png";
import home from "../../assets/img/dashboard/doctor-profile-home.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorProfile = (props) => {
  // const navigate = useNavigate();
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

  // const convertDatetoString = (dateString) => {
  //   let date = new Date(dateString);
  //   let day = date.getDate();
  //   let month = date.getMonth() + 1;
  //   let year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  useEffect(() => {
    async function getdoctor() {
      const res = await fetch("/getdoctor");
      const data = await res.json();
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
      } else {
        setDoctor(data.doctor);
      }
    }
    getdoctor();
  }, []);

  return (
    <body className="font-poppins col-span-10 overflow-y-scroll">
      <div className="grid grid-cols-2 mt-16">
        
        {/* Left */}
        <div className="p-4 m-8 bg-white shadow-md w-2/3 mx-auto rounded-md ">
          <div className="flex justify-center">
            <img
              src={patient_card_profile}
              className="h-40 w-40 rounded-full border-2  p-4 "
              alt="patient-profile"
            />
          </div>
          <div className="mt-6">
            <div className="flex ml-28 ">
              <img src={name} className="h-8 w-8  " />
              <div className="flex mt-1">
                <h2 className="ml-2">Dr.</h2>
                <h2 className="ml-2">{doctor.name.firstName}</h2>
                <h2 className="ml-2">{doctor.name.middleName}</h2>
                <h2 className="ml-2">{doctor.name.surName}</h2>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Right */}
          <div className="p-8 mt-8 bg-white shadow-md w-2/3 rounded-md h-60">
            
            <div className="flex mt-4">
              <img src={mail} className="h-6 w-5 " />
              <h2 className="ml-4 ">{doctor.email}</h2>
            </div>
            <div className="flex mt-4">
              <img src={home} className="h-6 w-5 " />
              <h2 className="ml-4 ">{doctor.address}</h2>
            </div>
            <div className="flex mt-3">
              <img src={rupee} className="h-6 w-6" />
              <h2 className="ml-4 ">{doctor.consultationFee}</h2>
            </div>
            <div className="flex mt-4">
              <img src={speciality} className="h-6 w-6" />
              <h2 className="ml-4 ">{doctor.specialization}</h2>
            </div>
          </div>
        </div>
        <div className="mt-64 mb-0">
        <Footer></Footer>
      </div>
    </body>
    
  );
};

export default DoctorProfile;
