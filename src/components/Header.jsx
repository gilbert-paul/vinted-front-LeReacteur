import {useLocation} from "react-router-dom";
import Button from "../components/Button";
import logoVinted from "../assets/img/logoVinted.png";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"



const Header = ({modalIsVisible, setModalIsVisible}) => {
  const navigate =useNavigate()
  const [hideFilters, setHideFilters] = useState(false)
  const location = useLocation()
  useEffect(()=>{
    if(location.pathname === "/"){
      setHideFilters(false);
    } else {setHideFilters(true)}
    },[location])

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
          
          {!Cookies.get("token")?
          <>
          <Button className="secondary-btn" title={"S'inscrire"} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible}  modal="signup" />
        <Button className="secondary-btn" title="Se connecter" modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible} modal="login"/>        
          </>
        :
        <Button className="primary-btn" title="Se déconnecter"  disconnected={true} />
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
