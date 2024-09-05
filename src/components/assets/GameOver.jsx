import React from 'react'
import Gamestate from '../Gamestate'

const GameOver = ({gamestate}) => {
  switch (gamestate) {
    case Gamestate.inProgress:
        return <></>
        case Gamestate.playerXwins:
        return <div className='gameover'>X wins</div>
        case Gamestate.playerOwins:
        return <div className='gameover'>O wins</div>
        case Gamestate.draw:
        return <div className='gameover'>Draw</div>
        
        break;
  
    default:
        return <></>;
  }
}

export default GameOver
