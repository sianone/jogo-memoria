import React from "react";
import { useState, useEffect } from "react";

const numbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const numbersCopy = numbers.slice();
const DECK = numbers.concat(numbersCopy); //array de 20 cartas, 10 pares

const Board = () => {
  const [shuffled, setShuffled] = useState([]);
  const faceUp = [];
  let countRound = 0;
  let countScore = 0;
  let countFaceUp = 0;
  let cardCache = [];

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
    cardCache.push(card);
    console.log(cardCache);

    if (countFaceUp === 2) {
      if (cardCache[0] == cardCache[1]) {
        countScore++;
        cardCache = [];
        countFaceUp = 0;
      } else {
        cardCache = [];
        countFaceUp = 0;
      }
    }
  }

  return (
    <div>
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
    </div>
  );
};

export default Board;
