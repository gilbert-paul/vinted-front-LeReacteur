import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"

const Button =({className, title = false, disconnected = false})=>{
const navigate = useNavigate()
  const handleButton =()=>{
    if (disconnected){
      Cookies.remove("token")
    navigate("/")
      }
  }
  return (
    <button onClick={handleButton}
    className={className}>{title}</button>
  )
}

export default Button