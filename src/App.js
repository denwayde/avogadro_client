
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

  const [online, setOnline] = useState("")
  const [errOnline, setErrOnline] = useState("")

  const courses = [
    { value: "Программирование на Python", label: "Программирование на Python" },
    { value: "Программирование на Javascript", label: "Программирование на Javascript" },
    { value: "Робототехника", label: "Робототехника" },
    { value: "Математика", label: "Математика" },
    { value: "Английский язык", label: "Английский язык" },
    { value: "Физика", label: "Физика" },
  ];
  const selectChangeProccess = (e)=>{
    handleSelectChange(e.target.value)
    validateCourse(e)
  }
  // Регулярное выражение для email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Регулярное выражение для телефонного номера
  const phoneRegex = /^(\+7|8)\d{10}$/;

  const onSendData = useCallback(()=>{
    const data = {
      name, phone, email, selectValue, online
    }
    tg.sendData(JSON.stringify(data))
  }, [name, phone, email, selectValue, online])

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
    if(!phone || !email || emailErr || phoneErr || courseErr || !selectValue || errOnline){
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
    
  }, [phone, email, emailErr, phoneErr, courseErr, selectValue, errOnline])
  
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
    if (online === "") {
      setErrOnline("Похоже что вы не выбрали формат")
    }
      
  }

  const changePhone = (e) => {
    setPhone(e.target.value)
    
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
    validateEmail(e)
  }

  

  const changeOnline = (e)=>{
    setOnline(e.target.value)
  }

  const validateOnline = (e)=>{
    if (e.target.value === "") {
      setErrOnline("Похоже что вы не выбрали формат")
    }
    else {
      setErrOnline("")
    }
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
{/* Формат занятий */}
        <div className='mb-3'>
        <label className="form-label">Выберите формат занятий</label>
          <select className={errOnline==="Похоже что вы не выбрали формат" ? "form-select outline-warning":"form-select"} onChange={changeOnline} onBlur={validateOnline} value={online}>
            <option value = "" disabled>Нажмите чтобы выбрать</option>
            <option value = "Онлайн">Онлайн</option>
            <option value = "Офлайн">Оффлайн</option>
          </select>
          {errOnline !== "" ? <div id="emailHelp" className={errOnline==="Похоже что вы не выбрали формат" ? "form-text warning":"form-text"}>{errOnline}</div> : ''}
        </div>
{/* Формат занятий */}
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
