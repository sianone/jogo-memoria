import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board";

const App = () => {
  return (
    <div>
      <h1>Teste</h1>
      <Board/>
    </div>
  );
};

ReactDOM.render(
    <App />,
  document.getElementById("divtest")
);
