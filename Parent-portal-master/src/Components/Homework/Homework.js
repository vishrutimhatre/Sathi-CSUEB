import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Table, Spinner, Modal } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import "./Homework.css";
import { DataContext } from "../Data";
import Hamburger from "../Hamburger/Hamburger";
import { Helmet } from "react-helmet";
const Homework = () => {

    return (
        <Container fluid className="dashboard">
            <Helmet>
                <title>Dashboard | Parents Portal</title>
                <meta name="description" content="Now a days All things are based on Online. Find a good doctor is so  much hassle  now a days.
        Doctors portal is going to give you advantage that you don't need to go hospital physically.You can book and get the best treatment from now ."/>
                <meta name="keywords" content="online doctors book appointment"/>
            </Helmet>
            <div className="ml-6 main">
                <div className="d-md-block">
                    <SideBar></SideBar>
                </div>
                <br/>
                <div className="title__hamburger">
                    <Hamburger></Hamburger>
                </div>

                <div >
                    <br/>
                    <br/>
                    <img src={"Homework.png"} style={{ width: "330px", height: "700px"}}/>
                </div>

            </div>

        </Container>
    );
};

export default Homework;
