import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom"

const Login = ({ url }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isConnected, setIsConnected] = useState({connected:"notLaunch", message:"Non connnecté"})
  const [newUser, setNewUser] = useState({});
  const navigate = useNavigate()

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

    const fetchData = async (newUser) => {
      await axios
        .get(`${url}/user/login`,{params:newUser})
        .then((response) => {
          Cookies.set("token",response.data.data.token,{expires:15})
          setIsConnected({ connected: true, message: response.data.message });
          navigate("/")

        })
        .catch((error) => {
          console.log(error.response.data.message)
          setIsConnected({ connected: false, message: error.response.data.message });
        });
    };

    

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNewUser({
      email: email,
      password: password,
      });
    fetchData({
      email: email,
      password: password,
      });

  };
  return (
    <>
      <main className="__signup">
        <div className="container">
          <h1>Se connecter</h1>
          <form action="" onSubmit={handleSubmit}>
            
            <input
              type="mail"
              onChange={handleEmail}
              name="email"
              placeholder="Email"
              value={email}
            />
            <input
              type="password"
              onChange={handlePassword}
              name="password"
              placeholder="Mot de passe"
              value={password}
            />
            
            <button type="submit" className="primary-btn">
              Se connecter
            </button>
          </form>
           {isConnected.connected !== "notLaunch" ? 
          <div className={isConnected.connected? '__answer __success':'__answer __alert'}>{isConnected.message}</div> : <></>}
          <p>Pas encore de compte ? Inscris-toi !</p>
        </div>
      </main>
    </>
  );
};

export default Login;
