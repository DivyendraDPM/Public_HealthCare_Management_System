import Footer from "../landingPage/Footer";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import PatientHistoryCompo from "./PatientHistoryCompo";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PatientManualSymp = (props) => {
  const [files, setFiles] = useState([]);


  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [healthID, setID] = useState();

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

  useEffect(() => {
    getdisease();
  }, []);
  async function getdisease() {
    await axios("/patient/manualsym/getdisease")
      .then((response) => {
        console.log("hello");
      })
      .catch((error) => {
        console.log("error");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="col-span-10">
      <div className=" px-12">
        <div className="h-screen">
          <div className="font-poppins mainf">
            <div>
              <Link to="/patient/profile">
                <div className="flex bg-white rounded shadow  px-4   ml-auto h-14 w-1/5 mr-8 mt-8">
                  <img
                    src={patient_profile}
                    className="w-12 p-1 rounded-2xl"
                    alt="profile"
                  ></img>
                  <div className="grid grid-rows-2 ml-4 gap-2  mb-4">
                    <div className="mt-4 ml-4  font-bold font-poppins">
                      <h1 className="ml-2">
                        {`${patient.name.firstName} ${patient.name.surName}`}
                      </h1>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="flex justify-between m-8">
                <div className="font-bold text-xl ml-4">
                  <h1>Upload Previous Reports</h1>
                </div>
              </div>

              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      class="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or PDF
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-12 mb-0">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default PatientManualSymp;

{
  /* Profile Section type top right */
}
{
  /* <Link to="/patient/profile">
              <div className="flex bg-white rounded shadow  px-4   ml-auto h-14 w-1/5 mr-8 mt-8">
                <img
                  src={patient_profile}
                  className="w-12 p-1 rounded-2xl"
                  alt="profile"
                ></img>
                <div className="grid grid-rows-2 ml-4 gap-2  mb-4">
                  <div className="mt-4 ml-4  font-bold font-poppins">
                    <h1 className="ml-2">
                      {`${patient.name.firstName} ${patient.name.surName}`}
                    </h1>
                  </div>
                </div>
              </div>
            </Link> */
}

{
  /* Heading */
}
{
  /* <div className="flex justify-between m-8">
              <div className="font-bold text-xl ml-4">
                <h1>Upload Previous Reports</h1>
              </div>
            </div> */
}

{
  /* Upload Section/ */
}
{
  /* <div className="bg-white m-4 rounded-lg ">
              <div className="grid grid-rows-2 p-6 gap-6 shadow font-bold">
                  <form className="symptomForm">
                    <div className="grid grid-cols-4 gap-4 pt-6">
                    </div>
                    <div className="grid grid-col-1 justify-center pt-6 ">
                    <button onClick={patientSymptomFetch}
                      type="button"
                    className="finalPredict btn bg-green-400 text-xl" id="Ensemble">Upload
                    </button>
                    <div className="text-center text-2xl mt-2">{Prediction5}</div>
                    </div>

                    <div className="grid grid-col-1 justify-center mt-3 mb-6">
                    <button className="finalPredict btn bg-red-400">Clear
                    </button>
                    </div>
                  </form>
              </div>
            </div> */
}
