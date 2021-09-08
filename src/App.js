import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Board from "./Board";

const App = () => {
  return (
    <div>
      <h1>Joguinho</h1>
      <Board />
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
