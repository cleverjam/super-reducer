import React from "react";
import store, { injectWidgetReducer } from "./store";
import { combineReducers, Reducer, Store } from "redux";
import { Provider } from "react-redux";
import { addMiddleware } from "./middleware-manager";

type Props = {
  widgetId: string;
  reducer?: Reducer;
};

type State = {
  store: Store;
};

export default class DataProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { store };
  }
  componentDidMount() {
    const defaultReducer: Reducer = combineReducers({});
    const middlewares = [];
    this.setState({
      store: injectWidgetReducer(
        this.props.widgetId,
        this.props.reducer || defaultReducer
      ),
    });
    addMiddleware(this.props.widgetId, []);
  }
  render() {
    return <Provider store={this.state.store}>{this.props.children}</Provider>;
  }
}
