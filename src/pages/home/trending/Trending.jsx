import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/swithTab/SwitchTab";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";

const trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const onTabChnage = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div>
      <div className="crausalSection">
        <ContentWrapper>
          <span className="crausalTitle">Trending</span>
          <SwitchTab data={["Day", "Week"]} onTabChnage={onTabChnage} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
      </div>
    </div>
  );
};

export default trending;
