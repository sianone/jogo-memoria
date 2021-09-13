import React from "react";
import { useState, useEffect } from "react";
import EndModal from "./EndModal";

const color = "#ad343e";
const numbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const numbersCopy = numbers.slice();
const DECK = numbers.concat(numbersCopy); //array de 20 cartas, 10 pares

const Board = () => {
  const [shuffled, setShuffled] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [round, setRound] = useState("");
  const faceUp = [];
  let cardCache = [];
  let indexCache = [];
  let countRound = 1;
  let countScore = 0;
  let countFaceUp = 0;

  // Embaralha somente 1 vez, assim que a página abre
  useEffect(() => {
    shuffleDeck(DECK);
  }, []);

  // Função embaralha todas as posições do array
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

    setShuffled(arr);
  }

  // Verifica se a carta está virada ou não
  // Só acontece algo, se a carta estiver virada para baixo em seu estado inicial
  function flipCard(index, shuffled) {
    let selectCard = document.getElementById(index);

    {
      faceUp[index]
        ? null
        : ((faceUp[index] = true),
          countFaceUp++,
          showCard(selectCard, shuffled),
          checkCards(index, shuffled));
    }
  }

  function showCard(element, card) {
    element.style.backgroundColor = "white";
    element.textContent = card;
  }

  // Verifação das 2 cartas atualmente escolhidas, se elas sao iguais ou não
  function checkCards(index, card) {
    let updateBoard = document.getElementById("roundBoard");

    cardCache.push(card);
    indexCache.push(index);

    if (countFaceUp === 2) {
      if (cardCache[0] == cardCache[1]) {
        countScore++;
      } else {
        hideCards();
      }

      checkWin();
      countRound++;
      indexCache = [];
      cardCache = [];
      countFaceUp = 0;

      updateBoard.textContent = countRound;
    }
  }

  // Esconde o par de carta selecionado, caso não foi um acerto
  function hideCards() {
    const [card1, card2] = indexCache;
    const cardIndex1 = document.getElementById(card1);
    const cardIndex2 = document.getElementById(card2);

    setTimeout(function () {
      cardIndex1.style.backgroundColor = color;
      cardIndex1.textContent = "֍";
      faceUp[card1] = false;

      cardIndex2.style.backgroundColor = color;
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

  // Reinicia o jogo, vira todas as cartas para baixo, reseta o contador da mesa e embaralha
  function resetGame() {
    for (let i = 0; i < shuffled.length; i++) {
      let card = document.getElementById(i);

      card.style.backgroundColor = color;
      card.textContent = "֍";
    }

    document.getElementById("roundBoard").textContent = "1";
    shuffleDeck(DECK);
  }

  return (
    <div className="grid-container">
      <div className="item1">
        <h1 className="title">Jogo da Memória </h1>
        <p className="subtitle-rounds">
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
              flipCard(e.target.value, shuffled);
            }}
          >
            ֍
          </button>
        ))}
      </div>
      {showModal ? (
        <EndModal>
          <h2>
            Parabéns! Você completou o jogo com
            <span id="roundModal"> {round} </span>
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
          </div>
        </EndModal>
      ) : null}
    </div>
  );
};

export default Board;
