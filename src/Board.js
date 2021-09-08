import React from 'react';
import Card from "./Card.js";

function Board () {
  const romanNumbers = ['I','II','III','IV','V','VI','VII','VIII','IIX','IX','X']
  
  return (
    romanNumbers.map((f) => {
      return (
      <>
        <Card content= {f} />
        <Card content= {f} />
      </>)
    })
  )

}

export default Board;

