import OfferComponent from "../../components/OfferComponent";
import Loading from "../../components/Loading";
import crunchFilter from "../../assets/img/home-filter-crunch.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [querys, setQuerys] = useState({});
  const [data, setData] = useState([]);
  const [isOffer, setIsOffer] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchQuerys = async () => {
      const allQuerys = location.search.replace("?", "").split("&");
      const querysArray = allQuerys.map((elem) => {
        return elem.split("=");
      });
      setQuerys(Object.fromEntries(querysArray));
    };
    fetchQuerys();
  }, []);

  useEffect(() => {
    const fetchData = async (page, limit) => {
      await axios
        .get(`${url}/offers/?page=${page}&limit=${limit}`)
        .then((response) => {
          setData(response.data);
          setIsOffer(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setData([error.response.data]);
          setIsOffer(false)
        });
    };

    fetchData(querys.page, querys.limit);
  }, [querys]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="hero">
            <div className="__filter">
              <img src={crunchFilter} alt="Home Filter" />
            </div>
            <div className="__sell">
              <h2>Prêt à faire du tri dans vos placards ?</h2>
              <button className="primary-btn">Commencer à vendre</button>
            </div>
          </div>
          <section className="container">
            {!isOffer ? (
              <div className="__alert-info">
                <h2>{data[0]}</h2>
              </div>
            ) : (
              <>
                {data.offers.map((offer) => {
                  return (
                    <Link key={offer.id} to={`/offer/${offer.id}`}>
                      <OfferComponent offer={offer} />
                    </Link>
                  );
                })}
              </>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default Home;
