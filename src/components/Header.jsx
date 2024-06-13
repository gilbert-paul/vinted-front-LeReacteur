import {useLocation} from "react-router-dom";
import Button from "../components/Button";
import logoVinted from "../assets/img/logoVinted.png";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"



const Header = (token, setToken) => {
  const navigate =useNavigate()
  const [hideFilters, setHideFilters] = useState(false)
  const location = useLocation()
  useEffect(()=>{

    if(location.pathname.search("/")){
      setHideFilters(true);
    } else {setHideFilters(false)}
    },[])

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
            <input type="search" placeholder="Recherche des articles" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          {!hideFilters ? (<>
            <div className="__filter">
              <div className="__by-trend">
                <p>Trier par prix:</p>
                <input type="checkbox" />
              </div>
              <div className="__by-value">
                <p>Prix entre :</p>
                <div>filter_bar</div>
              </div>
            </div>
          </>
          ) : (
            <></>
          )}
        </article>
        <article className="__connexion-area">
          <Button className="secondary-btn" title={"S'inscrire"} />
          {!Cookies.get("token")?
        <Link to="/user/login"><Button className="secondary-btn" title="Se connecter" /></Link>         
        :
        <Button className="primary-btn" title="Se déconnecter" disconnected={true}/>
        }
        </article>
        <article className="__sell-area">
          <Button className="primary-btn" title={"Vends tes articles"} />
        </article>
      </div>
    </header>
  );
};

export default Header;
