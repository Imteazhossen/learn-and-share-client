
import React from 'react';
import { Outlet } from 'react-router';

import Navbar from './../Pages/SharedComponents/Navbar/Navbar';
import Footer from '../Pages/SharedComponents/Footer/Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
    return (
        <div>
            {/* Global Toast Notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
                newestOnTop
            />

            {/* Navbar */}
            <Navbar />

            {/* Child Routes */}
            <Outlet />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default RootLayout;
