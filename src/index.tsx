import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </DndProvider>
    </HelmetProvider>
  </React.StrictMode>,
);

reportWebVitals();
