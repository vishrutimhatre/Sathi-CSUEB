import React, { useContext, useState } from "react";
import NavTop from "../NavTop/NavTop";
import { Link } from "react-router-dom";
import Group140 from "../../images/Group140.png";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { UserContext } from "../Context/Sign_In_Context";
import { useHistory } from "react-router-dom";
import {Data, DataContext} from "../Data";
const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [data, setData] = useContext(DataContext);
  const [email, setEmail] = useState("dan.lucas@gmail.com");
  const [pass, setPass] = useState("1234");
  const [err, setErr] = useState(false);
  let history = useHistory();

  const handleLogin = (props) => {


    console.log("======")
    let emails = []
    let selectedUser = ""
    let i=0
    console.log(data)
    for(i=0; i<data.length; i++){
      emails.push(data[i].email)
      if(email == data[i].email){
        selectedUser = data[i]
      }
    }




    if (email && pass) {
      console.log(email)
      console.log(emails)
      console.log(email in emails)
      console.log(pass === "1234")
      if (emails.includes(email) && pass === "1234") {
        setErr(false);
        const arr = {
          email: email,
          admin: true,
          selectedUser: selectedUser
        };
        setUser(arr);
        history.push("/dashboard");
      } else {
        setErr(true);
      }
    }
  };
  return (
    <Container>
      <Helmet>
        <title>Login | Parents Portal</title>
        <meta
          name="description"
          content="Now a days All things are based on Online. Find a good doctor is so  much hassle  now a days.
        Doctors portal is going to give you advantage that you don't need to go hospital physically.You can book and get the best treatment from now ."
        />
        <meta name="keywords" content="online doctors book appointment" />
      </Helmet>
      <NavTop></NavTop>
      <Row>
        <Col className="mx-md-auto my-md-auto text-center my-5" sm={6}>
          <Card className="p-md-5 p-2">
            <h3>Login</h3>
            <div className="form-box">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue="dan.lucas@gmail.com"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                defaultValue="1234"
              />
              <button className="btn btn-main w-100" onClick={handleLogin}>
                Login
              </button>
            </div>
            <h5>{err && "Nice try ! "}</h5>
          </Card>
        </Col>
        {/*<Col sm={6}>*/}
        {/*  <img src={Group140} alt="" className="img-fluid" />*/}
        {/*</Col>*/}
      </Row>
    </Container>
  );
};

export default Login;
