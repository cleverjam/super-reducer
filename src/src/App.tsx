import React from "react";
import { Provider } from "react-redux";
import { store } from "./data-layer";
import { WidgetA } from "./widgetA";
import { WidgetB } from "./widgetB";

function App() {
  console.log(store);
  return (
    <Provider store={store}>
      <h1>Data layer super reducer POC</h1>
      <WidgetA />
      <hr />
      <WidgetB />
    </Provider>
  );
}

export default App;
