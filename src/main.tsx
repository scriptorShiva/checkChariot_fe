import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//  React's Strict Mode, certain lifecycle methods and hooks are intentionally invoked twice to help identify side effects that could cause bugs in your application. This double invocation is a development feature and doesn't happen in production builds.
