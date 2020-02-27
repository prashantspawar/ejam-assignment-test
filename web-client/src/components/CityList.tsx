import React, { useState } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { CITIES_SELECTED } from "../actions/ActionTypes";
import { Dispatch } from "redux";

const CityList: React.FC = (props: any) => {
  const [cities, setCity] = useState([
    { name: "New York", woeid: 2459115 },
    { name: "Los Angeles", woeid: 2442047 },
    { name: "Chicago", woeid: 2379574 },
    { name: "Houston", woeid: 2424766 }
  ]);

  const [selectedCities, selectCities] = useState([] as any);

  let handleSelectedCity = (city: { name?: string; woeid: any }) => {
    let res: any = [];
    let wasPresent: boolean = false;
    for (let c of selectedCities) {
      if (c.woeid === city.woeid) {
        wasPresent = true;
        continue;
      }
      res.push(c);
    }
    if (wasPresent) {
      selectCities(res);
      return;
    }
    selectCities([...selectedCities, city]);
  };

  let isCitySelected = (city: { name?: string; woeid: any }) => {
    for (let c of selectedCities) {
      if (c.woeid === city.woeid) {
        return "warning";
      }
    }
    return "secondary";
  };
  return (
    <div
      style={{
        height: "100%",
        textAlign: "center",
        paddingTop: "10px"
      }}
    >
      <ListGroup style={{ height: "70%", overflowY: "scroll" }}>
        {cities.map((p, i) => {
          return (
            <ListGroupItem
              key={i}
              color={isCitySelected(p)}
              style={{ cursor: "pointer" }}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                handleSelectedCity(p);
              }}
            >
              <p>{p.name}</p>
            </ListGroupItem>
          );
        })}
      </ListGroup>
      <Button
        color="primary"
        style={{ textAlign: "center", marginTop: "20px" }}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          props.onCitySelected(selectedCities);
        }}
      >
        Get Weather
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onCitySelected: (cities: any) => {
      dispatch({ type: CITIES_SELECTED, payload: { cities } });
    }
  };
};

export default connect(null, mapDispatchToProps)(CityList);
