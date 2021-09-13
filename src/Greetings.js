import { useState } from "react";
import { Link } from "react-router-dom";

const Greetings = () => {
  const [name, setName] = useState("");

  return (
    <div className="container">
      <h1>Bem vindo!</h1>
      <h2>Entre seu nome para continuar</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="login-name">
          Nome
          <input
            id="login-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <Link to={{ pathname: "/game", state: { name } }}>
          <div className="name-button">
            <button>Enviar</button>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Greetings;
