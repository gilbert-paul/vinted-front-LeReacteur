import { useEffect, useState } from "react";
import Input from "../../components/Input";
import axios from "axios";
import Cookies from "js-cookie";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";

const Add = ({
  url,
  setModalIsVisible,
  modalIsVisible,
  setTryToSell,
  tryToSell,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(false);
  const [file, setFile] = useState([]);
  const [result, setResult] = useState({});
  const [error, setError] = useState({});
  const [pictures, setPictures] = useState([]);
  const fetchData = (url) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("price", price);
    for (let i = 0; i < file.length; i++) {
      formData.append(`picture${i}`, file[i]);
    }
    formData.append("change", change);
    axios
      .post(url + "/offers/publish", formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleBrand = (event) => {
    setBrand(event.target.value);
  };
  const handleSize = (event) => {
    setSize(event.target.value);
  };
  const handleColor = (event) => {
    setColor(event.target.value);
  };
  const handleCondition = (event) => {
    setCondition(event.target.value);
  };
  const handleCity = (event) => {
    setCity(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleChange = () => {
    setChange(!change);
  };
  const handlePicture = (event) => {
    console.log("patate")
    setFile([...file, ...Array.from(event.target.files)]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    fetchData(url);
    navigate("/")
  };
  useEffect(() => {
    if (!Cookies.get("token")) {
      setModalIsVisible({ login: true, signup: false });
      setTryToSell(true);
      navigate("/");
      return;
    }
  }, []);
  return (
    <main className="container __publish">
      <h1>Vends ton article :</h1>
      <form onSubmit={handleSubmit} action="">
        <section>
          {file.length > 0 && (
            <div className="__preview">
              {file.map((image, index) => {
                return (
                  <div key={image.name}>
                    <div>{image.name}</div>
                    <img alt="img" src={URL.createObjectURL(image)} />
                    <i
                      onClick={() => {
                        {file.length!==0}{

                        const allFiles = [...file]
                        {file.length>1?
                        allFiles.splice(file.indexOf(image),1)
                      :
                      allFiles.pop()
                    }
                    setFile(allFiles)
                      }

                      }}
                      className="fa-regular fa-circle-xmark"
                    ></i>
                  </div>
                );
              })}
            </div>
          )}
          <div className="__moreImage">
            <Dropzone onDrop={(acceptedFiles) => {
              console.log(acceptedFiles)
              
              setFile([...file, ...Array.from(acceptedFiles)])
              }}>
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
          </div>
        </section>
        <section className="__header">
          <Input
            handle={handleTitle}
            title={"Title"}
            content={"ex: Chemise Sézane verte"}
            type={"text"}
            name={"title"}
            value={title}
            setValue={setTitle}
          />
          <Input
            handle={handleDescription}
            title={"Décris ton article :"}
            content={"ex: Porté quelques fois, taille un peu petit"}
            type={"text"}
            name={"description"}
            value={description}
            setValue={setDescription}
          />
        </section>
        <section className="__options">
          <Input
            handle={handleBrand}
            title={"Marque"}
            content={"ex: Zara"}
            type={"text"}
            name={"marque"}
            value={brand}
            setValue={setBrand}
          />
          <Input
            handle={handleSize}
            title={"Taille"}
            content={"ex: L / 40"}
            type={"text"}
            name={"taille"}
            value={size}
            setValue={setSize}
          />
          <Input
            handle={handleColor}
            title={"Couleur"}
            content={"ex: Fushia"}
            type={"text"}
            name={"couleur"}
            value={color}
            setValue={setColor}
          />
          <Input
            handle={handleCondition}
            title={"Etat"}
            content={"ex: Neuf avec étiquette"}
            type={"text"}
            name={"etat"}
            value={condition}
            setValue={setCondition}
          />
          <Input
            handle={handleCity}
            title={"Lieu"}
            content={"ex: Paris"}
            type={"text"}
            name={"lieu"}
            value={city}
            setValue={setCity}
          />
        </section>
        <section className="__price">
          <Input
            handle={handlePrice}
            title={"Prix"}
            content={"ex: 0,00 €"}
            type={"number"}
            name={"price"}
            value={price}
            setValue={setPrice}
          />
          <Input
            handle={handleChange}
            title={"Je suis interessé(e) par les échanges"}
            type={"checkbox"}
            name={"change"}
            value={change}
            setValue={setChange}
          />
        </section>
        <button type="submit" className="primary-btn">
          Ajouter
        </button>
      </form>
      {result.message ? (
        <>
          <h1>{result.message}</h1>
        </>
      ) : (
        <h1>{error.message}</h1>
      )}
    </main>
  );
};

export default Add;
