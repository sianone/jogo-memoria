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
        <label htmlFor="name">
          Nome
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <Link to={`/game`}>
          <button>Enviar</button>
        </Link>
      </form>
    </div>
  );
};

export default Greetings;
