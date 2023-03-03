import React from "react";
import { Route, Routes as SW } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Page from "../pages/Page";



const Routes = () => {
 
  return (
    <SW>
      <Route path="/" element={<HomePage/>} />
      <Route path="/page/:id" element={<Page/>} />
    </SW>
  )
};

export default Routes;
