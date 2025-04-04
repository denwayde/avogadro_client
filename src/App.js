
import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp

function App() {
  const Close = ()=>{
    tg.close()
  }
  useEffect(()=>{
    tg.ready()
  }, [])
  return (
    <div className="App">
      <h1>Привет мир</h1>
      <button onClick = {Close}>Close</button>
    </div>
  );
}

export default App;
