import React, { useEffect, useState, useContext } from "react";
import SideBar from "../SideBar/SideBar";
import {Container, Row, Col, Table, Spinner, Card} from "react-bootstrap";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import { DataContext } from "../Data";
import Hamburger from "../Hamburger/Hamburger";
import { Helmet } from "react-helmet";


const condition = Boolean(Math.round(Math.random()))


const AddChild = (props) => {
    const [firstname, setFirstname] = useState("");
    const [age, setAge] = useState(10);
    const [parentsName, setParentsName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("1234");
    const [err, setErr] = useState(false);
    const [succ, setSucc] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const handleSubmitButtonCLick = (event) => {
        getBase64(selectedFile,(profilePicture) => {

            console.log(`
              firstname: ${firstname}
              age: ${age}
              parentsName: ${parentsName}
              email: ${email}
              phone : ${phone}
              profilePicture: ${profilePicture}
            `);

            let data = {
                firstname,
                age,
                parentsName,
                email,
                phone,
                password,
                profilePicture
            }

            //fetch("http://localhost:5000/addAppointment", {
            fetch("http://ec2-52-88-50-57.us-west-2.compute.amazonaws.com/addAppointment", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => {
                    response.json()
                    setSucc(true)
                })
                .then((data) => {
                    console.log("SUCCESS!!")

                });
        });
    }
    return (
        <Container fluid className="dashboard">
            <Helmet>
                <title>Patients List | Therapist Portal</title>
                <meta name="description" content="Now a days All things are based on Online. Find a good doctor is so  much hassle  now a days.
        Doctors portal is going to give you advantage that you don't need to go hospital physically.You can book and get the best treatment from now ."/>
                <meta name="keywords" content="online doctors book appointment"/>
            </Helmet>
            <div className="main ml-6">
                <div className="d-md-block">
                    <SideBar></SideBar>
                </div>
                <br/>

                <div className="title__hamburger">
                    <h2 className="mt-3">Add a Child</h2>
                    <Hamburger></Hamburger>
                </div>

                <br/>

                <Card className="p-md-5 p-1" style={{boxShadow: "0px 0px 15px #E8D1c5"}}>
                    <div className="form-box">
                        <div>
                                <text>Enter Child's name:</text>
                                <br/>

                                <input
                                    type='text'
                                    name='firstname'
                                    value={firstname}
                                    size="50"
                                    onChange={e => setFirstname(e.target.value)}
                                />

                                <br/>
                                <br/>
                                <text>Enter Age:</text>
                                <br/>
                                <input
                                    type='text'
                                    name='age'
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                />
                                <br/>
                                <br/>

                                <text>Enter Parent's Name:</text>
                                <br/>
                                <input
                                    type='text'
                                    name='parentsName'
                                    value={parentsName}
                                    size="50"
                                    onChange={e => setParentsName(e.target.value)}
                                />
                                <br/>
                                <br/>

                                <text>Enter Parent's Email:</text>
                                <br/>
                                <input
                                    type='text'
                                    name='email'
                                    value={email}
                                    size="50"
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <br/>
                                <br/>
                                <text>Enter Parent's Phone Number:</text>
                                <br/>
                                <input
                                    type='text'
                                    name='phoneNumber'
                                    value={phone}
                                    size="50"
                                    onChange={e => setPhone(e.target.value)}
                                />

                                <br/>
                                <br/>
                                <text>Upload Profile Picture:</text>
                                <br/>

                                <input
                                        type="file"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                />


                                <br/>
                                <br/>
                                <button className="btn btn-main"  onClick={e=> handleSubmitButtonCLick(e)} style={{textAlign: "right"}}>Submit</button>

                        </div>

                    </div>
                </Card>
                <br/>
                <h5>{succ && "Entry recorded!"}</h5>
            </div>
        </Container>
    );
};

export default AddChild;
