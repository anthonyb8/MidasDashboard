// App.jsx
import React from "react";
import RouteHandler from "./components/RouteHandler.jsx";
import { BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Router>
      <RouteHandler />
    </Router>
  );
}

export default App;