import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import MainScreen from "./Screens/MainScreen";
import { store, persistor } from "./redux/store";

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainScreen />
      </PersistGate>
    </Provider>
  );
}
