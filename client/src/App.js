import Landing from "components/Landing";
import NotFound from "components/NotFound";
import Phone from "components/Phone";
import Workflow from "components/Workflow";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "sass/_index.scss";
import store from "store";

class App extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/workflow/*" element={<Workflow />} />
            <Route path="/phone" element={<Phone />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  };
}

export default App;
