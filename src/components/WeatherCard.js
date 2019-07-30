import React from "react";
import propTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import styles from "./WeatherCard.module.css";

const WeatherCard = ({ weather }) => (
  <Card className={styles.card}>
    <div className={styles.weatherIconWrapper}>
      <img
        className={styles.weatherIcon}
        src={`http://openweathermap.org/img/wn/${weather.iconCode}@2x.png`}
        alt=""
      />
    </div>
    <Card.Body className="p-2 p-sm-4">
      <Card.Title className="text-center">{weather.dayOfWeek}</Card.Title>
      <Row className="d-flex justify-content-center m-0">
        {/* <Card.Text className="m-0">Avg. </Card.Text> */}
        <Card.Text className="m-0 font-weight-bold">
          {weather.avgTemp} °C
        </Card.Text>
      </Row>
      <Row className="d-flex justify-content-between m-0">
        <Card.Text className="m-0">Min. </Card.Text>
        <Card.Text className="m-0">{weather.minTemp} °C</Card.Text>
      </Row>
      <Row className="d-flex justify-content-between m-0">
        <Card.Text className="m-0">Max. </Card.Text>
        <Card.Text className="m-0">{weather.maxTemp} °C</Card.Text>
      </Row>
      <Row className="d-flex justify-content-between mt-1 mx-0">
        <Card.Text className="m-0">Clouds </Card.Text>
        <Card.Text className="m-0">{weather.avgClouds} % </Card.Text>
      </Row>
      <Row className="d-flex justify-content-between mt-1 mx-0">
        <Card.Text className="m-0">Wind </Card.Text>
        <Card.Text className="m-0">{weather.avgWind} m/s </Card.Text>
      </Row>
      <Row className="d-flex justify-content-between mt-1 mx-0">
        <Card.Text className="m-0">Humid.</Card.Text>
        <Card.Text className="m-0">{weather.avgHumidity} % </Card.Text>
      </Row>
    </Card.Body>
  </Card>
);

export default WeatherCard;

WeatherCard.propTypes = {
  weather: propTypes.shape({
    avgClouds: propTypes.number,
    avgHumidity: propTypes.number,
    avgTemp: propTypes.number,
    avgWind: propTypes.number,
    maxTemp: propTypes.number,
    minTemp: propTypes.number,
    dayOfWeek: propTypes.string,
    iconCode: propTypes.string,
  }).isRequired,
};
