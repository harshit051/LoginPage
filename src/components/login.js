import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "./context";
import { Link } from "react-router-dom";
import axios from "axios";
const qs = require('qs');

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [msg, setmsg] = useState("");
  // const [user, setUser] = useState();

  const { signIn } = React.useContext(AuthContext);

  useEffect(() => {
    localStorage.removeItem("ms");
    setmsg(localStorage.getItem("loginmsg"));
    // const loggedInUser = localStorage.getItem("user");
    // if (loggedInUser) {
    //   const foundUser = loggedInUser;
    //   // setUser(foundUser);
    // }
  }, []);

  function validateForm() {
    return Email.length > 0 && Password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    var data = qs.stringify({
      email: Email,
      password: Password,
    });
    var config = {
      method: "post",
      url: "http://localhost:5000/api/users/login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Cookie:
        //   "authToken=eyJhbGciOiJIUzI1NiJ9.NjBjNzA0OGQ1MzM2MTUyN2Y4YzE1NmU4.szyNvIXD3q7e7JsLyxiy-nf8W7dMfAogehicWz5Yil0",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if(response.data.success===true && response.data.message==="Successfully Logged In!"){
          console.log(JSON.stringify(response.data));
          localStorage.removeItem("loginmsg");
          setEmail("");
          setPassword("");
          const d = response.data.userData;
          signIn(Object.values(d));

        }
        else
        {
          setmsg("username & password incorrect!!");
          localStorage.setItem('loginmsg',"username & password incorrect!!");
        }
        
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        setmsg("username & password incorrect!!");
        localStorage.setItem('loginmsg',"username & password incorrect!!");
      });
  }
  return (
    <div>
      <Header name="Log In" logout={false} />

      <div className="login">
        <Form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <Form.Group controlId="email" size="lg">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" size="lg">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            block
            size="lg"
            type="submit"
            // variant="success"
            // isLoading={isLoading}
            disabled={!validateForm()}
          >
            Log In
          </Button>
          {msg}
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            New User ? <Link to="/registration">Registred Here</Link>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
}
