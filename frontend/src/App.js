import React from "react";
import Navbar from "./components/navbar/Navbar.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateProduct from "./components/products/CreateForm";
import ServicePage from "./components/products/ServicePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/service/:id" children={<ServicePage />} />
        </Switch>

        <Switch>
          <Route path="/new/service" children={<CreateProduct />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
