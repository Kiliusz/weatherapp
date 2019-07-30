import React from "react";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import AddToCompare from "./AddToCompare";

const NavbarComp = ({ addToCompare, canCompare }) => (
  <Navbar bg="dark" className="mb-1">
    <Container className="d-flex justify-content-between">
      <Navbar.Brand className="text-white" href="#home">
        weatherApp
      </Navbar.Brand>
      {canCompare && <AddToCompare addToCompare={addToCompare} />}
    </Container>
  </Navbar>
);

export default NavbarComp;

NavbarComp.propTypes = {
  addToCompare: PropTypes.func.isRequired,
  canCompare: PropTypes.string.isRequired,
};
