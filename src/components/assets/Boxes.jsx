import React from 'react'


const Boxes = ({className , value , onClick ,  playerTurn}) => {

    let hoverClass=null
    if (value==null && playerTurn !=null) {
        hoverClass=`${playerTurn.toLowerCase()}`
    }

  return (
    <div onClick={onClick} className={`boxes ${className} ${hoverClass}`}>
      {value}
    </div>
  )
}

export default Boxes
