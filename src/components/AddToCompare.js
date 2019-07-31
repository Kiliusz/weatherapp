import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormCity from "./FormCIty";

const AddToCompare = ({ addToCompare }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="light" size="sm" onClick={handleShow}>
        City comparison
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add city to compare the weather</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormCity closeModal={handleClose} onSubmit={addToCompare} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddToCompare;
