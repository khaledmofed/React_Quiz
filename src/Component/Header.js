import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
function Header() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" className="nav-link" end>
              METACHAIN
            </NavLink>
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link" end>
              List User
            </NavLink>

            <NavLink to="/add" className="nav-link">
              Add User
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
