import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import logoVinted from "../assets/img/logoVinted.png";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import * as React from "react";
import MultiRangeSlider from "multi-range-slider-react";

const Header = ({
  modalIsVisible,
  setModalIsVisible,
  allFilters,
  setAllFilters,
  setMinValue2,
  setMaxValue2,
  minValue2,
  maxValue2,
  tryToSell,
  setTryToSell
}) => {
  const [hideFilters, setHideFilters] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setHideFilters(false);
    } else {
      setHideFilters(true);
    }
  }, [location]);

  const handleSearch = (event) => {
    setAllFilters({ ...allFilters, search: event.target.value });
  };

  const [boxIsChecked, setBoxIsChecked] = useState(false);
  const handleFalseBox = () => {
    setBoxIsChecked(!boxIsChecked);
    if (boxIsChecked) {
      setAllFilters({
        ...allFilters,
        trendPriceValue: "price-asc",
        trendPrice: true,
      });
    } else {
      setAllFilters({
        ...allFilters,
        trendPriceValue: "price-desc",
        trendPrice: false,
      });
    }
  };
  return (
    <header>
      <div className="container">
        <article>
          <Link to="/">
            <img src={logoVinted} alt="Logo-vinted" />
          </Link>
        </article>
        <article className="__searching-area">
          <div className="__search">
            <input
              onChange={handleSearch}
              type="search"
              placeholder="Recherche des articles"
              value={allFilters.search}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          {!hideFilters ? (
            <>
              <div className="__filter">
                <div className="__by-trend">
                  <p>Trier par prix:</p>

                  <div onClick={handleFalseBox} className="__wraper">
                    <div
                      className={
                        boxIsChecked ? "__false-box active" : "__false-box"
                      }
                    >
                      <i className="fa-solid fa-arrow-up-right-dots"></i>{" "}
                    </div>
                  </div>
                </div>
                <div className="__by-value">
                  <p>Prix entre :</p>

                  <MultiRangeSlider
                    min={0}
                    max={500}
                    minValue={0}
                    maxValue={500}
                    ruler={false}
                    label={false}
                    barLeftColor="var(--third-color)"
                    barRightColor="var(--third-color)"
                    barInnerColor="var(--primary-color)"
                    thumbLeftColor="var(--primary-color)"
                    thumbRightColor="var(--primary-color)"
                    onChange={(e) => {
                      setMinValue2(Number(e.minValue));
                      setMaxValue2(Number(e.maxValue));
                      if (
                        minValue2 !== allFilters.priceMin ||
                        maxValue2 !== allFilters.priceMax
                      ) {
                        setAllFilters({
                          ...allFilters,
                          priceMin: e.minValue,
                          priceMax: e.maxValue,
                        });
                      }
                    }}
                  ></MultiRangeSlider>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </article>
        <article className="__connexion-area">
          {!Cookies.get("token") ? (
            <>
              <Button
                className="secondary-btn"
                title={"S'inscrire"}
                modalIsVisible={modalIsVisible}
                setModalIsVisible={setModalIsVisible}
                modal="signup"
              />
              <Button
                className="secondary-btn"
                title="Se connecter"
                modalIsVisible={modalIsVisible}
                setModalIsVisible={setModalIsVisible}
                modal="login"
              />
            </>
          ) : (
            <Button
              className="primary-btn"
              title="Se déconnecter"
              disconnected={{connected:true, setTryToSell:setTryToSell}}
            />
          )}
        </article>
        <article className="__sell-area">
          <Link to="/offer/publish">
          <Button className="primary-btn" title={"Vends tes articles"} /> 
          </Link>
        </article>
      </div>
    </header>
  );
};

export default Header;
