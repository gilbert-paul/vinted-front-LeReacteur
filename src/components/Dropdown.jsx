import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Dropdown = ({ title, values, setData, data, limit=false}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="dropdown">
      <button className={isOpen?"primary-btn active":"primary-btn"} onClick={() => setIsOpen(!isOpen)}>{limit?`${title} - ${data.limit}`:`${title} - ${data.page}`}</button>
      {isOpen ? (
        <ul className="secondary-btn">
          {limit? <>
          {values.limit.map((value) => {
            return (
              <Link key={value} to={`?page=${values.page}&limit=${value}`}>
                <li
                  onClick={() => {
                    setIsOpen(!isOpen)
                    setData({
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
            return (
              <Link key ={value} to={`?page=${value}&limit=${values.limit}`}>
                <li 
                  onClick={() => {
                    setIsOpen(!isOpen)
                    setData({
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
