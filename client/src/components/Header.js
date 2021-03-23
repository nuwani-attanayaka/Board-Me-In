import React from "react";
import { withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "../helpers/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = ({ history }) => {
  const handleLogout = (evt) => {
    logout(() => {
      history.push("/");
    });
  };

  /****************************
   * VIEWS
   ***************************/

  const showNavigation = () => {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Board-Me-In</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>

          {/* FOR NON-LOGGEDIN USER */}
          {!isAuthenticated() && (
            <Nav>
              <NavDropdown title="Signup" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/ownersignup">
                  Owner Signup
                </NavDropdown.Item>
                <NavDropdown.Item href="/guestsignup">
                  Guest Signup
                </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                {/* <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
              <NavDropdown title="Login" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/ownerlogin">
                  Owner Login
                </NavDropdown.Item>
                <NavDropdown.Item href="/guestlogin">
                  Guest Login
                </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                {/* <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
              {/* <Nav.Link eventKey={2} href="/signup">
                <i className="fas fa-edit"></i> Signup
              </Nav.Link> */}
              {/* <Nav.Link href="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Nav.Link> */}
            </Nav>
          )}

          {/* FOR LOGGEDIN ADMIN */}
          {isAuthenticated() && isAuthenticated().role === 1 && (
            <Nav>
              <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
            </Nav>
          )}

          {/* FOR LOGGEDIN OWNER */}
          {isAuthenticated() && isAuthenticated().role === 2 && (
            <Nav>
              <Nav.Link href="/owner/dashboard">Dashboard</Nav.Link>
            </Nav>
          )}

          {/* FOR LOGGEDIN GUEST */}
          {isAuthenticated() && isAuthenticated().role === 3 && (
            <Nav>
              <Nav.Link href="/guest/dashboard">Dashboard</Nav.Link>
            </Nav>
          )}

          {/* FOR LOGGEDIN USER */}
          {isAuthenticated() && (
            <Nav>
              <Nav.Link onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  };

  /****************************
   * RENDER
   ***************************/

  return <header id="header">{showNavigation()}</header>;
};

export default withRouter(Header);
