import './App.css'
import { useEffect } from 'react'
import { useState } from 'react'

const btnColors = ["yellow", "red", "purple", "green"];

function App() {

  const [gameSeq, setGameSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [level, setLevel] = useState(0);
  const [started, setStarted] = useState(false);
  const [message, setMessage] = useState("Press any key to start the game");

  useEffect(() => {
  const handleKeyPress = () => {
    if (!started) {
      setStarted(true);            // Mark game as started
      levelUp([]);                 // Start first level with an empty pattern
    }
  };

  document.addEventListener("keypress", handleKeyPress);

  return () => {
    document.removeEventListener("keypress", handleKeyPress);
  };
}, [started]);

  const levelUp = (prevSeq)=>{
    const randomColor = btnColors[Math.floor(Math.random() * 4)];
    const newSeq = [...prevSeq, randomColor];
    setGameSeq(newSeq);  
    setUserSeq([]);
    setLevel((prev) => prev + 1); 
    setMessage(`Level ${level + 1}`);
    flash(randomColor); 
  }


const handleClick = (color) => {
  if (!started) return;

  userFlash(color);                         // Animate user click
  const newUserSeq = [...userSeq, color];  // Add to player input
  setUserSeq(newUserSeq);                  // Update state

  // Check if input is wrong
  if (newUserSeq[newUserSeq.length - 1] !== gameSeq[newUserSeq.length - 1]) {
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 150);
    setMessage(`Game Over! Your score was ${level}. Press any key to restart.`);
    reset();                                // Restart game
  } else if (newUserSeq.length === gameSeq.length) {
    setTimeout(() => levelUp(gameSeq), 1000);  // Next level
  }
};


const reset = ()=>{
  setStarted(false);
  setGameSeq([]);
  setUserSeq([]);
  setLevel(0);
}

const flash = (color)=>{
  const btn = document.getElementById(color);
  btn.classList.add("flash");
  setTimeout(()=>{
    btn.classList.remove("flash");
  } , 200);
}

const userFlash = (color)=>{
  const btn = document.getElementById(color);
  btn.classList.add("userFlash");
  setTimeout(()=>{
    btn.classList.remove("userFlash");
  } , 200);
}







  return (
    <div>
      <h1>Simon Game</h1>
      <h2>{message}</h2>

      <div className="btn-container">
        <div className="line-one">
          <div className="btn red" type="button" id="red" onClick={()=>handleClick("red")}></div>
          <div className="btn yellow" type="button" id="yellow" onClick={()=>handleClick("yellow")}></div>
        </div>
        <div className="line-two">
          <div className="btn green" type="button" id="green" onClick={()=>handleClick("green")}></div>
          <div className="btn purple" type="button" id="purple" onClick={()=>handleClick("purple")}></div>
        </div>



      </div>

    </div>
  )
}

export default App
