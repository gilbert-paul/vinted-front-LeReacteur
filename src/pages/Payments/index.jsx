import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Payments = ({ url }) => {
  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);
  const location = useLocation();
  const { product_price, product_name } = location.state;
  const protection_price = 80;
  const travel_price = 120;
  const total_price =
    Number((product_price * 100).toFixed(0)) + protection_price + travel_price;
  const options = {
    mode: "payment",
    amount: Number((product_price * 100).toFixed(0)),
    currency: "eur",
  };
  const [completed, setCompleted] = useState(false);

  return (
    <main className="payments">
      <div className="container">
        <div className="__informations">
          <h3>Résumé de votre achat :</h3>
          <div>
            <span>Commande :</span>
            <span>{product_price} €</span>
          </div>
          <div>
            <span>Frais de protection acheteur :</span>
            <span>{(protection_price / 100).toFixed(2)} €</span>
          </div>
          <div>
            <span>Frais de port :</span>
            <span>{(travel_price / 100).toFixed(2)} €</span>
          </div>
        </div>
        <div className="__total">
          <div>
            <span>Total :</span>
            <span></span>
            {(total_price / 100).toFixed(2)} €
          </div>
        </div>
        {completed ? (
          <div className="__accepted">
            <p>Payement accepté ! Merci pour votre achat</p>
            <Link to="/">
              <button className="secondary-btn">
                Retour à la page d'accueil
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="__validation">
              <p>
                Il ne vous reste plus qu'une étape pour vous offrir{" "}
                <span>{product_name}</span>. Vous allez payer{" "}
                <span>{(total_price / 100).toFixed(2)} €</span> (frais de
                protection et frais deport inclus).
              </p>
            </div>
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                url={url}
                completed={completed}
                setCompleted={setCompleted}
              />
            </Elements>
          </>
        )}
      </div>
    </main>
  );
};

export default Payments;
