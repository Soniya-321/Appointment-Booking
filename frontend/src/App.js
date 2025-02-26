import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DoctorDetails from "./pages/DoctorDetails";
import ManageAppointments from "./pages/ManageAppointments";
import EditAppointment from "./components/EditAppointment";
import DoctorList from "./components/DoctorList";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/doctors' element={<DoctorList />} />
      <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
      <Route path="/appointments" element={<ManageAppointments />} />
      <Route path="/appointments/:id" element={<EditAppointment />} />
    </Routes>
  </Router>
);

export default App;
