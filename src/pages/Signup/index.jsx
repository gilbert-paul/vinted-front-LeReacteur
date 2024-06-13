import { useEffect, useState } from "react";
import axios from "axios";

const Signup = ({ url }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [isCreated, setIsCreated] = useState({
    created: "notLaunch",
    message: "Not created",
  });
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleNewsletter = (event) => {
    setNewsletter(!newsletter);
  };
    const fetchData = async (newUser) => {
      await axios
        .post(`${url}/user/signup`, newUser)
        .then((response) => {
          console.log(response.data)
          setIsCreated({ created: true, message: response.data.message });
        })
        .catch((error) => {
          console.log(error.response)
          setIsCreated({ created: false, message: error.response.data.message });
        });
    };

    

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewUser({
      username: username,
      email: email,
      password: password,
      newsletter: `${newsletter}`,
      });
    fetchData({
      username: username,
      email: email,
      password: password,
      newsletter: `${newsletter}`,
      });
  };
  return (
    <>
      <main className="__signup">
        <div className="container">
          <h1>S'inscrire</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handleUsername}
              name="username"
              placeholder="Nom d'utilisateur"
              value={username}
            />
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
            <div className="__newsletter">
              <input
                type="checkbox"
                name="newsletter"
                checked={newsletter}
                onChange={handleNewsletter}
              />
              <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
              <p>
                En m'inscrivant, je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentalité. Je confirme avoir au
                moins 18 ans
              </p>
            </div>
            <button type="submit" className="primary-btn">
              S'inscrire
            </button>
          </form>
          {isCreated.created !== "notLaunch" ? 
          <div className={isCreated.created? '__answer __success':'__answer __alert'}>{isCreated.message}</div> : <></>}
          <p>Tu as déjà un compte ? Connecte-toi !</p>
        </div>
      </main>
    </>
  );
};

export default Signup;
