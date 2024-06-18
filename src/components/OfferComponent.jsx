const OfferComponent = ({ offer }) => {
  return (
    <article key={offer.id} className="__offer-card">
      <div className="__user">
        {offer.owner.account.avatar ? (
          <img src={offer.owner.account.avatar} alt="Image from user" />
        ) : (
          <></>
        )}
        <p>{offer.owner.account.username}</p>
      </div>
      <div className="__article-card">
        <div className="__image">
          {offer.product_image ? (
            <img src={offer.product_image} alt="Image from offer" />
          ) : (
            <div className="__falseImage"></div>
          )}
        </div>
        <h3>{offer.product_price} €</h3>
        <p>{offer.product_details[1]["TAILLE"]}</p>
        <p>{offer.product_details[0]["MARQUE"]}</p>
      </div>
    </article>
  );
};
export default OfferComponent;
