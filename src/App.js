
import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
const tg = window.Telegram.WebApp

function App() {
  // const Close = ()=>{
  //   tg.close()
  // }
  const [selectValue, handleSelectChange] = useState("")
  const selectChangeProccess = (e)=>{handleSelectChange(e.target.value)}

  useEffect(()=>{
    tg.ready()
    tg.MainButton.show()
    tg.MainButton.text = "Отправить"
  }, [])


  return (
    <div className="App">
    <Header/>
    <div className='container' >  
      <form>

        <div className='mb-3 mt-3'>
        <label className="form-label">Выберите курс</label>
          <select className="form-select" onChange={selectChangeProccess} value={selectValue}>
            <option value = "" disabled>Нажмите чтобы выбрать</option>
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
          <input type="phone" className="form-control" id="inputPhone" placeholder='+7 999 123 45 67'/>
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail1" placeholder='examle@email.com'/>
          {/* <div id="emailHelp" className="form-text">Мы не передадим ваши данные третьим лицам</div> */}
        </div>

      </form>
      <div className='text-center bottom-text'>Мы не передадим ваши данные третьим лицам</div> 
    </div>
    </div>
  );
}

export default App;
