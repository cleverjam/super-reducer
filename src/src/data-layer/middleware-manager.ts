import { AnyAction, Middleware, Dispatch } from "redux";
import { GlobalState } from "./createSlice";

let registry: Record<string, Array<Middleware<{}, GlobalState>>> = {};

const rootMiddleware: Middleware<{}, GlobalState> =
  (storeApi) => (next) => (action) => {
    console.log(action);
    return next(action);
  };

export function addMiddleware(
  id: string,
  middlewares: Array<Middleware<{}, GlobalState>>
) {
  if (registry[id]) throw new Error("This middleware already exists");
  else registry[id] = [rootMiddleware, ...middlewares];
}

const middleware: Middleware<{}, GlobalState> =
  (storeApi) => (next) => (action) => {
    console.log({ registry });
    console.log({ action });
    return next(action);
  };

export default middleware;
