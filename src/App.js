import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './layout/admin';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="admin/*" element={<Admin />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;