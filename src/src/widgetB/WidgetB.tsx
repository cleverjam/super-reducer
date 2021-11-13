import DataProvider from "../data-layer/DataProvider";
import slice from "./slice";
import { useDispatch, useSelector } from "react-redux";

export default function WidgetB() {
  const isLoading = useSelector(slice.selectors?.getIsLoading!);
  const dispatch = useDispatch();
  return (
    <DataProvider widgetId={slice.id} reducer={slice.reducer}>
      <h3>widget a</h3>
      <p>State:{isLoading.toString()}</p>
      <button onClick={() => dispatch({ type: `${slice.id}/TOGGLE` })}>
        START
      </button>
    </DataProvider>
  );
}
