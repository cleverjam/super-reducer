import { combineReducers, createStore, Reducer } from "redux";
import * as global from "./reducers";
import widgets from "./reducers/widgets";

const widgetsData: Record<string, Reducer> = {};

const store = createStore(
  combineReducers({
    ...global,
    widgets: combineReducers({
      _root: widgets,
    }),
  }),
  {},
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// @ts-ignore
export function injectWidgetReducer(widgetId: string, reducer: Reducer) {
  console.log({ widgetId, widgetsData });
  if (!widgetsData[widgetId]) {
    widgetsData[widgetId] = reducer;
  } else {
    throw new Error(
      "A reducer has already been registered for this widget Id."
    );
  }

  // @ts-ignore
  store.replaceReducer(
    // @ts-ignore
    combineReducers({
      ...global,
      // @ts-ignore
      widgets: combineReducers({
        // @ts-ignore
        ...widgetsData,
        _root: widgets,
      }),
    })
  );

  return store;
}

export default store;
