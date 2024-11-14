import React from "react";
import '../../App.css';

const Cell = ({ cell, idx, idy, go, setGo, cells, setCells, winningMsg, checkScore}) => {
  
  const handleClick = (e) => {
    
    if(cell){return;}
    if (!winningMsg) {
      cells[idx][idy] = go;
      setCells([...cells]);
      setGo(go === 'marshmallow' ? 'strawberry' : 'marshmallow');
      checkScore(idx, idy, go, cells);
    }
  };


  return (
    <div className={`square`} id={idy} onClick={handleClick}>
      <div className={cell}></div>
    </div>
  );
};

export default Cell;
