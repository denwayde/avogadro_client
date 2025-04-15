
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
const tg = window.Telegram.WebApp

function App() {
  // const Close = ()=>{
  //   tg.close()
  // }
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [selectValue, handleSelectChange] = useState("")
  const selectChangeProccess = (e)=>{handleSelectChange(e.target.value)}
  // Регулярное выражение для email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Регулярное выражение для телефонного номера
  const phoneRegex = /^(\+7|8)\d{10}$/;

  const onSendData = useCallback(()=>{
    const data = {
      name, phone, email, selectValue
    }
    tg.sendData(JSON.stringify(data))
  }, [name, phone, email, selectValue])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
        tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(()=>{
    tg.ready()
    // tg.MainButton.show()
    tg.MainButton.text = "Отправить"
    console.log(phoneErr)
  }, [])

  useEffect(()=>{
    if(!phone || !email){
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
    
  }, [phone, email])
  
  const changeName = (e) => {
    setName(e.target.value)

  }

  const [phoneErr, setPhoneErr] = useState('')
  const validatePhone = (e) => {
    if(!phoneRegex.test(phone)){
      setPhoneErr('Неверный формат номера телефона')
    }
    else if (phone === ""){
      setPhoneErr("")
    }
    else {
      setPhoneErr("")
    }
      
  }

  const changePhone = (e) => {
    setPhone(e.target.value)
    
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

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

        <div className="mb-3 ">
          <label className="form-label">Введите ФИО</label>
          <div className='input-group'>
            <input type="text" className="form-control" id="inputName"  onChange={changeName}/>
            <span className="input-group-text"> ✔ </span>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Номер телефона</label>
          <div className='input-group'>
            <input type="phone" className="form-control" id="inputPhone" placeholder='+7 999 123 45 67' onChange={changePhone} onBlur={validatePhone}/>
            {phone!=="" && phoneErr==="" ? <span className="input-group-text"> ✔ </span> : ''}
          </div>
          {phoneErr !== "" ? <div id="emailHelp" className="form-text">{phoneErr}</div> : ''}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <div className='input-group'>
            <input type="email" className="form-control" id="inputEmail1" placeholder='examle@email.com' onChange={changeEmail}/>
            <span className="input-group-text"> ✔ </span>
          </div>
          {/* <div id="emailHelp" className="form-text">Мы не передадим ваши данные третьим лицам</div> */}
        </div>

      </form>
      <div className='text-center bottom-text'>Мы не передадим ваши данные третьим лицам</div> 
    </div>
    </div>
  );
}

export default App;
