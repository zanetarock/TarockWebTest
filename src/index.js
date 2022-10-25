import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import {persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
let persistor=persistStore(store)

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
 
  </StrictMode>
);
