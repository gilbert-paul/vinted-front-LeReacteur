import OfferComponent from "../../components/OfferComponent";
import Loading from "../../components/Loading";
import crunchFilter from "../../assets/img/home-filter-crunch.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [querys, setQuerys] = useState({ page: 1, limit: 20 });
  const [data, setData] = useState([]);
  const [isOffer, setIsOffer] = useState(false);
  const location = useLocation();
  const [numberPages, setNumberPages] = useState([1]);
  useEffect(() => {
    const fetchQuerys = async () => {
      const allQuerys = location.search.replace("?", "").split("&");
      if (allQuerys.length > 1) {
        const querysUrlArray = Object.fromEntries(allQuerys.split("="));
        if (querysUrlArray.page) {
          querysArray.page = querysUrlArray.page;
        }
        if (querysUrlArray.limit) {
          querysArray.limit = querysUrlArray.limit;
        }
      }
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
          
          const numberOfPages = [1];
          for (let i = 1; i < (Math.ceil(data.count / querys.limit)); i++) {
            numberOfPages.push(i + 1);

          }
          setNumberPages(numberOfPages);
          setIsLoading(false);
        })
        .catch((error) => {
          setData([error.response.data]);
          setIsOffer(false);
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
          <section className="container __pagination">
            <div>
              <label htmlFor="page">Page :
                <select value={querys.page}
                  onChange={(event) => {
                    setQuerys({
                      page: Number(event.target.value),
                      limit: querys.limit,
                    });
                  }}
                  name="page"
                  id="page"
                >

                  {numberPages.map((elem) => {
                   return <option key={elem} value={Number(elem)}>{elem}</option>;
                  })
                  }
                </select>
                </label>
                <label htmlFor="limit">Articles par page :

                <select value={querys.limit}
                  onChange={(event) => {
                    setQuerys({
                      page: 1,
                      limit: Number(event.target.value),
                    });
                  }}
                  name="limit"
                  id="limit"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
                </label>
            </div>
          </section>
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
