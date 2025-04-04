
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
      <butto onClick = {Close}>Close</butto>
    </div>
  );
}

export default App;
