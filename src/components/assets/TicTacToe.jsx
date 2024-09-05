import React, { useEffect, useState } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import Gamestate from "../Gamestate";
import Reset from "./Reset";
import gameOverSoundAsset from "../assets/sound/Gameover.wav"
import clickSoundAsset from "../assets/sound/Clicksound.wav"


const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 1;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 1;

const Player_X = "X";
const Player_O = "O";

const winningCombinations = [
  //rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //diagnols
  { combo: [0, 4, 8], strikeClass: "strike-diagnol-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagnol-2" },
];

function checkWinner(tiles, setStrikeClass, setGamestate) {
  for (const { combo, strikeClass } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];
    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      if (tileValue1 === Player_X) {
        setGamestate(Gamestate.playerXwins);
      } else {
        setGamestate(Gamestate.playerOwins);
      }
      return;
    }
  }
  const allTilesFilled = tiles.every((tile) => tile !== null);
  if (allTilesFilled) {
    setGamestate(Gamestate.draw);
  }
}

const TicTacToe = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(Player_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gamestate, setGamestate] = useState(Gamestate.inProgress);

  const handleTileClick = (index) => {
    if (gamestate !== Gamestate.inProgress) {
      return;
    }

    if (tiles[index] !== null) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);

    if (playerTurn === Player_X) {
      setPlayerTurn(Player_O);
    } else {
      setPlayerTurn(Player_X);
    }
  };

  const handleReset = () => {
    setGamestate(Gamestate.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(Player_X);
    setStrikeClass(null);
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGamestate);
  }, [tiles]);

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);

  useEffect(() => {
    if (gamestate !== Gamestate.inProgress) {
      gameOverSound.play();
    }
  }, [gamestate]);
  console.log(clickSound);
  

  return (
    <div>
      <h1>Tic Tac Toe </h1>

      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
        strikeClass={strikeClass}
      />

      <GameOver gamestate={gamestate} />

      <Reset gamestate={gamestate} onReset={handleReset} />
    </div>
  );
};

export default TicTacToe;
