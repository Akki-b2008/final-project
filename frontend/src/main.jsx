import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store/store.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import "./styles/theme.scss";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </Provider>
);
