import React, { useEffect, useState, useContext } from "react";
import SideBar from "../SideBar/SideBar";
import {Container, Row, Col, Table, Spinner, Card} from "react-bootstrap";
import { DataContext } from "../Data";
import Hamburger from "../Hamburger/Hamburger";
import { Helmet } from "react-helmet";
import {Link} from "react-router-dom";
import {child} from "../../images/Ellipse1.png"

const Patients = () => {
  const [data, setData] = useContext(DataContext);
  const [user, setUser] = useState([]);
  const [userInfo, setUserInfo] = useState([]);


  useEffect(() => {
    if (data.length !== 0) {
      const uniq = [...new Set(data.map((x) => x.firstname))];
      setUser(uniq);
    }
  }, [data]);
  useEffect(() => {
    if (user.length !== 0) {
      const fake = user.map((x) => {
        const te = data.find((y) => y.firstname === x);
        return te;
      });
      setUserInfo(fake);
    }
  }, [user, data]);

  const handleClick = (e) => {
    this.router.transitionTo('index');
  }

  const handleSubmitButtonCLick = (event) => {

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
          <h2 className="mt-3">Total Number of kids: {userInfo.length}</h2>
          <Hamburger></Hamburger>
          <Link to="/addChild">
            <button className="btn btn-main">Add New</button>
          </Link>
        </div>

        <br/>

          <Card style={{ flexDirection: "row"}}>
          {userInfo.length === 0 ? (
              <Spinner animation="border" variant="warning" />
          ) : (

              userInfo.map((x, index) => (
                  <div className='UserCard'>
                    <div className='UserCardTop'>
                      <br/>
                      <img src={x.profilePicture} className="img-fluid" />
                    </div>
                    <div className='UserCardBottom'>

                      <br/>

                      <text style={{fontWeight:"600", color:"#4D2200"}}> {x.firstname}</text>
                      {/*<br/>*/}
                      {/*<text>Email: {x.email}</text>*/}
                      <br/>
                      <text>Age: {x.age}</text>
                      {/*<br/>*/}
                      {/*<text>Parent Name: {x.parentsName}</text>*/}
                      <br/>
                      <Link to={{
                        pathname: "/KidsDetails/"+x._id
                      }} >View Details</Link>
                    </div>
                  </div>
              ))

          )}
          </Card>


        {/*<Table responsive="sm">*/}
        {/*  <thead>*/}
        {/*    <tr>*/}
        {/*      <th>Sr.No.</th>*/}
        {/*      <th>Name</th>*/}
        {/*      <th>Age</th>*/}
        {/*      <th>E-mail</th>*/}
        {/*      <th>Contact</th>*/}
        {/*      <th>Details</th>*/}
        {/*    </tr>*/}
        {/*  </thead>*/}

        {/*  {userInfo.length === 0 ? (*/}
        {/*    <Spinner animation="border" variant="warning" />*/}
        {/*  ) : (*/}
        {/*    userInfo.map((x, index) => (*/}
        {/*      <tbody>*/}
        {/*        <tr>*/}
        {/*          <td>{index + 1}</td>*/}
        {/*          <td>{x.firstname}</td>*/}
        {/*          <td>{x.age}</td>*/}
        {/*          <td>{x.email}</td>*/}
        {/*          <td>{x.phone}</td>*/}
        {/*          <td>*/}
        {/*               <Link to={{*/}
        {/*                 pathname: "/KidsDetails/"+x._id*/}
        {/*               }} >View Details</Link>*/}

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

export default Patients;
