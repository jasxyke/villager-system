import React, { Fragment } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import "./Layout.css"

const Layout = ({ children }) => {
    return (
        <div className={`main-section-bg`}>
            <Sidebar />
            <div className={`main-section`}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
