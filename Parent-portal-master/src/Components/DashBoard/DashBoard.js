import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Table, Spinner, Modal, Card } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import "./DashBoard.css";
import { DataContext } from "../Data";
import Hamburger from "../Hamburger/Hamburger";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {UserContext} from "../Context/Sign_In_Context";
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import img1 from '../../images/emotions/1.png'
import img3 from '../../images/emotions/3.png'
import img4 from '../../images/emotions/4.png'
import img5 from '../../images/emotions/5.png'
import img6 from '../../images/emotions/6.png'
import img7 from '../../images/emotions/7.png'
import img8 from '../../images/emotions/8.png'
import img9 from '../../images/emotions/9.png'
import {Link} from "react-router-dom";

const imageList = [img1, img3, img4, img5, img6, img7, img8, img9]

const DashBoard = () => {
  const [user, setUser] = useContext(UserContext);
  const [data, setData] = useContext(DataContext);
  const [startDate, setStartDate] = useState(new Date());
  const [parentMoodIndex, setParentMoodIndex] = useState("");
  const [childMoodIndex, setChildMoodIndex] = useState("");

  const [childsMood, setChildsMood] = useState({});
  const [parentsMood, setParentsMood] = useState({});
  const [saySomething, setSaySomething] = useState("");
  const [succ, setSucc] = useState(false);

  const [image,setImage] = useState(null);

  const onParentPick = (image) => {
      setParentMoodIndex(image.value +1)
      setImage({image})
  }

  const onChildPick = (image) => {
      setChildMoodIndex(image.value +1)
      setImage({image})
  }

  const handleSubmitButtonCLick = (event) => {
    let data = {
      "childsMood": {
              "year": startDate.getUTCFullYear(),
              "month": startDate.getMonth(),
              "day":startDate.getDate(),
              "score": parseInt(childMoodIndex)
          },
      "parentsMood": {
              "year": startDate.getUTCFullYear(),
              "month":startDate.getMonth(),
              "day":startDate.getDate(),
              "score": parseInt(parentMoodIndex)
          }
    }

    //fetch("http://localhost:5000/Appointment/" +user.selectedUser._id , {
    fetch("http://ec2-52-88-50-57.us-west-2.compute.amazonaws.com/Appointment/" +user.selectedUser._id , {
      method: "PUT",
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
  }

  const refreshPage = () =>{
        window.location.reload();
  }

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
        {!succ &&
              <div style={{ width: "330px", height: "700px"}}>
                  <div className="title__hamburger">
                      <h2 className="mt-5" style={{color:"#505050", fontSize: "220%"}}>Hello {user.selectedUser.parentsName}, how are you feeling today?</h2>
                  </div>
                  <div>
                      <ImagePicker
                      images={imageList.map((image, i) => ({src: image, value: i}))}
                      onPick={onParentPick}
                      style={{ width: "80px", height: "80px" }}
                      class="img_emotion"
                      />
                  </div>

                  <br/>
                  <br/>
                  <textarea
                      name='saySomething'
                      value={saySomething}
                      size="30"

                      placeholder="Want to say something?"
                      onChange={e => setSaySomething(e.target.value)}
                  />

                  <br/>
                  <br/>

                  <div className="title__hamburger">
                  <h2 className="mt-5" style={{color:"#505050", fontSize: "220%"}}>How was {user.selectedUser.firstname}'s day today?</h2>
                  </div>

                  <ImagePicker
                  images={imageList.map((image, i) => ({src: image, value: i}))}
                  onPick={onChildPick}
                  />


                  <br/>
                  <br/>

                  <textarea
                      name='saySomething'
                      value={saySomething}
                      size="30"

                      placeholder="Want to say something?"
                      onChange={e => setSaySomething(e.target.value)}
                  />
                  <br/>
                  <br/>

                  <button className="btn btn-main" onClick={e=> handleSubmitButtonCLick(e)}>Submit</button>


              </div>

        }

        <h5>{succ &&
            <div class='fullscreenDiv'>
                <br/>
                <text  class="center1" style={{color:"#4c2200" , fontSize: "120%"}}>Thank you for telling me about your day!</text>
                <text  class="center2" style={{color:"#4c2200" , fontSize: "80%"}}>Checkout homework given by your therapist</text>
                <Link to="/homework" class="center2" style={{marginTop: "130px"}}>
                    <button className="btn btn-main" style={{width: "250px", background:"#fff1ec", color:"#4c2200",height: "48px",  marginLeft: "-18px"}}>Go To Homework</button>
                </Link>
            </div>
        }</h5>

      </div>
    </Container>
  );
}

export default DashBoard;
