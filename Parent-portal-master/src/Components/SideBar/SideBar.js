import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faIdCardAlt,
  faChalkboardTeacher,
  faSignOutAlt,
  faCog,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import sathi from "../../images/sathi logo_6.png";
const SideBar = () => {
  return (
    <div className="sidenav px-2 py-5">
      <div className="side-item">
        <img src={sathi} alt="sathi" className="img-fluid " />
        <br/><br/>
        <Link to="/dashboard">
          <button className="my-md-3">
            <FontAwesomeIcon icon={faHome} /> &nbsp;&nbsp;&nbsp;&nbsp; Home
          </button>
        </Link>
        <Link to="/homework">
          <button className="my-md-3">
            &nbsp;<FontAwesomeIcon icon={faClipboardList} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Homework
          </button>
        </Link>
        <Link to="/dashboard">
          <button className="my-md-3">
            <FontAwesomeIcon icon={faIdCardAlt} /> &nbsp;&nbsp;&nbsp;&nbsp; Therapist
          </button>
        </Link>
        <Link to="/dashboard">
          <button className="my-md-3">
            <FontAwesomeIcon icon={faChalkboardTeacher} /> &nbsp;&nbsp;&nbsp;&nbsp; School
          </button>
        </Link>
        <Link to="/dashboard">
          <button className="my-md-3">
            <FontAwesomeIcon icon={faCog} /> &nbsp;&nbsp;&nbsp;&nbsp; Settings
          </button>
        </Link>
      </div>
      <Link to="/">
        <button className="btn">
          <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp;&nbsp; &nbsp;&nbsp;Log out
        </button>
      </Link>
    </div>
  );
};

export default SideBar;
