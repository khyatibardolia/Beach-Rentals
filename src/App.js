import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
/** component specific import */
import Routes from './Routes';

const App = () => {
  return <>
    <ToastContainer position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover/>
    <div className="min-vh-100">
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </div>
  </>;
};

export default App;
