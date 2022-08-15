import React from "react";

import NoveltyBanner from "./NoveltyBanner.js";

import "./style/MainContentWrapper.css";

const MainContentWrapper = ({children}) => {
    return (
        <main role="main" className="main">
            <div className="row">
                <div className="main-content white">
                    <NoveltyBanner />
                    { children }
                </div>
            </div>
        </main>
    );
};

export default MainContentWrapper;