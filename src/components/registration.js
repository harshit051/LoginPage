import React, { useState ,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
const qs = require('qs');



export default function Registration() {
  
  const [Email, setEmail] = useState("");
  const [FullName, setfullName] = useState("");
  const [pno, setPno] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [msg,setmsg] = useState("");

  
const history = useHistory();

  function validateForm() {
    return (
      Email.length > 0 &&
      FullName.length > 0 &&
      pno.length > 0 &&
      Password.length > 0 &&
      Password === confirmpassword
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    
   
    
   
    var data = qs.stringify({
      'email': Email,
      'password': Password,
      'phoneNumber': pno,
      'fullName': FullName,
    });
    var config = {
      method: "post",
      url: "http://localhost:5000/api/users/register",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if(response.data.success===true && response.data.message==="Successfully Signed Up"){
          history.push("/");
          localStorage.removeItem('ms');
        
        }
        else{
          setmsg("use different email id!!");
          localStorage.setItem('ms',"use different email id!!");
        }
        
       
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        setmsg("use different email id!!");
        localStorage.setItem('ms',"use different email id!!");
        

      });

    
  }
 
  useEffect(() => {
    localStorage.removeItem("loginmsg");
    setmsg(localStorage.getItem('ms'))
    
   
  }, []);

  return (
    <div>
      <Header name="Sign Up" logout={false} />

      <div className="login" style={{ padding: "10px" }}>
        <Form onSubmit={handleSubmit} method="GET">
          <h1>Sign Up</h1>
          <Form.Group controlId="Email" size="lg">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="fullname" size="lg">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={FullName}
              onChange={(e) => setfullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="phno" size="lg">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={pno}
              onChange={(e) => setPno(e.target.value)}
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
          <Form.Group controlId="confirmpassword" size="lg">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            block
            size="lg"
            type="submit"
            
            // variant="success"
            // isLoading={isLoading}
            disabled={!validateForm()}
            // onClick={handleSubmit}
          >
            Sign Up
          </Button>
          {msg}
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            Old User ? <Link to="/">click here</Link>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
}
