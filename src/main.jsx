import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { Suspense } from "react";
import Loader from "./components/Loader.jsx";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </AppProvider>
);