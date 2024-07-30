import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
    const [steps, setSteps] = useState(0);
    const [n, setn] = useState(1);
    const [nums, setNums] = useState([]);
    const [inputCount, setInputCount] = useState(0);
    const [indexInput, setIndexInput] = useState([]);
    const [isVisited, setIsvisited] = useState([]);
    const [index, setIndex] = useState([]);
    const [sum, setSum] = useState(-1);
    const [win, setWin] = useState(false);
    const [message, setMessage] = useState("");


    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    useEffect(() => {
        if (sum == 0) {
            setWin(true);
        }
    }, [sum])
    const GenerateGameCards = () => {
        if (n <= 0) {
            setMessage("Please enter value greater than 0");
            return
        }
        const numArray = [];
        isVisited.map((isVisitedRow, i) => {
            isVisitedRow.map((value, j) => {
                if (value == 1) {
                    const box = document.getElementById(`${i}+${j}`);
                    box.style.removeProperty("background-color", "purple");
                }
            })
        })

        for (let i = 1; i <= n * n; i++) {
            for (let j = 1; j <= 4; j++) {
                numArray.push(i);
            }
        }

        const shuffledNumArray = shuffleArray(numArray);
        var newNums = new Array(2 * n).fill(0).map(() => new Array(2 * n).fill(0));

        for (let i = 0; i < 2 * n; i++) {
            for (let j = 0; j < 2 * n; j++) {
                newNums[i][j] = shuffledNumArray[i * (2 * n) + j];
            }
        }

        setIndexInput([]);
        setIndex([]);
        setInputCount(0);
        setSteps(0);
        setNums(newNums);
        var newNums = new Array(2 * n).fill(0).map(() => new Array(2 * n).fill(0));
        setIsvisited(newNums);
        const n_2 = n * n;
        setSum(2 * (n_2 * (n_2 + 1)));
        setWin(false);
        setMessage("");


    }
    const handleinput = (i, j) => {
        if (inputCount === 2) {
            setMessage("You have choosen two index")
            return;
        }
        if(isVisited[i][j]===1) {
            setMessage("This card is already visited");
            return;
        }
        const box = document.getElementById(`${i}+${j}`);
        box.style.setProperty("background-color", "purple");
        
        isVisited[i][j] = 1;
        setIsvisited(isVisited);
        indexInput.push([i, j]);
        setIndexInput(indexInput);
        setIndex(indexInput);
        setInputCount(inputCount + 1);
        
    }
    const countSteps = () => {

        if (win) {
            GenerateGameCards();
            return;
        }
        if (indexInput.length != 2) {
            setMessage("Please choose two index");
            indexInput.forEach(([i, j]) => {
                const box = document.getElementById(`${i}+${j}`);
                box.style.removeProperty("background-color", "purple");
            })
            indexInput.forEach(([i, j]) => {
                isVisited[i][j] = 0;
                setIsvisited(isVisited);
            })
            setIndexInput([]);
            setInputCount(0);
            return;
        }
        if (index[0][0] === index[1][0] && index[0][1] === index[1][1]) {
            setMessage("you have choosen same index");
            indexInput.forEach(([i, j]) => {
                const box = document.getElementById(`${i}+${j}`);
                box.style.removeProperty("background-color", "purple");
            })
            indexInput.forEach(([i, j]) => {
                isVisited[i][j] = 0;
                setIsvisited(isVisited);
            })
            setIndexInput([]);
            setInputCount(0);
            return;
        }
        if (nums[index[0][0]][index[0][1]] === nums[index[1][0]][index[1][1]]) {
            setMessage("Card Matched");
            setSum(sum - 2 * nums[index[0][0]][index[0][1]]);
        } else {
            setMessage("Oops, not matched");
            indexInput.forEach(([i, j]) => {
                const box = document.getElementById(`${i}+${j}`);
                box.style.removeProperty("background-color", "purple");
                isVisited[i][j] = 0;
                setIsvisited(isVisited);
            })
        }
        setSteps(steps + 1);
        setIndexInput([]);
        setInputCount(0);
        setIndex([]);
    }
    return (
        <>
            <h2 className="title">4 N**2 GAME</h2>
            <div>
                <input
                    className="input"
                    placeholder="Enter your n"
                    onChange={(e) => setn(e.target.valueAsNumber)}
                    type="Number"
                />
                <button className="btn" onClick={GenerateGameCards}>Select</button>
            </div>
            {win ? <p>You have taken {steps} to complete the Game</p> : <p>Steps: {steps}</p>}
            <div className="Game-section">
                {nums.map((numRow, i) => (
                    <div key={i} className="row">
                        {numRow.map((value, j) => (
                            <div key={j} onClick={() => handleinput(i, j)} id={`${i}+${j}`} className="card-box">
                                {isVisited[i][j] ? value : "Open"}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {message.length ? <p>{message}</p> : <p>Start the Game</p>}
            <button className="btn" onClick={countSteps}>{win?"Refresh":"Choose Next"}</button>
        </>
    );
}

export default App;
