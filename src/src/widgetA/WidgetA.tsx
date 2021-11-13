import DataProvider from "../data-layer/DataProvider";
import slice from "./slice";
import { useDispatch, useSelector } from "react-redux";

export default function WidgetA() {
  const isLoading = useSelector(slice.selectors?.getIsLoading!);
  const dispatch = useDispatch();
  // console.log(isLoading);
  return (
    <DataProvider widgetId={slice.id} reducer={slice.reducer}>
      <p>widget a</p>
      {isLoading.toString()}
      <button onClick={() => dispatch({ type: `${slice.id}/LOAD` })}>
        START
      </button>
    </DataProvider>
  );
}
