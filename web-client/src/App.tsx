import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Container, Row, Col } from "reactstrap";
import CityList from "./components/CityList";
import CityWeather from "./components/CityWeather";

const App: React.FC = () => {
  return (
    <Container
      fluid={true}
      style={{
        height: "100vh",
        width: "100%",
        padding: "20px",
        backgroundColor: "#28a745"
      }}
    >
      {/* City list */}
      <Row
        style={{
          height: "45%",
          width: "100%"
        }}
      >
        <Col
          sm="12"
          xs="12"
          md={{ size: 8, offset: 2 }}
          lg={{ size: 8, offset: 2 }}
          style={{ height: "100%", width: "100%" }}
        >
          <CityList />
        </Col>
      </Row>

      {/* City Weather Details */}
      <Row
        style={{
          height: "55%",
          width: "100%"
        }}
      >
        <Col
          sm="12"
          xs="12"
          md={{ size: 8, offset: 2 }}
          lg={{ size: 8, offset: 2 }}
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            padding: "auto",
            justifyContent: "center"
          }}
        >
          <CityWeather />
        </Col>
      </Row>
    </Container>
  );
};

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
