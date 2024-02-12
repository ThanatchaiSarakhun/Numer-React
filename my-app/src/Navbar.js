import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter as Router,Routes,Link,Route} from 'react-router-dom';
import Bisection from './Bisection';
import False_position from './False_position';
import Secant from './Secant';

function CollapsibleExample() {
  return (
    <Router>
    <Navbar collapseOnSelect expand="lg" variant={"dark"} bg="dark">
      <Container>
        <Navbar.Brand href="#">Numer</Navbar.Brand>
        <Navbar.Toggle aria-controls="Numer" />
        <Navbar.Collapse id="Numer">
          <Nav className="me-auto">
            <Navbar.Brand href="#">Thanatchai Sarakhun</Navbar.Brand>
            <NavDropdown title="Root of Equation" id="collasible-nav-dropdown">
              <NavDropdown.Item as = {Link} to = {"/Bisection"}>Bisection</NavDropdown.Item>
              <NavDropdown.Item as = {Link} to = {"/False_position"}>False_position</NavDropdown.Item>
              <NavDropdown.Item as = {Link} to = {"/Secant"}>Secant</NavDropdown.Item>
              <NavDropdown.Item as = {Link} to = {"/Newtonraphson"}>Newtonraphson</NavDropdown.Item>
              <NavDropdown.Item as = {Link} to = {"/Cramer's Rule"}>Cramer's Rule</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
        <Route path = "/Bisection" element={<Bisection/>}></Route>
        <Route path = "/False_position" element={<False_position/>}></Route>
        <Route path = "/Secant" element={<Secant/>}></Route>
    </Routes>
    </Router>
  );
}
export default CollapsibleExample;