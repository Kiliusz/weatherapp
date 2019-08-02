import React from "react";
import Form from "react-bootstrap/Form";
import propTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Formik } from "formik";
import * as yup from "yup";

const ValidationSchema = yup.object().shape({
  city: yup
    .string()
    .min(2, "Too short city name")
    .matches(/(^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż\s]{2,}$)/i, "Invalid city name")
    .required("This field is required"),
  country: yup
    .string()
    .min(2, "Too short country name")
    .matches(/(^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż\s]{2,}$)/i, "Invalid country name")
    .required("This field is required"),
});

const FormCity = ({ onSubmit, closeModal }) => (
  <Formik
    validationSchema={ValidationSchema}
    initialValues={{
      city: "",
      country: "",
    }}
    onSubmit={(values) => {
      onSubmit(values);
      if (closeModal) {
        closeModal();
      }
    }}
  >
    {({ handleSubmit, handleChange, values, handleBlur, errors, touched }) => (
      <Form onSubmit={handleSubmit} className="m-3">
        <Form.Row>
          <Col>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                type="text"
                placeholder="Enter city"
                onChange={handleChange}
                value={values.city}
                onBlur={handleBlur}
                isInvalid={errors.city && touched.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                name="country"
                type="text"
                placeholder="Enter country"
                onChange={handleChange}
                value={values.country}
                onBlur={handleBlur}
                isInvalid={errors.country && touched.country}
              />
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Button type="submit" variant="secondary" block>
          Get Weather
        </Button>
      </Form>
    )}
  </Formik>
);
export default FormCity;

FormCity.propTypes = {
  onSubmit: propTypes.func.isRequired,
  closeModal: propTypes.func,
};

FormCity.defaultProps = {
  closeModal: null,
};
