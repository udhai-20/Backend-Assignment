import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import AddEdit from "../Pages/AddEdit/AddEdit";
import { toast } from "react-toastify";
import View from "../Pages/View/View";
function MainRouters(props) {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/add&edit" element={<AddEdit />} />
        <Route path="/edit/:id" element={<AddEdit />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </>
  );
}

export default MainRouters;
