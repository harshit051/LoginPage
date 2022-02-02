import React from "react";
import { Navbar, Nav,NavDropdown } from "react-bootstrap";
import {AuthContext} from './context';

export default function Header(props) {
  const {signOut} = React.useContext(AuthContext);
  function handleLogout() {
    signOut();
}
  return (
    <div>
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Navbar.Brand >{props.name}</Navbar.Brand>
        
        
        {(props.logout)?
        <Navbar bg="light" expand="lg" >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
         
      <NavDropdown title={props.names} id="basic-nav-dropdown">  
        <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
      </NavDropdown>
         
        </Navbar.Collapse>
        </Navbar>:
        <Nav></Nav>
        }
      </Navbar>
    </div>
  );
}
