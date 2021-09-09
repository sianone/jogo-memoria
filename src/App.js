import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import SimpleContainer from "./SimpleContainer";

const App = () => {
  return (
      <SimpleContainer/>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
