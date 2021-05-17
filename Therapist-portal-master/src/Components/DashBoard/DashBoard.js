import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Table, Spinner, Modal } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import "./DashBoard.css";
import { DataContext } from "../Data";
import Hamburger from "../Hamburger/Hamburger";
import { Helmet } from "react-helmet";
const DashBoard = () => {
  const [data, setData] = useContext(DataContext);
  const [user, setUser] = useState([]);
  const [today, setToday] = useState(0);
  const [pending, setPending] = useState(0);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState([]);
  const [medi, setMedi] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    const fake = data.find((x) => x._id === id);
    setModal(fake);
    if (fake.prescription) {
      setMedi(fake.medicine);
    }
    setShow(true);
  };
  useEffect(() => {
    const dat = new Date().toDateString();
    const todayAppoint = data.filter((x) => x.day === dat);
    setToday(todayAppoint);
  }, [data]);
  useEffect(() => {
    if (data.length !== 0) {
      const uniq = [...new Set(data.map((x) => x.firstname))];
      setUser(uniq);
    }
  }, [data]);
  useEffect(() => {
    let cnt = 0;
    data.map((x) => {
      if (x.status === "Pending") {
        cnt++;
      }
    });
    setPending(cnt);
  }, [data]);
  const updateMedi = (e) => {
    e.preventDefault();
    const form_data = document.getElementsByClassName("form-data");
    const newData = [...[], modal];
    const formData = {
      medicine: form_data[0].value,
      dose: form_data[1].value,
      days: form_data[2].value,
    };
    if (newData[0].prescription === true) {
      const final = [...newData[0].medicine, formData];
      //console.log(final);
      newData[0].medicine = final;
      setMedi(final);
      fetch("https://still-mesa-75708.herokuapp.com/updatePrescription", {
        method: "POST",
        body: JSON.stringify({
          id: newData[0]._id,
          medicine: final,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } else {
      const final = [formData];
      newData[0].medicine = final;
      setMedi(final);
      newData[0].prescription = true;
      fetch("https://still-mesa-75708.herokuapp.com/updatePrescription", {
        method: "POST",
        body: JSON.stringify({
          id: newData[0]._id,
          medicine: final,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    setModal(newData[0]);
    form_data[0].value = "";
    form_data[2].value = 0;
  };
  console.log(medi);
  const handleAction = (e, id) => {
    const newArr = data.map((x) => {
      if (x._id === id) {
        x.status = e.target.value;
        return x;
      } else {
        return x;
      }
    });
    setData(newArr);
    fetch("https://still-mesa-75708.herokuapp.com/updateStatus", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        value: e.target.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <Container fluid className="dashboard">
      <Helmet>
        <title>Dashboard | Therapist Portal</title>
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

        <Row className="my-3 text-light">
          <Col sm={12} md={12}>
              <img src={"docter/Group_67.svg"} style={{display: "block", marginLeft: "auto", marginRight: "auto"}}/>
          </Col>

          <Col sm={6} md={6}>
            <img src={"docter/Group_68.svg"} style={{display: "block", marginLeft: "auto", marginRight: "auto"}}/>
          </Col>
          <Col sm={6} md={6}>
            <img src={"docter/Group_69.svg"} style={{display: "block", marginLeft: "auto", marginRight: "auto"}}/>
          </Col>

          <Col sm={6} md={6}>
            <img src={"docter/Group_74.svg"} style={{display: "block", marginLeft: "auto", marginRight: "auto"}}/>
          </Col>
        </Row>

        {/*<Row className="my-3 text-light">*/}
        {/*  <Col sm={6} md={3}>*/}
        {/*    <div className="m-1 p-2 box-1">*/}
        {/*      <h3>{pending}</h3>*/}
        {/*      <p> Peding Appointment</p>*/}
        {/*    </div>*/}
        {/*  </Col>*/}
        {/*  <Col sm={6} md={3}>*/}
        {/*    <div className="m-1 p-2 box-2">*/}
        {/*      <h3>{today.length}</h3>*/}
        {/*      <p> Today Appointment</p>*/}
        {/*    </div>*/}
        {/*  </Col>*/}
        {/*  <Col xs={12} sm={6} md={3}>*/}
        {/*    <div className="m-1 p-2 box-3">*/}
        {/*      <h3>{data.length}</h3>*/}
        {/*      <p> Total Appointment</p>*/}
        {/*    </div>*/}
        {/*  </Col>*/}
        {/*  <Col xs={12} sm={6} md={3}>*/}
        {/*    <div className="m-1 p-2 box-4">*/}
        {/*      <h3>{user.length}</h3>*/}
        {/*      <p> Total Patient</p>*/}
        {/*    </div>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Table responsive="sm">*/}
        {/*  <thead>*/}
        {/*    <tr>*/}
        {/*      <th>Sr.No.</th>*/}
        {/*      <th>Name</th>*/}
        {/*      <th>Date</th>*/}
        {/*      <th>Time</th>*/}
        {/*      <th>Contact</th>*/}
        {/*      /!*<th>Catagory</th>*!/*/}
        {/*      /!*<th>Prescription</th>*!/*/}
        {/*      <th>Action</th>*/}
        {/*    </tr>*/}
        {/*  </thead>*/}

        {/*  {data.length === 0 ? (*/}
        {/*    <Spinner*/}
        {/*      animation="border"*/}
        {/*      variant="warning"*/}
        {/*      className="text-center mx-auto spinner-box"*/}
        {/*    />*/}
        {/*  ) : (*/}
        {/*    data.map((x, index) => (*/}
        {/*      <tbody>*/}
        {/*        <tr>*/}
        {/*          <td>{index + 1}</td>*/}
        {/*          <td>{x.firstname}</td>*/}
        {/*          <td>{x.day}</td>*/}
        {/*          <td>{x.time}</td>*/}
        {/*          <td>{x.phone}</td>*/}
        {/*          /!*<td>{x.catag}</td>*!/*/}
        {/*          /!*<td>*!/*/}
        {/*          /!*  {x.prescription ? (*!/*/}
        {/*          /!*    <button*!/*/}
        {/*          /!*      className="btn btn-dark w-100"*!/*/}
        {/*          /!*      onClick={() => handleShow(x._id)}*!/*/}
        {/*          /!*    >*!/*/}
        {/*          /!*      View*!/*/}
        {/*          /!*    </button>*!/*/}
        {/*          /!*  ) : (*!/*/}
        {/*          /!*    <button*!/*/}
        {/*          /!*      className="btn text-center w-100"*!/*/}
        {/*          /!*      onClick={() => handleShow(x._id)}*!/*/}
        {/*          /!*    >*!/*/}
        {/*          /!*      ADD <span className="text-success">+</span>{" "}*!/*/}
        {/*          /!*    </button>*!/*/}
        {/*          /!*  )}*!/*/}
        {/*          /!*</td>*!/*/}
        {/*          <td>*/}
        {/*            <select*/}
        {/*              id="status"*/}
        {/*              onChange={(e) => handleAction(e, x._id)}*/}
        {/*              selected*/}
        {/*              value={x.status}*/}
        {/*              style={{*/}
        {/*                background:*/}
        {/*                  x.status === "Rejected"*/}
        {/*                    ? "tomato"*/}
        {/*                    : x.status === "Pending"*/}
        {/*                    ? "orange"*/}
        {/*                    : "green",*/}
        {/*              }}*/}
        {/*            >*/}
        {/*              <option value="Rejected" className="bg-light">*/}
        {/*                Rejected*/}
        {/*              </option>*/}
        {/*              <option value="Pending" className="bg-light">*/}
        {/*                pending*/}
        {/*              </option>*/}
        {/*              <option value="Approved" className="bg-light">*/}
        {/*                Approved*/}
        {/*              </option>*/}
        {/*            </select>*/}
        {/*          </td>*/}
        {/*        </tr>*/}
        {/*      </tbody>*/}
        {/*    ))*/}
        {/*  )}*/}
        {/*</Table>*/}
      </div>

    </Container>
  );
};

export default DashBoard;
