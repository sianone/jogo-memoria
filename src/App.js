import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Board from "./Board";
import Greetings from "./Greetings";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/game">
          <Board />
        </Route>
        <Route path="/">
          <Greetings />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
