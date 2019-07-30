import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import FormCity from "./components/FormCIty";
import NavbarComp from "./components/NavbarComp";
import WeatherGroup from "./components/WeatherGroup";
import * as Help from "./helpers/helpersFunctions";

class App extends React.Component {
  state = {
    weather: [],
    weatherCompare: [],
    city: "",
    cityCompare: "",
    isGeoLoc: true,
    errorMsg: "",
    errorMsgCompare: "",
  };

  componentDidMount() {
    this.getWeatherFromGeoLoc();
  }

  handleSubmitWeather = async (values) => {
    const data = await this.getWeather(values);
    if (data.err) {
      this.setState({
        weather: [],
        city: "",
        errorMsg: data.errorMsg,
      });
    } else {
      this.setState({
        weather: data.weather,
        city: data.city,
        errorMsg: "",
        isGeoLoc: false,
      });
    }
  };

  handleSubmitCompareWeather = async (values) => {
    const data = await this.getWeather(values);
    if (data.err) {
      this.setState({
        weatherCompare: [],
        cityCompare: "",
        errorMsgCompare: data.errorMsg,
      });
    } else {
      this.setState({
        weatherCompare: data.weather,
        cityCompare: data.city,
        errorMsgCompare: "",
      });
    }
  };

  getWeatherFromGeoLoc = () => {
    const options = {
      timeout: 3000,
      maximumAge: 0,
    };
    const logPosition = async (pos) => {
      const data = await Help.getWeatherGeoLoc(
        pos.coords.latitude,
        pos.coords.longitude,
      );
      const weather = Help.dataProvider(data.data.list);
      this.setState({ weather, city: data.data.city.name });
    };
    const logError = (error) => {
      this.setState({ isGeoLoc: false });
      return error;
    };
    navigator.geolocation.getCurrentPosition(logPosition, logError, options);
  };

  getWeather = async (values) => {
    try {
      const data = await Help.getWeather(values.city, values.country);
      const weather = Help.dataProvider(data.data.list);
      const city = data.data.city.name;
      return { err: false, weather, city };
    } catch (error) {
      return { err: true, errorMsg: "Couldn't get weather, check spelling" };
    }
  };

  render() {
    const {
      weather,
      city,
      isGeoLoc,
      errorMsg,
      weatherCompare,
      errorMsgCompare,
      cityCompare,
    } = this.state;

    return (
      <div className="App">
        <NavbarComp
          canCompare={city}
          addToCompare={this.handleSubmitCompareWeather}
        />
        <Container>
          <Row className="justify-content-center">
            <FormCity onSubmit={this.handleSubmitWeather} />
          </Row>
          {isGeoLoc && city && (
            <Alert variant="secondary" className="text-center">
              Forecast weather based on geolocation -{" "}
              <span className="font-weight-bold">{city}</span>
            </Alert>
          )}
          {city && !isGeoLoc && (
            <Alert variant="secondary" className="text-center">
              Forecast weather based on user Input -{" "}
              <span className="font-weight-bold">{city}</span>
            </Alert>
          )}
          {errorMsg && (
            <Alert variant="danger" className="text-center">
              {errorMsg}
            </Alert>
          )}
          {weather && <WeatherGroup weather={weather} />}

          {errorMsgCompare && (
            <Alert variant="danger" className="text-center">
              {errorMsgCompare}
            </Alert>
          )}
          {cityCompare && (
            <Alert variant="secondary" className="text-center">
              Forecast weather based on user Input -{" "}
              <span className="font-weight-bold">{cityCompare}</span>
            </Alert>
          )}
          {weatherCompare && <WeatherGroup weather={weatherCompare} />}
        </Container>
      </div>
    );
  }
}
export default App;
