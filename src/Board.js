import React from "react";
import { useState, useEffect } from "react";

//const numbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const numbers = ["I", "II"];
const numbersCopy = numbers.slice();
const DECK = numbers.concat(numbersCopy); //array de 20 cartas, 10 pares

const Board = () => {
  const [shuffled, setShuffled] = useState([]);
  const faceUp = [];
  let countRound = 0;
  let countScore = 0;
  let countFaceUp = 0;
  let cardCache = [];
  let indexCache = [];

  useEffect(() => {
    shuffleDeck(DECK); //embaralha
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

  function checkCards(index, card) {
    //verifica os valores das cartas viradas, sempre em pares
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
    let cardIndex1 = document.getElementById(card1);
    let cardIndex2 = document.getElementById(card2);

    setTimeout(function () {
      cardIndex1.style.backgroundColor = "green";
      cardIndex1.innerHTML = "";
      faceUp[card1] = false;

      cardIndex2.style.backgroundColor = "green";
      cardIndex2.innerHTML = "";
      faceUp[card2] = false;
    }, 1000);
  }

  function checkWin() {
    if (countScore === 2) {
      alert("Parabens!");
    }
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
    </div>
  );
};

export default Board;
