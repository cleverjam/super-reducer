import { AnyAction, Reducer } from "redux";

type GlobalState<T> = { widgets: { [id: string]: T } };
type GlobalSelector<T> = (state: GlobalState<T>) => any;
type LocalSelector<T> = (state: T) => any;

type Selectors<T> = Record<string, T>;

interface Slice<T> {
  id: string;
  reducer?: Reducer;
  selectors?: Selectors<T>;
}

function composeSelectors<T>(
  id: string,
  selectors?: Selectors<LocalSelector<T>>,
  initialState?: T
): Selectors<GlobalSelector<T>> | undefined {
  if (!selectors || !initialState) return;
  return Object.entries(selectors).reduce<Selectors<GlobalSelector<T>>>(
    (result, [name, selector]) => {
      result[name] = (state: GlobalState<T>) =>
        selector(state.widgets[id] || initialState);
      return result;
    },
    {}
  );
}

function composeReducer<T>(
  id: string,
  reducer: Reducer,
  initialState: T
): Reducer<T, AnyAction> {
  return (state = initialState, { type, payload }) => {
    let prefix = `${id}/`;
    if (type.startsWith(prefix)) {
      return reducer(state, { type: type.replace(prefix, ""), payload });
    }
    return state;
  };
}

export default function createSlice<T>({
  id,
  selectors,
  reducer,
}: Slice<LocalSelector<T>>): Slice<GlobalSelector<T>> {
  if (!reducer && selectors)
    throw new Error(
      "Without reducers, there is no local slice, selectors are unnecessary."
    );

  // @ts-ignore
  const initialState = reducer && reducer({}, {});

  return {
    id,
    selectors: composeSelectors<T>(id, selectors, initialState),
    reducer: reducer
      ? composeReducer<T>(id, reducer, initialState)
      : (state) => state,
  };
}
