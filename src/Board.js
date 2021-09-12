import React from "react";
import { useState, useEffect } from "react";
import EndModal from "./EndModal";

//const numbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const numbers = ["I", "II", "III", "IV", "V"];
const numbersCopy = numbers.slice();
const DECK = numbers.concat(numbersCopy); //array de 20 cartas, 10 pares

const Board = () => {
  const [shuffled, setShuffled] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [round, setRound] = useState("");
  const faceUp = [];
  let countRound = 1;
  let countScore = 0;
  let countFaceUp = 0;
  let cardCache = [];
  let indexCache = [];

  // Embaralha 1 vez no render da página.
  useEffect(() => {
    shuffleDeck(DECK);
  }, []);

  function shuffleDeck(array) {
    var currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    const arr = array;
    console.log(arr);

    setShuffled(arr);
  }

  // Verifica se a carta está virada ou não.
  // Só acontece algo, se a carta estiver virada para baixo em seu estado inicial.
  function flipCard(index, shuffled) {
    let selectCard = document.getElementById(index);

    console.log(selectCard);
    {
      faceUp[index]
        ? null
        : ((faceUp[index] = true),
          countFaceUp++,
          showCard(selectCard, shuffled),
          checkCards(index, shuffled));
    }

    console.log(faceUp[index]);
  }

  function showCard(element, card) {
    element.style.backgroundColor = "purple";
    element.textContent = card;
  }

  // Verifica os valores das cartas viradas, verificação funciona em pares
  function checkCards(index, card) {
    let updateBoard = document.getElementById("roundBoard");

    cardCache.push(card);
    indexCache.push(index);
    console.log(cardCache);
    console.log(indexCache);

    console.log("faceup" + countFaceUp);

    if (countFaceUp === 2) {
      if (cardCache[0] == cardCache[1]) {
        countScore++;
      } else {
        hideCards();
      }

      countRound++;

      console.log("Round" + countRound);
      console.log("Score" + countScore);

      indexCache = [];
      cardCache = [];
      countFaceUp = 0;
      checkWin();

      updateBoard.textContent = countRound;
    }
  }

  // Esconde o par de carta selecionado, caso não foi um acerto
  function hideCards() {
    const [card1, card2] = indexCache;
    const cardIndex1 = document.getElementById(card1);
    const cardIndex2 = document.getElementById(card2);

    console.log(cardIndex1);

    setTimeout(function () {
      cardIndex1.style.backgroundColor = "green";
      cardIndex1.textContent = "֍";
      faceUp[card1] = false;

      cardIndex2.style.backgroundColor = "green";
      cardIndex2.textContent = "֍";
      faceUp[card2] = false;
    }, 1000);
  }

  // Condição de vitória
  function checkWin() {
    if (countScore === numbers.length) {
      setRound(countRound);
      setShowModal(true);
    }
  }

  // Reinicia o jogo, vira todas as cartas e embaralha
  function resetGame() {
    for (let i = 0; i < shuffled.length; i++) {
      let card = document.getElementById(i);

      card.style.backgroundColor = "green";
      card.textContent = "֍";
    }

    shuffleDeck(DECK);
  }

  return (
    <div className="grid-container">
      <div className="item1">
        <h1>Jogo da Memória </h1>
        <p>
          Rodadas: <span id="roundBoard">1</span>
        </p>
      </div>
      <div className="item2">
        {shuffled.map((shuffled, index) => (
          <button
            className="card"
            id={index}
            key={index}
            value={index}
            onClick={(e) => {
              console.log(shuffled);
              flipCard(e.target.value, shuffled);
            }}
          >
            ֍
          </button>
        ))}
      </div>
      <div className="item3">
        <h2>scoreboard</h2>
      </div>
      {showModal ? (
        <EndModal>
          <h2>
            Parabéns! Você completou o jogo com{" "}
            <span id="roundModal">{round} </span>
            rodadas!
          </h2>
          <p>Jogar novamente?</p>
          <div className="buttons">
            <button
              onClick={() => {
                setShowModal(false);
                resetGame();
              }}
            >
              Sim!
            </button>
            <button
              onClick={() => {
                setShowModal(false);
              }}
            >
              Não
            </button>
          </div>
        </EndModal>
      ) : null}
    </div>
  );
};

export default Board;
