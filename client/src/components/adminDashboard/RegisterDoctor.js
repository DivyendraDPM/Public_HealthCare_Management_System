import React, { useState } from "react";
import Footer from "../landingPage/Footer";
import plus_logo from "../../assets/img/dashboard/add2_pbl.png";
import minus_logo from "../../assets/img/dashboard/minus2_pbl.png";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function Register(props) {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [EducationList, setEducationList] = useState([{ degree: "" }]);
  const [passwordError, setPasswordError] = useState("");
  const [errors, setErrors] = useState({});
  const handelEducationAdd = () => {
    const EducationList1 = [...EducationList];
    EducationList1.push({ degree: "" });
    setEducationList(EducationList1);
  };

  // const [Speciality, setSpeciality] = useState([]);

  // const handelSpecialityAdd = () => {
  //   const SpecialityList1 = [...SpecialityList];
  //   SpecialityList1.push({ special: "" });
  //   setSpecialityList(SpecialityList1);
  // };

  //need changes
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

  const handleRegisterDoctor = async (e) => {
    e.preventDefault();
    setPasswordError("");
    if (doctor.password === confirmPassword) {
      setLoading(true);
      const res = await fetch("/register/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });
      console.log(JSON.stringify(doctor));
      const data = res.json(); //await
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else if (data.err) {
        props.settoastCondition({
          status: "error",
          message: "Please enter all field properly!!!",
        });
        props.setToastShow(true);
      } else {
        setLoading(false);
        props.settoastCondition({
          status: "success",
          message: "Doctor Registration done Successfully!!!",
        });
        props.setToastShow(true);
        navigate("/admin/dashboard");
      }
    } else {
      setPasswordError("Password Doesn't Matches");
    }
  };

  return (
    <div class="body col-span-10 h-screen overflow-y-scroll">
      <div class="bg-secoundry">
        <div class="">
          <div class=" flex justify-center mt-4">
            <h1 class="  p-2 px-8 rounded font-bold text-5xl">Register</h1>
          </div>

          <form
            onSubmit={handleRegisterDoctor}
            class="font-poppins ml-20 mt-8 px-8 py-4 bg-white shadow-lg rounded max-w-screen-lg  mb-4 "
          >
            <div class="flex   mt-2 bg-bgsecondary w-fit  justify-between rounded mx-auto">
              <h1
                className={
                  "py-2 px-8 text-lg font-poppins font-semibold cursor-text rounded bg-primary"
                }
              >
                Doctor
              </h1>
            </div>

            <div class="grid grid-cols-4 gap-2 mt-4 mr-4">
              <label class="font-bold text-base font-poppins px-4 my-4 ">
                Doctor Name
              </label>
              <input
                class="bg-blue-100 rounded h-10 pl-4 mt-4"
                required
                placeholder="first name"
                value={doctor.name.firstName}
                onChange={(e) => {
                  let tempdoctor = { ...doctor };
                  tempdoctor.name.firstName = e.target.value;
                  setDoctor(tempdoctor);
                }}
              ></input>
              <input
                class="bg-blue-100 rounded h-10 pl-4 mt-4"
                placeholder="middle name"
                value={doctor.name.middleName}
                onChange={(e) => {
                  let tempdoctor = { ...doctor };
                  tempdoctor.name.middleName = e.target.value;
                  setDoctor(tempdoctor);
                }}
              ></input>
              <input
                class="bg-blue-100 rounded h-10 pl-4 mt-4 "
                required
                placeholder="last name"
                value={doctor.name.surName}
                onChange={(e) => {
                  let tempdoctor = { ...doctor };
                  tempdoctor.name.surName = e.target.value;
                  setDoctor(tempdoctor);
                }}
              ></input>
            </div>

            <div class="grid grid-cols-4 gap-2 mt-4 mr-4">
              <label class="  text-base font-bold px-4">Email</label>
              <input
                type="email"
                id="email"
                placeholder="abcd@gmail.com"
                required
                class="bg-blue-100 h-10 rounded pl-4 col-span-3 "
                value={doctor.email}
                onChange={(e) => {
                  let tempdoctor = { ...doctor };
                  tempdoctor.email = e.target.value;
                  setDoctor(tempdoctor);
                }}
              ></input>
            </div>

            <div class="grid grid-cols-4 gap-2 mt-4 mr-4 grid-flow-dense ">
              <label class=" text-base font-bold px-4 mb-8 col-span-1">
                Address
              </label>
              <div className="grid grid-cols-2 gap-4 col-span-3 ">
                <input
                  type="text"
                  class="bg-blue-100 h-10  rounded pl-4 col-span-3"
                  required
                  placeholder="address"
                  value={doctor.address}
                  onChange={(e) => {
                    let tempdoctor = { ...doctor };
                    tempdoctor.address = e.target.value;
                    setDoctor(tempdoctor);
                  }}
                ></input>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-2  mr-4">
              <label class=" text-base font-bold px-4 grid col-start-1 col-span-1">
                Specialization
              </label>
              <div className="grid grid-cols-2 gap-4 col-span-3">
                {/* {SpecialityList.map((Special, index) => ( */}
                <input
                  class="bg-blue-100 h-10  rounded pl-4 col-span-3"
                  placeholder="Speciality"
                  id="speciality"
                  name="speciality"
                  value={doctor.specialization}
                  onChange={(e) => {
                    // let SpecialityList1 = [...SpecialityList];
                    // SpecialityList1[index].special = e.target.value;
                    // console.log(Speciality);
                    // setSpeciality([e.target.value]);
                    let tempdoctor = { ...doctor };
                    tempdoctor.specialization = e.target.value;
                    setDoctor(tempdoctor);
                  }}
                ></input>

                {/* ))} */}
              </div>
            </div>

            <div class="grid grid-cols-4 gap-2 mt-4 mr-4 grid-flow-dense ">
              <label class=" text-base font-bold px-4 col-span-1">
                Consultation Fee
              </label>
              <div className="grid grid-cols-2 gap-4 col-span-3 ">
                <input
                  type="text"
                  class="bg-blue-100 h-10  rounded pl-4 col-span-3"
                  required
                  placeholder="fee"
                  value={doctor.consultationFee}
                  onChange={(e) => {
                    let tempdoctor = { ...doctor };
                    tempdoctor.consultationFee = e.target.value;
                    setDoctor(tempdoctor);
                  }}
                ></input>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-2 mt-4 mr-4">
              <label type="password" class="  text-base font-bold px-4">
                Password
              </label>
              <input
                type="password"
                id="password"
                class="bg-blue-100 h-10  rounded pl-4 col-span-3"
                required
                placeholder="password"
                value={doctor.password}
                onChange={(e) => {
                  let tempdoctor = { ...doctor };
                  tempdoctor.password = e.target.value;
                  setDoctor(tempdoctor);
                }}
              ></input>
            </div>

            <div class="grid grid-cols-4 gap-2 mt-4 mr-4">
              <label type="password" class=" text-base font-bold px-4">
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                class="bg-blue-100 h-10  rounded pl-4 col-span-3"
                required
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
              <span className="text-sm py-1 text-red-500">{passwordError}</span>
            </div>

            <div class="flex justify-center mb-4 mt-8">
              {Loading ? (
                <ReactLoading
                  type={"bubbles"}
                  color={""}
                  height={"5%"}
                  width={"5%"}
                />
              ) : (
                <button
                  type="submit"
                  className="bg-primary rounded p-2 px-8 font-bold text-xl hover:bg-bgsecondary mb-4 "
                >
                  Submit
                </button>
              )}
            </div>
          </form>

          <div className="mt-auto relative bottom-0">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </div>
  );
}
