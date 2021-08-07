import Landing from "components/Landing";
import Phone from "components/Phone";
import Screen1 from "components/Screen1";
import Screen2 from "components/Screen2";
import Screen3 from "components/Screen3";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "sass/_index.scss";
import store from "store";

class App extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/screen1" component={Screen1} />
              <Route exact path="/screen2" component={Screen2} />
              <Route exact path="/screen3" component={Screen3} />
              <Route exact path="/phone" component={Phone} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  };
}

export default App;
