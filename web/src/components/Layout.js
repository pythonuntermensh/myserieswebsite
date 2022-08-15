import React from "react";

import Header from "./header";
import Footer from "./footer";
import Background from "./Background";

import "./style/Layout.css";

const Layout = ({children}) => {
    return (
        <div className="layout-wrapper">
            <Header />
            <Background />
            <div className="children-wrapper">
                { children }
            </div>
            <Footer />
        </div>
    );
};

export default Layout;