import './App.css';
import React, { useEffect, useState } from "react";
import restart from "./asset/refresh.png";
import Cell from "./components/cell/cell";

const App = () => {
    const makeGrid = (gridSize) => {
        const grid = []
        for(let i=0;i<gridSize;i++){
            const row = [];
            for(let j=0;j<gridSize;j++){
                row.push("");
            }
            grid.push(row);
        }
        console.log("make grid chala")
        return grid;
    }
    
    const [go, setGo] = useState("marshmallow");

    const [cells, setCells] = useState(Array.from({length: 3})?.map( i => Array.from ({length: 3})));
    const [gridSize, setGridSize] = useState(3);
    const [winningMsg, setWinningMsg] = useState(null);
    const [rainIntervalId, setRainIntervalId] = useState(null);
    const message = "it is now " + go + "'s go.";
    // useEffect(() => {
    //     checkScore();
    // }, [cells]);
    useEffect(() => {
        if(winningMsg) {
            startRain();
        }
    }, [winningMsg])
    const handleRestartGame = () => {
        setCells(makeGrid(gridSize));
        console.log(gridSize)
        setGo("marshmallow");
        setWinningMsg(null);
        if (rainIntervalId) {
            clearInterval(rainIntervalId);
            setRainIntervalId(null);
        }
    };
    const checkScore = (idx, idy, item, cells) => {
        let winnerFound = false;
        let bottom_right = false, bottom_left = false, vertical = false, horizontal = false;
        console.log(cells)
        console.log(gridSize)
        console.log(`hello ${idx}, ${idy}, ${item}`)
        if(idx < 0 || idy < 0 || !item)return;
        let itemCount = 0;

        for(let i=0; i < gridSize; i++){
            if(cells[i][i] !== item){
                itemCount += 1;
            }
        }
        console.log(itemCount, item)
        if(itemCount === 0){bottom_right = true;}
        itemCount = 0;
        for(let i=0; i < gridSize; i++){
            if(cells[i][gridSize-1-i] !== item){
                itemCount += 1;
            }
        }
        console.log(itemCount, item)
        if(itemCount === 0){bottom_left = true;}
        itemCount = 0;
        for(let i=0; i< gridSize;i++){
            if(cells[i][idy]!==item){
                itemCount += 1;
            }
        }
        console.log(itemCount, item)
        if(itemCount === 0){vertical = true;}
        itemCount = 0;
        for(let i=0; i< gridSize;i++){
            if(cells[idx][i]!==item){
                itemCount += 1;
            }
        }
        console.log(itemCount, item)
        if(itemCount === 0){horizontal = true;}
        winnerFound = bottom_right || bottom_left || vertical || horizontal
        // console.log(cells)
        // console.log(`idx: ${idx} idy: ${idy} item: ${item} -> bottom_right: ${bottom_right} bottom_left: ${bottom_left} vertical: ${vertical} horizontal: ${horizontal} itemCount: ${itemCount}`)
        if(winnerFound){
            setWinningMsg(`${item} wins!`);
            return;
        }
        
        let empty = 0;
        for(let i=0;i<gridSize;i++){
            for(let j=0;j<gridSize;j++){
                if(!cells[i][j]){
                    empty += 1;
                }
            }
        }
        if(empty > 0){
            return ;
        }
        else {setWinningMsg("It's a Draw!");}

    };
    const makeRain = () => {
        const rain = document.createElement("div");
        rain.classList.add("makeRain");
    
        rain.style.left = Math.random() * 100 + "vw";
        rain.style.animationDuration = Math.random() * 2 + 3 + "s";
        if (winningMsg.toLowerCase().includes("strawberry")) {
            rain.innerText = '🍓'
        } else if (winningMsg.toLowerCase().includes("marshmallow")) {
            rain.innerText = "🍡"
        } else {
          rain.innerText = "😶"; // Default or draw condition
        }
        document.body.appendChild(rain);
        setTimeout(() => {
            rain.remove();
        }, 5000);
    };
    const startRain = () => {
        const intervalId = setInterval(makeRain, 300);
        setRainIntervalId(intervalId);
    
        setTimeout(() => {
            clearInterval(intervalId);
        }, 10000);
    };
    return (
        <div className="app">
            <input id="grid_size" placeholder='Enter grid size' type='number' /> 
            <button onClick={() => {
                console.log("ye hai input", document.getElementById('grid_size').value)
                const grid_size = +document.getElementById('grid_size').value || 3;
                setGridSize(grid_size)
                setCells(makeGrid(grid_size));
                setGo("marshmallow");
                setWinningMsg(null);
            }} > Make Grid </button>
            <div className="gameboard" style={{ width: `${100 * gridSize}px`, height: `${100 * gridSize}px`}}>
                {cells.map((cell, index) => (
                    cell.map((cellItem, index1) => (
                        <Cell
                            key={index1}
                            idx={index}
                            idy={index1}
                            cell={cellItem}
                            go={go}
                            setGo={setGo}
                            cells={cells}
                            setCells={setCells}
                            winningMsg={winningMsg}
                            checkScore={checkScore}
                        />
                    )
                )))}
            </div>
            <p className="message">
                {winningMsg || message}
                <img
                    src={restart}
                    className="restartIcon"
                    alt="restart"
                    onClick={handleRestartGame}
                />
            </p>
        </div>
    );
};

export default App;
