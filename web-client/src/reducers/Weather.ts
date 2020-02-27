import * as ActionType from "../actions/ActionTypes";

const initalState = {
  cities: []
};

const reducer = (
  state = initalState,
  action: { type: any; payload: { cities: any } }
) => {
  switch (action.type) {
    case ActionType.CITIES_SELECTED:
      return {
        ...state,
        cities: action.payload.cities
      };

    default:
      return state;
  }
};

export default reducer;
