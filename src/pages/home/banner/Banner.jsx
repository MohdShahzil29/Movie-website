import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoad/Img";
import "./banner.scss";

const banner = () => {
  const [backgrond, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { url } = useSelector((state) => state.homes);
  const navigate = useNavigate();


  
  const searchController = (event) => {
    if (event.key == "Enter" && query.length > 0) {
      navigate(`search/${query}`);
    }
  };

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  return (
    <div className="banner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={backgrond} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="banner-content">
          <span className="title">Welcome!</span>
          <span className="subtitle">
          Unleash a universe of boundless entertainment with millions of mesmerizing shows.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Serach as you wish"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchController}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default banner;
