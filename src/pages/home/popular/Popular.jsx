import React, { useState } from "react";
import ContentWrapper from "./../../../components/contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/swithTab/SwitchTab";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChnage = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div>
      <div className="crausalSection">
        <ContentWrapper>
          <span className="crausalTitle">Popular</span>
          <SwitchTab data={["Movies", "Tv Shows"]} onTabChnage={onTabChnage} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
      </div>
    </div>
  );
};

export default Popular;
