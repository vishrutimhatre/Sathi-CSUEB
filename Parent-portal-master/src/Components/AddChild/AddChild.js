import React, { useEffect, useState, useContext } from "react";
import SideBar from "../SideBar/SideBar";
import { Container, Row, Col, Table, Spinner } from "react-bootstrap";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import { DataContext } from "../Data";
import Hamburger from "../Hamburger/Hamburger";
import { Helmet } from "react-helmet";

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const condition = Boolean(Math.round(Math.random()))


const AddChild = (props) => {
    const [firstname, setFirstname] = useState("");
    const [age, setAge] = useState(10);
    const [email, setEmail] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");

    // const myChangeHandler = (event) => {
    //     let nam = event.target.name;
    //     let val = event.target.value;
    //     if (nam === "age") {
    //         if (!Number(val)) {
    //             alert("Your age must be a number");
    //         }
    //     }
    //
    //     setUsername(val)
    // }

    const handleSubmitButtonCLick = (event) => {
        console.log(`
              firstname: ${firstname}
              age: ${age}
              email: ${email}
              phoneNumber : ${phoneNumber}
            `);

        let data = {
            firstname,
            age,
            email,
            phoneNumber
        }

        //fetch("http://localhost:5000/addAppointment", {
        fetch("http://ec2-52-88-50-57.us-west-2.compute.amazonaws.com/addAppointment", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("SUCCESS!!")
            });
    }
    return (
        <Container fluid>
            <Helmet>
                <title>Patients List | Parents Portal</title>
                <meta name="description" content="Now a days All things are based on Online. Find a good doctor is so  much hassle  now a days.
        Doctors portal is going to give you advantage that you don't need to go hospital physically.You can book and get the best treatment from now ."/>
                <meta name="keywords" content="online doctors book appointment"/>
            </Helmet>
            <div className="main ml-6">
                <div className="d-md-block">
                    <SideBar></SideBar>
                </div>
                <div className="title__hamburger">
                    <h3 className="mt-3">Add a Child</h3>
                    <Hamburger></Hamburger>
                </div>



                <div>
                    {/*<form>*/}
                        <p>Enter Kids name:</p>
                        <input
                            type='text'
                            name='firstname'
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)}
                        />
                        <br/>
                        <p>Enter his Age:</p>
                        <input
                            type='text'
                            name='age'
                            value={age}
                            onChange={e => setAge(e.target.value)}
                        />
                        <br/>
                        <p>Enter parents Email:</p>
                        <input
                            type='text'
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <br/>
                        <p>Enter parents PhoneNumber:</p>
                        <input
                            type='text'
                            name='phoneNumber'
                            value={phoneNumber}
                            onChange={e => setphoneNumber(e.target.value)}
                        />
                        <br/>
                        <button onClick={e=> handleSubmitButtonCLick(e)}>Submit</button>
                    {/*</form>*/}
                </div>

            </div>
        </Container>
    );
};

export default AddChild;
