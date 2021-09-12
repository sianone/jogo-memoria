import React from "react";
import { useState, useEffect } from "react";
import EndModal from "./EndModal";

//const numbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const numbers = ["I", "II", "III"];
const numbersCopy = numbers.slice();
const DECK = numbers.concat(numbersCopy); //array de 20 cartas, 10 pares

const Board = () => {
  const [shuffled, setShuffled] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const faceUp = [];
  let countRound = 0;
  let countScore = 0;
  let countFaceUp = 0;
  let cardCache = [];
  let indexCache = [];

  //embaralha 1 vez no render da página.
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

  // Verifica se a carta está virada para cima.
  // Só acontece algo, se a carta estiver virada para baixo.
  function flipCard(index, shuffled) {
    let selectCard = document.getElementById(index);

    console.log(selectCard);
    {
      faceUp[index]
        ? null
        : ((faceUp[index] = true),
          countRound++,
          countFaceUp++,
          showCard(selectCard, shuffled),
          checkCards(index, shuffled));
    }

    console.log(countRound);
    console.log(countScore);
    console.log(countFaceUp);
    console.log(faceUp[index]);
  }

  function showCard(element, card) {
    element.style.backgroundColor = "white";
    element.innerHTML = card;
  }

  //verifica os valores das cartas viradas, verificação funciona em pares
  function checkCards(index, card) {
    cardCache.push(card);
    indexCache.push(index);
    console.log(cardCache);
    console.log(indexCache);

    if (countFaceUp === 2) {
      if (cardCache[0] == cardCache[1]) {
        countScore++;
      } else {
        hideCards();
      }
      indexCache = [];
      cardCache = [];
      countFaceUp = 0;
      checkWin();
    }
  }

  function hideCards() {
    const [card1, card2] = indexCache;
    const cardIndex1 = document.getElementById(card1);
    const cardIndex2 = document.getElementById(card2);

    console.log(cardIndex1);

    setTimeout(function () {
      cardIndex1.style.backgroundColor = "green";
      cardIndex1.innerHTML = "";
      faceUp[card1] = false;

      cardIndex2.style.backgroundColor = "green";
      cardIndex2.innerHTML = "";
      faceUp[card2] = false;
    }, 1000);
  }

  //condição de vitória
  function checkWin() {
    if (countScore === numbers.length) {
      setShowModal(true);
    }
  }

  function resetGame() {
    let allCards = document.getElementsByClassName("card");

    console.log(allCards);
    for (let i = 0; i < shuffled.length; i++) {
      let card = document.getElementById(i);

      card.style.backgroundColor = "green";
      card.innerHTML = "";
    }

    shuffleDeck(DECK);
  }

  return (
    <div className="grid-container">
      <div className="item1">
        <h1>Jogo da Memória</h1>
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
          ></button>
        ))}
      </div>
      <div className="item3">
        <h2>scoreboard</h2>
      </div>
      {showModal ? (
        <EndModal>
          <h2>Parabéns! Você completou o jogo com {countRound} rodadas!</h2>
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
              No
            </button>
          </div>
        </EndModal>
      ) : null}
    </div>
  );
};

export default Board;
