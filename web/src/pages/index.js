import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from "../components/Layout";
import HomePage from "./home";
import SerialsPage from "./serials";
import SeriesPage from "./series";

const Pages = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route path='/series/:id' element={<SeriesPage />} />
                    <Route path='/series/' element={<SerialsPage />} />
                    
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default Pages;