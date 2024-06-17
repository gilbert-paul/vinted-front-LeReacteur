import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Dropzone from "react-dropzone";

const Signup = ({ url, setModalIsVisible }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [avatar, setAvatar] = useState([{}]);
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
    const formData = new FormData();
    formData.append("username", newUser.username);
    formData.append("email", newUser.email);
    formData.append("password", newUser.password);
    formData.append("newsletter", newUser.newsletter);
    formData.append("avatar", newUser.avatar);
    await axios
      .post(`${url}/user/signup`, newUser, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(async (response) => {
        setIsCreated({ created: true, message: response.data.message });
        Cookies.set("token", response.data.data.token);
        setModalIsVisible({ login: false, singup: false });
      })
      .catch((error) => {
        setIsCreated({ created: false, message: error.response.data.message });
      });
  };

  const handleAvatar = (event) => {
    setAvatar(event.target.files[0]);
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
      avatar: avatar[1][0] || null,
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
            <Dropzone
              onDrop={(acceptedFiles) => {
                console.log(acceptedFiles);

                setAvatar([0,acceptedFiles]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <button type="button" className="secondary-btn">
                      <i className="fa-solid fa-plus"></i>
                      <p>Ajouter une image</p>
                    </button>
                  </div>
                </section>
              )}
            </Dropzone>
            {avatar.length > 1 && (
              <div className="__avatar">
                <i
                  onClick={(elem) => {
                    elem?.stopPropagation()
                    const allAvatar = [...avatar];
                    allAvatar.pop();
                    setAvatar(allAvatar);
                    }}
                  className="fa-regular fa-circle-xmark"
                ></i>
                  <img alt="img" src={URL.createObjectURL(avatar[1][0])} />
              </div>
            )}

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
          {isCreated.created !== "notLaunch" ? (
            <div
              className={
                isCreated.created ? "__answer __success" : "__answer __alert"
              }
            >
              {isCreated.message}
            </div>
          ) : (
            <></>
          )}
          <p
            onClick={() => {
              setModalIsVisible({ login: true, singup: false });
            }}
          >
            Tu as déjà un compte ? Connecte-toi !
          </p>
        </div>
      </main>
    </>
  );
};

export default Signup;
