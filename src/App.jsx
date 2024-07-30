import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import CustomError from "./CustomError.js"

const App = () => {
    const [steps, setSteps] = useState(0);
    const [n, setn] = useState(0);
    const [nums, setNums] = useState([]);
    const [inputCount, setInputCount] = useState(0);
    const [indexInput, setIndexInput] = useState([]);
    const [isVisited, setIsvisited] = useState([]);
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
        if(inputCount===2) {
            setTimeout(() => {
                countSteps()
            }, 900);
        }
    }, [sum,inputCount])
    const GenerateGameCards = () => {
        try {
            if (n <= 0) {
                throw new CustomError("Please enter value greater than 0");
            }
            isVisited.map((isVisitedRow, i) => {
                isVisitedRow.map((value, j) => {
                    if (value === 1) {
                        const box = document.getElementById(`${i}+${j}`);
                        box.style.removeProperty("background-color", "purple");
                    }
                })
            })

            const numArray = [];
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
            setInputCount(0);
            setSteps(0);
            setNums(newNums);
            var newNums = new Array(2 * n).fill(0).map(() => new Array(2 * n).fill(0));
            setIsvisited(newNums);
            const n_2 = n * n;
            setSum(2 * (n_2 * (n_2 + 1)));
            setWin(false);
            setMessage("");
        } catch (err) {
            setMessage(err.message);
        }
    }
    const handleinput = (i, j) => {
        try {
            if (inputCount === 2) {
                throw new CustomError("You have choosen two index");
            }
            if (isVisited[i][j] === 1) {
                throw new CustomError("This card is already visited");
            }
            const box = document.getElementById(`${i}+${j}`);
            box.style.setProperty("background-color", "purple");

            isVisited[i][j] = 1;
            setIsvisited(isVisited);
            indexInput.push([i, j]);
            setIndexInput(indexInput);
            setInputCount(inputCount + 1);
        } catch (err) {
            setMessage(err.message);
        }
    }
    const countSteps = () => {
        try {
            if (win) {
                GenerateGameCards();
                return;
            }
            if (indexInput.length != 2) {
                setMessage("Please choose two index");
            }
            if (nums[indexInput[0][0]][indexInput[0][1]] === nums[indexInput[1][0]][indexInput[1][1]]) {
                setMessage("Card Matched");
                setSum(sum - 2 * nums[indexInput[0][0]][indexInput[0][1]]);
            } else {
                throw new CustomError("Oops, not matched");
            }
        } catch (err) {
            setMessage(err.message);
            indexInput.map(([i, j]) => {
                const box = document.getElementById(`${i}+${j}`);
                box.style.removeProperty("background-color", "purple");
            })
            indexInput.map(([i, j]) => {
                isVisited[i][j] = 0;
                setIsvisited(isVisited);
            })
        } finally {
            setSteps(steps + 1);
            setIndexInput([]);
            setInputCount(0);
        }
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
            {win && <button className="btn" onClick={countSteps}>Refresh</button>}
        </>
    );
}

export default App;
