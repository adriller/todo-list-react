import React, { useState, useEffect } from "react";
import "./App.css";
import { IoIosPaperPlane } from "react-icons/io";
import { Checkbox } from "react-input-checkbox";
import moment from "moment";

function App() {
    const [tasks, setTasks] = useState(["Aprender React", "Arrumar a cozinha", "..."]);
    const [inputValue, setInputValue] = useState("");
    const [quote, setQuote] = useState("");
    const [time, setTime] = useState(moment().format("HH:mm:ss"));

    useEffect(() => {
        getQuotesFromAPI();

         setInterval(() => {
            setTime(moment().format("HH:mm:ss"));
        }, 1000);
    }, []);

    const onClickButtonSave = () => {
        setTasks([...tasks, inputValue]);
        //apagar o que ta no input
        setInputValue("");
    };

    const getQuotesFromAPI = async () => {
        let response = await fetch("https://type.fit/api/quotes");
        response = await response.json();
        const randomNumber = parseInt(Math.random() * 1000);
        setQuote(response[randomNumber]);
    };

    return (
        <div className="App">
            <div className="time">{time}</div>
            <div className="add-task-container">
                <span className="title">Adicione uma tarefa para o seu dia!</span>
                <div className="input-task-container">
                    <input type="text" className="input-task" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <button className="send-icon" onClick={onClickButtonSave}>
                        <IoIosPaperPlane color="#fff" size="20px" />
                    </button>
                </div>
            </div>
            <div className="quote">{quote.text}</div>
            <div className="task-list">
                {tasks.map((taskName) => {
                    return (
                        <div className="task">
                            <Checkbox theme="task-checkbox" size="24px" />
                            <div>{taskName}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
