import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { isObject } from "../helpers";

const CityWeather: React.FC = (props: any) => {
  const [displayData, setDisplayData] = useState([]);
  const [respError, setRespError] = useState("");
  useEffect(() => {
    if (props.cities.length) {
      let citiesArr = props.cities.map((value: any) => value.name);
      console.log("citiesArr: ", citiesArr);
      fetch(`${process.env.REACT_APP_API_URL}/v1.0/weather/get-weather/city`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(citiesArr)
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data: { data: [] }) {
          console.log("Data: ", data);
          console.log("isObject(data): ", isObject(data));
          if (isObject(data)) {
            setRespError("");
            setDisplayData(data.data);
            console.log("setDisplayData Called");
          } else {
          }
          console.log(data);
        })
        .catch(function(e) {
          setRespError("Some Error Occured From Server Side");
          console.log(e);
        });
    }
  }, [props.cities]);

  if (respError.length) {
    return (
      <div style={{ color: "yellow" }}>
        <p>{respError}</p>
      </div>
    );
  }

  if (!displayData.length) {
    return (
      <div style={{ color: "white" }}>
        <p>No City Selected</p>
      </div>
    );
  }
  return (
    <ListGroup style={{ height: "100%", maxHeight: "100%", overflowY: "auto" }}>
      {displayData.map((p: any, i) => {
        return (
          <ListGroupItem key={i} className="justify-content-between">
            {console.log("p: ", p)}
            {getWeather(p)}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

function getWeather(data: {}) {
  let res = "";
  console.log("data111111: ", data);

  Object.entries(data).forEach(function(item, key) {
    console.log("item: ", item);
    item.forEach(function(i: any, k) {
      if (k) {
        console.log("i: ", i.data.current_observation.condition);
        Object.entries(i.data.current_observation.condition).forEach(function(
          condition,
          keyCondition
        ) {
          res += keyCondition + " : " + condition;
        });
      } else {
        res += "City : " + i;
      }
    });
  });

  return res;
}
const mapStateToProps = function(state: { cities: any }) {
  return {
    cities: state.cities
  };
};

export default connect(mapStateToProps)(CityWeather);
