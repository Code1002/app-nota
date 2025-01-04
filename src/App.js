import React, { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <Home />
      ) : (
        <Login onLogin={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;