import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";

const TransactionBuy = ({ url }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}/transactions/buy`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container transactions">
          <table>
            <thead>
              <tr>
                <th>Vendeur</th>
                <th>Offre</th>
                <th>Prix</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.data.sellTransactions.map((sellTransaction) => {
                return (
                  <tr key={sellTransaction.offer._id}>
                    <td>{sellTransaction.seller.account.username}</td>
                    <td>{sellTransaction.offer.product_name}</td>
                    <td>{sellTransaction.offer.product_price} €</td>

                    <td>{sellTransaction.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TransactionBuy;
