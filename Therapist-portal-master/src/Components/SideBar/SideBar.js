import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faUserInjured,
  faGripHorizontal,
  faSignOutAlt,
  faUserPlus,
  faHome,
  faChild,
  faQuestionCircle,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import sathi from "../../images/sathi logo_6.png";
const SideBar = () => {
  return (
    <div className="sidenav px-2 py-5">
      <div className="side-item">
        <img src={sathi} alt="sathi" className="img-fluid " style={{background:"#FFF1E6"}}/>
        <br/><br/>
        <Link to="/dashboard">
          <button className="my-md-3">
            <FontAwesomeIcon icon={faHome} />     &nbsp;&nbsp; &nbsp;&nbsp;Home
          </button>
        </Link>
        {/*<Link to="/today">*/}
          <button className="my-md-3">
            <FontAwesomeIcon icon={faCalendarCheck} />   &nbsp;&nbsp; &nbsp;&nbsp; Schedule
          </button>
        {/*</Link>*/}
        <Link to="/patients">
          <button className="my-md-3">
            <FontAwesomeIcon icon={faChild} />  &nbsp;&nbsp; &nbsp;&nbsp;   Children
          </button>
        </Link>
        <Link to="/patients">
          <button className="my-md-3">
            <FontAwesomeIcon icon={faQuestionCircle} />  &nbsp;&nbsp; &nbsp;&nbsp;  Help
          </button>
        </Link>

        <Link to="/patients">
          <button className="my-md-3">
            <FontAwesomeIcon icon={faCog} /> &nbsp;&nbsp; &nbsp;&nbsp;Settings
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
