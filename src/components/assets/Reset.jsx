import React from 'react'
import Gamestate from '../Gamestate'

const Reset = ({gamestate,onReset}) => {
    if (gamestate === Gamestate.inProgress) {
        return;
    }else{
  return (
    <button onClick={onReset} className='reset-btn'>
      PLAY AGAIN
    </button>
    )}
}

export default Reset
