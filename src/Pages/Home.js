import React from "react";
import "./Home.css";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Search from "../component/Search";
import { Link } from "react-router-dom";

function Home() {
  window.localStorage.removeItem("Input");
  return (
    <>
      <div className="home_header">
        <div className="home_header_left">
          <Link to={"/about"}>About</Link>
          <Link to={"/store"}>Store</Link>
        </div>
        <div className="home_header_right">
          <Link to={"/gmail"}>Gmail</Link>
         <div className="imagesIcon"> <Link to={"/images"}>Images</Link></div>
          <div className="appsIcon"><AppsIcon  /></div>
          <AccountCircleIcon />
        </div>
      </div>
      <div className="home_body">
        <Link to="/">
        <img  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt=""  />
        </Link>
      </div>
      <div className="home_inputContainer">
        <Search />
      </div>
    </>
  );
}

export default Home;
