import React from "react";
import { Provider } from "react-redux";
import store from "./data-layer/store";
import { WidgetA } from "./widgetA";
import { WidgetB } from "./widgetB";

function App() {
  return (
    <Provider store={store}>
      <h1>Data layer super reducer POC</h1>
      <WidgetA />
      <WidgetB />
    </Provider>
  );
}

export default App;
