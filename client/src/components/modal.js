import React, { useContext } from "react";
import "./modal.css";
import {AppointmentContext} from "./patientDashboard/PatientHistory" 

// export const ListContext = React.createContext();

// function AppModal(){
//     const {doctorModel,setDoctorModel} = useContext(AppointmentContext);
// }

function Modal({ setOpenModal }) {
    
    // console.log(doctorModel);
    return (
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    X
                </button>
            </div>
            <div className="title">
                <h1 className="text-xl font-bold">Appointment Details</h1>
            </div>
            <div className="body">
                <table id="modalTable">
                    <thead>
                        <tr>
                            <th className="text-left m-6">Patient Name</th>
                            <td className="text-left pl-6 py-2">Aman</td>
                        </tr>
                        <tr>
                            <th className="text-left mr-6">Symptoms</th>
                            <td className="text-left pl-6 py-2">Fever, Cold, Cough</td>
                        </tr>
                        <tr>
                            <th className="text-left">Predicted Disease</th>
                            <td className="text-left pl-6 py-2">Allergy</td>
                        </tr>
                        <tr>
                            <th className="text-left mr-6">Doctor's Name</th>
                            <td className="text-left pl-6 py-2">Vivek</td>
                        </tr>
                        <tr>
                            <th className="text-left mr-6">Preferred Day</th>
                            <td className="text-left pl-6 py-2">4/4/23</td>
                        </tr>
                    </thead>
                    
                </table>
            </div>
            <div className="footer">
                <button
                    onClick={() => {
                        setOpenModal(false);
                    }}
                    id="cancelBtn"
                >
                    Cancel
                </button>
                <button>Continue</button>
            </div>
        </div>
    );
}

export default Modal;