import { combineReducers } from "redux";
import { createSlice } from "../data-layer";

interface State {
  isLoading: boolean;
  data: { foo: string };
}

// @ts-ignore
const isLoading = (state = false, { type }) => {
  if (type === "TOGGLE") return !state;
  return state;
};
const data = (state = { foo: "bar" }) => state;

const reducer = combineReducers<State>({ isLoading, data });

const getIsLoading = (state: State) => {
  return state.isLoading;
};

export default createSlice<State>({
  id: "widgetB",
  reducer,
  selectors: { getIsLoading },
});
