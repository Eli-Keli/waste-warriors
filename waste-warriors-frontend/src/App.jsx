/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPreview from './pages/Dashboard'
import InputWastePreview from './pages/WasteForm';
import ReportPagePreview from './pages/Report';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPreview />} />
        <Route path="/add-waste" element={<InputWastePreview />} />
        <Route path="/report" element={<ReportPagePreview />} />
      </Routes>
    </Router>
  )
}

export default App