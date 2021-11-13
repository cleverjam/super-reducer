import { combineReducers } from "redux";
import createSlice from "../data-layer/createSlice";

interface State {
  isLoading: boolean;
  data: { foo: string };
}

// @ts-ignore
const isLoading = (state = false, { type }) => {
  if (type === "LOAD") return true;
  return state;
};
const data = (state = { foo: "bar" }) => state;

const reducer = combineReducers<State>({ isLoading, data });

const getIsLoading = (state: State) => {
  return state.isLoading;
};

export default createSlice<State>({
  id: "widgetA",
  reducer,
  selectors: { getIsLoading },
});
