import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Dropdown = ({ title, values, setQuerys, limit, querys}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="dropdown">
      <button className={isOpen?"primary-btn active":"primary-btn"} onClick={() => setIsOpen(!isOpen)}>{limit?`${title} - ${querys.limit}`:`${title} - ${querys.page}`}</button>
      {isOpen ? (
        <ul className="secondary-btn">
          {limit? <>
          {values.limit.map((value) => {
            return (
              <Link to={`?page=${values.page}&limit=${value}`}>
                <li
                  onClick={() => {
                    setIsOpen(!isOpen)
                    setQuerys({
                      page: (values.page),
                      limit: (value),
                      });
                      }}
                      >
                  {value}
                </li>
              </Link>
            );
            })}
          </>
        :
        <>
          {values.page.map((value) => {
            console.log(value)

            return (
              <Link to={`?page=${value}&limit=${values.limit}`}>
                <li 
                  onClick={() => {
                    setIsOpen(!isOpen)

                    setQuerys({
                      page: (value),
                      limit: (values.limit),
                      });
                      }}
                      >
                  {value}
                </li>
              </Link>
            );
            })}
          </>
        }
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dropdown;
