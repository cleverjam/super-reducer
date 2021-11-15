import { DataProvider } from "../data-layer";
import slice from "./slice";
import { useDispatch, useSelector } from "react-redux";

export default function WidgetA() {
  const isLoading = useSelector(slice.selectors?.getIsLoading!);
  const dispatch = useDispatch();
  return (
    <DataProvider widgetId={slice.id} reducer={slice.reducer}>
      <h3>widget a</h3>
      <p>State:{isLoading.toString()}</p>
      <button onClick={() => dispatch({ type: "TOGGLE" })}>START</button>
    </DataProvider>
  );
}
