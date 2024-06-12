import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {useLocation} from "react-router-dom";



const Offer = ({ url }) => {


  const [dataOffer, setDataOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${url}/offers/${id}`).then((response) => {
        setDataOffer(response.data);
      });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="__offer-body">
            <section className="__offer-card">
              <div className="__image-offer">
                {dataOffer.product_image ? (
                    <img src={dataOffer.product_image} alt="" />
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
                <Link to="/" >
              <Button title="Acheter" className="primary-btn" />
                </Link>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Offer;
