import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Test from "./components/Test";
import { Provider } from "./context";
// import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import Lyrics from "./components/tracks/Lyrics";

class App extends Component {
  state = {};

  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/lyrics/:id" component={Lyrics} />
                <Route
                  render={() => (
                    <div>
                      <h1 className="display-4">
                        <span className="text-danger">404</span> Page Not Found
                      </h1>
                      <p className="lead">Sorry, that page does not exist</p>
                    </div>
                  )}
                />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
