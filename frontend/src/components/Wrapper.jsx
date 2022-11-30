import React from "react";
import NavBar from '../components/NavBar.jsx';
import { ToastContainer } from "react-toastify";

const Wrapper = ({ children }) => (
  <div className='h-100'>
    <div id='chat' className='h-100'>
      <div className='d-flex flex-column h-100'>
        <NavBar />
        {children}
      </div>
      <ToastContainer />
    </div>
  </div>
)

export default Wrapper;
