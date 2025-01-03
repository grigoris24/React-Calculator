import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const[input, setInput] = useState("");
  const[history, setHistory] = useState([]);

  const buttonClick = (e) => {
    if (e.target.value === "C") {
      setInput("");
      return;
    }
    
    if (e.target.value === "=") {
      try {
        const result = new Function('return ' + input)(); 
        setInput(result.toString());
        setHistory([...history, `${input} = ${result}`]);
      }
      catch (error) {
        setInput("Error")
      }
      return;
    }
    setInput(input + e.target.value);
  };

  const handleKeydown = (e) => {
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Backspace'];
    if (validKeys.includes(e.key)) {
      if (e.key === "Backspace") {
        setInput(input.slice(0, -1));
        return;
      }
      if (e.key === "Enter") {
        buttonClick({target: {value: "="}});
        return;
      }
      setInput(input + e.key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [input, history]);

  return (
   <div id="app">
     <div id="calculator">
      <input style={{marginBottom: "20px", width: "100%"}} value={input} type="text"></input>
      <div style={{display: "flex", flexDirection: "row", gap: "20px", marginBottom: "20px"}}>
        <button className="button" value="C" type="input" onClick={buttonClick}>C</button>
        <button className="button" value="+" type="input" onClick={buttonClick}>+</button>
        <button className="button" value="-" type="input" onClick={buttonClick}>-</button>
        <button className="button" value="*" type="input" onClick={buttonClick}>*</button>
      </div>
      <div style={{display: "flex", flexDirection: "row", gap: "20px", marginBottom: "20px"}}>
        <button className="button" value="1" type="input" onClick={buttonClick}>1</button>
        <button className="button" value="2" type="input" onClick={buttonClick}>2</button>
        <button className="button" value="3" type="input" onClick={buttonClick}>3</button>
        <button className="button" value="/" type="input" onClick={buttonClick}>/</button>
      </div>
      <div style={{display: "flex", flexDirection: "row", gap: "20px", marginBottom: "20px"}}>
        <button className="button" value="4" type="input" onClick={buttonClick}>4</button>
        <button className="button" value="5" type="input" onClick={buttonClick}>5</button>
        <button className="button" value="6" type="input" onClick={buttonClick}>6</button>
      </div>
      <div style={{display: "flex", flexDirection: "row", gap: "20px", marginBottom: "20px"}}>
        <button className="button" value="7" type="input" onClick={buttonClick}>7</button>
        <button className="button" value="8" type="input" onClick={buttonClick}>8</button>
        <button className="button" value="9" type="input" onClick={buttonClick}>9</button>
        <button className="button" value="=" type="input" onClick={buttonClick}>=</button>
      </div>
      
    </div>
    <div id="history">
      <div style={{fontFamily: "monospace", alignItems: "center", margin: "5px"}}>History</div>
      <div id="line"></div>
      <div id="histories">
          {history.map((one, two) => (
            <div key={two}>{one}</div>
          ))}
        </div>
    </div>
   </div>
  );
}

export default App;
