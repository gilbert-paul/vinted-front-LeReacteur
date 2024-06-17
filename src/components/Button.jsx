import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"

const Button =({className, title = false, modal = null, modalIsVisible = false, setModalIsVisible, disconnected = {connected:false, setTryToSell:""}})=>{
const navigate = useNavigate()
  const handleButton =()=>{
    if(modal === "login")
    setModalIsVisible({...modalIsVisible, login:!modalIsVisible.login})
  if(modal==="signup"){
    setModalIsVisible({...modalIsVisible, signup:!modalIsVisible.signup})
  }
     if (disconnected.connected){
       Cookies.remove("token")
       if(typeof disconnected.setTryToSell){
         disconnected.setTryToSell(false)
       }

     navigate("/")
       }
  }
  return (
    <button onClick={handleButton}
    className={className}>{title}</button>
  )
}

export default Button