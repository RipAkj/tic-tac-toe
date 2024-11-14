import React from "react";
import '../../App.css';

const Cell = ({ cell, idx, idy, go, setGo, cells, setCells, winningMsg, checkScore}) => {
  
  const handleClick = (e) => {
    
    if(cell){return;}
    if (!winningMsg) {
      console.log("dimag")
      cells[idx][idy] = go;
      console.log("dimag2")
      setCells([...cells]);
      console.log("dimag3")
      setGo(go === 'marshmallow' ? 'strawberry' : 'marshmallow');
      // console.log(`${idx}, ${idy}, ${go}`)
      checkScore(idx, idy, go, cells);
      console.log("dimag5")
    }
  };


  return (
    <div className={`square`} id={idy} onClick={handleClick}>
      <div className={cell}></div>
    </div>
  );
};

export default Cell;
