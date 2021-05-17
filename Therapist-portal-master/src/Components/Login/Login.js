import React, { useContext, useState } from "react";
import NavTop from "../NavTop/NavTop";
import { Link } from "react-router-dom";
import Group140 from "../../images/Group140.png";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { UserContext } from "../Context/Sign_In_Context";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("vm@gmail.com");
  const [pass, setPass] = useState("1234");
  const [err, setErr] = useState(false);
  let history = useHistory();

  const handleLogin = () => {
    if (email && pass) {
      if (email === "vm@gmail.com" && pass === "1234") {
        setErr(false);
        const arr = {
          email: email,
          admin: true,
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
        <title>Login | Therapist Portal</title>
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
                defaultValue="vm@gmail.com"
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
      </Row>
    </Container>
  );
};

export default Login;
