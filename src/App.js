
import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp

function App() {
  // const Close = ()=>{
  //   tg.close()
  // }
  useEffect(()=>{
    tg.ready()
    tg.MainButton.show()
    tg.MainButton.text = "Отправить"
  }, [])


  return (
    <div className="App">
    <div className='container' >  
      <form>

        <div className='mb-3 mt-3'>
        <label className="form-label">Выберите курс</label>
          <select class="form-select" aria-label="Default select example">
            <option selected>Нажмите чтобы выбрать</option>
            <option value="1">Программирование на языке Python для начинающих</option>
            <option value="2">Программирование на языке Python средний уровень</option>
            <option value="3">Программирование на языке Javascript для начинающих</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Введите ФИО</label>
          <input type="text" className="form-control" id="inputName"/>
        </div>

        <div className="mb-3">
          <label className="form-label">Номер телефона</label>
          <input type="email" className="form-control" id="inputPhone" placeholder='+7 999 123 45 67'/>
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        
      </form>
    </div>
    </div>
  );
}

export default App;
