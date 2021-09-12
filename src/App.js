import { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import Board from "./Board";

const App = () => {
  return <Board />;
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
