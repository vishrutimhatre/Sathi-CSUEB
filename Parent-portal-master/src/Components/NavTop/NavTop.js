import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";
import sathi from "../../images/sathi logo_6.png";
const NavTop = () => {
  return (
    <Navbar
      expand="lg"
      className="px-md-4 py-4 "
      style={{ position: "sticky" }}
    >
      <Navbar.Brand href="/" className="font-weight-bold">
        <img src={sathi} alt="sathi" className="img-fluid "/>
      </Navbar.Brand>

    </Navbar>
  );
};

export default NavTop;
