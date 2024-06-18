import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Offer = ({ url }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [dataOffer, setDataOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isOffer, setIsOffer] = useState(false);
  const [tokenOwner, setTokenOwner] = useState("");
  const [buyer, setBuyer] = useState({});

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${url}/offers/${id}`)
        .then((response) => {
          setDataOffer(response.data.data);
          setIsOffer(true);
          setTokenOwner(response.data.owner);
          console.log(response.data);
          setBuyer(response.data.buyer);
          if (tokenOwner !== Cookies.get("token") && buyer.isBought) {
            setTimeout(() => {
              navigate("/"), 1000;
            });
          }
        })
        .catch((error) => {
          setDataOffer([error.response.data.message]);
          setIsOffer(false);
        });

      setIsLoading(false);
    };

    fetchData();
  }, [id]);
  const navigate = useNavigate();
  const redirected = async () => {
    const navig = () => {
      navigate("/");
    };
    const timeOut = await setTimeout(navig, 2000);
    console.log(timeOut);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isOffer ? (
            <div className="__offer-body">
              <section className="__offer-card">
                <div className="__image-offer">
                  {dataOffer.product_image ? (
                    <>
                      <img src={dataOffer.product_image} alt="" />

                      <div className="__my-carousel">
                        <Carousel responsive={responsive}>
                          {dataOffer.product_pictures.map((picture) => {
                            if (dataOffer.product_pictures.length === 1) {
                              return;
                            } else {
                              return (
                                <div key={picture} className="__carousel">
                                  <img src={picture} alt="more pictures" />
                                </div>
                              );
                            }
                          })}
                        </Carousel>
                      </div>
                    </>
                  ) : (
                    <div className="__false-image"></div>
                  )}
                </div>
                <div className="__details-offer">
                  <div className="__informations-offer">
                    <h2>{dataOffer.product_price} €</h2>
                    {dataOffer.product_details.map((elem) => {
                      return (
                        <div key={Object.keys(elem)}>
                          <span>{Object.keys(elem)}</span>
                          <span>{elem[Object.keys(elem)]}</span>
                        </div>
                      );
                    })}
                  </div>
                  <hr />
                  <div className="__content-offer">
                    <p>{dataOffer.product_name}</p>
                    <p>{dataOffer.product_description}</p>
                    <p>{dataOffer.owner.account.username}</p>
                  </div>
                  <hr />
                  {tokenOwner === Cookies.get("token") && buyer.isBought ? (
                    <>
                      <div className="__buyer">
                        <p>Acheté par : </p>
                        <div>
                          <img
                            src={buyer.buyer.account.avatar.secure_url}
                            alt="Avatar Picture"
                          />
                          <p>{buyer.buyer.account.username}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="__buyer">
                      <>
                        <p>Produit déja vendu...</p>
                      </>
                    </div>
                  )}
                  {!buyer.isBought && (
                    <Link
                      to={Cookies.get("token") ? "/payments" : "/"}
                      state={dataOffer}
                    >
                      <Button title="Acheter" className="primary-btn" />
                    </Link>
                  )}
                </div>
              </section>
            </div>
          ) : (
            <div className="__alert-info">
              <h2>{dataOffer[0]}</h2>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Offer;
