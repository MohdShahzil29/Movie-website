import React, { useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfig, getGenres } from "./store/homeSlice";
import Home from "./pages/home/Home";
import Search from "./pages/searchResult/Search";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    fetchApiConfig();
    genrescall();
  }, []);

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.homes);
  console.log(url);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfig(url));
    });
  };

  const genrescall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenre = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data);
    data?.map(({ genres }) => {
      return genres?.map((item) => (allGenre[item.id] = item));
    });
    // console.log(allGenre)
    dispatch(getGenres(allGenre));
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
