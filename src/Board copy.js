import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ButtonBase } from "@material-ui/core";
import { Button } from "@material-ui/core";

const numbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const numbersCopy = numbers.slice();
const DECK = numbers.concat(numbersCopy);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: 20%,
    height: "18vh",
  },
}));

const Board = () => {
  const classes = useStyles();
  const [flipped, setFlipped] = useState(false);
  const [card, setCard] = useState("");

  function flipCard(flipped) {
    flipped ? console.log("nope") : console.log("yup");
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {DECK.map((deck, index) => (
          <Grid item xs={3} key={index}>
            <Button href="www.google.com.br">
              <Paper className={classes.paper} key={index}>
                IIIIIIIIIIIIIIIIIIIIIIII
              </Paper>
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Board;
