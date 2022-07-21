import React, { useEffect, useState } from "react";
import ShowResult from "./screens/showResult";
import HeaderComponent from "./components/header";
import { Route, useHistory } from "react-router-dom";
import NavbarComponent from "./components/navbar";
import ShowData from "./screens/showData";
import ShowDataStudent from "./screens/showDataStudent";
import UploadVideo from "./screens/UploadVideo";
import "./App.css";

const RouteHome = () => {
  const [isLoading, setisLoading] = useState(false);
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("jwt") && localStorage.getItem("user")) {
      setisLoading(true);
    } else {
      console.log("No Auth");
      history.push("/");
    }
  }, [history]);

  if (!isLoading) {
    return null;
  } else {
    return (
      <div className="nu-h-container">
        <HeaderComponent />
        <NavbarComponent />
        <Route path="/home" component={ShowResult} />
        <Route path="/data" component={ShowData} />
        <Route path="/datastudent" component={ShowDataStudent} />
        <Route path="/uploadvideo" component={UploadVideo} />
      </div>
    );
  }
};

export default RouteHome;
