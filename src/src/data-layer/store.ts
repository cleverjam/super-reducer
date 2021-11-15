import { combineReducers, createStore, Reducer, applyMiddleware } from "redux";
import MiddlewareManager from "./middleware-manager";
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
  applyMiddleware(MiddlewareManager)
);

// @ts-ignore
export function injectWidgetReducer(widgetId: string, reducer: Reducer) {
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
export function injectWidgetMiddlewares(middlewares = []) {}
export default store;
