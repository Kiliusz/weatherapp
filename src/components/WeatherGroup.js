import React from "react";
import propTypes from "prop-types";
import Row from "react-bootstrap/Row";
import uuid from "uuid";
import Col from "react-bootstrap/Col";
import WeatherCard from "./WeatherCard";

const WeatherGroup = ({ weather }) => (
  <Row>
    {weather.map((oneDayOfWeather) => (
      <Col key={uuid()} lg md={4} xs={6}>
        <WeatherCard weather={oneDayOfWeather} />
      </Col>
    ))}
  </Row>
);

export default WeatherGroup;

WeatherGroup.propTypes = {
  weather: propTypes.arrayOf(propTypes.object).isRequired,
};
