
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import { Check } from 'react-feather';
const tg = window.Telegram.WebApp

function App() {
  // const Close = ()=>{
  //   tg.close()
  // }
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [selectValue, handleSelectChange] = useState("")
  const [emailErr, setEmailErr] = useState('')
  const [phoneErr, setPhoneErr] = useState('')
  const courses = [
    { value: "1", label: "Программирование на языке Python для начинающих" },
    { value: "2", label: "Программирование на языке Python средний уровень" },
    { value: "3", label: "Программирование на языке Javascript для начинающих" },
  ];
  const selectChangeProccess = (e)=>{
    handleSelectChange(parseInt(e.target.value))
    validateCourse(e)
  }
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
    // console.log(phoneErr)
  }, [])

  const [courseErr, setCourseErr] = useState("")
  
  useEffect(()=>{
    if(!phone || !email || emailErr || phoneErr || courseErr || !selectValue){
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
    
  }, [phone, email, emailErr, phoneErr, courseErr, selectValue])
  
  const changeName = (e) => {
    setName(e.target.value)

  }

  
  const validateCourse = (e) => {
    
    if(e.target.value===""){
      setCourseErr("Выберите пожалуйста курс")
    }
    else {
      setCourseErr("")
    }

  }
  
  const validatePhone = (e) => {
    if(!phoneRegex.test(e.target.value) && e.target.value !== ""){
      setPhoneErr('Неверный формат номера телефона')
    }
    else if (e.target.value === ""){
      setPhoneErr("")
    }
    else {
      setPhoneErr("")
    }
      
  }

  const validateEmail = (e) => {
    if(!emailRegex.test(e.target.value) && e.target.value !== ""){
      setEmailErr('Неверный формат адреса электронной почты')
    }
    else if (e.target.value === ""){
      setEmailErr("")
    }
    else {
      setEmailErr("")
    }

    if(selectValue===""){
      setCourseErr("Похоже что вы не выбрали курс")

    }
      
  }

  const changePhone = (e) => {
    setPhone(e.target.value)
    
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
    validateEmail(e)
  }

  return (
    <div className="App">
    <Header/>
    <div className='container' >  
      <form>

        <div className='mb-3 mt-3'>
        <label className="form-label">Выберите курс</label>
          <select className={courseErr==="Похоже что вы не выбрали курс" ? "form-select outline-warning":"form-select"} onChange={selectChangeProccess} onBlur={validateCourse} value={selectValue}>
            <option value = "" disabled>Нажмите чтобы выбрать</option>
            {courses.map((course) => (
                <option key={course.value} value={course.value}>
                  {course.label}
                </option>
              ))}
          </select>
          {courseErr !== "" ? <div id="emailHelp" className={courseErr==="Похоже что вы не выбрали курс" ? "form-text warning":"form-text"}>{courseErr}</div> : ''}
        </div>

        <div className="mb-3 ">
          <label className="form-label">Введите ФИО</label>
          <div className='input-group'>
            <input type="text" className="form-control fc" id="inputName"  onChange={changeName}/>
            {name && <span className="input-group-text"> <Check/> </span>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Номер телефона</label>
          <div className='input-group'>
            <input type="phone" className={phoneErr!=="" ? "form-control fc input-err" :"form-control fc"} id="inputPhone" placeholder='+7 999 123 45 67' onChange={changePhone} onBlur={validatePhone}/>
            {phone!=="" && phoneErr==="" ? <span className="input-group-text"> <Check/> </span> : ''}
          </div>
          {phoneErr !== "" ? <div id="emailHelp" className="form-text">{phoneErr}</div> : ''}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <div className='input-group'>
            <input type="email" className={emailErr!=="" ? "form-control fc input-err" :"form-control fc"} id="inputEmail1" placeholder='examle@email.com' onChange={changeEmail} onBlur={validateEmail}/>
            {email!=="" && emailErr==="" ? <span className="input-group-text"> <Check/> </span> : ''}
          </div>
          {emailErr !== "" ? <div id="emailHelp" className="form-text">{emailErr}</div> : ''}
        </div>

      </form>
      <div className='text-center bottom-text'>Мы не передадим ваши данные третьим лицам</div> 
    </div>
    </div>
  );
}

export default App;
