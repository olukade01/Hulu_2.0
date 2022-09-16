import Head from "next/head";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Body from "../components/Body";
import requests from "../utils/Requests";
import { useState, useEffect } from "react";
// require("dotenv").config();
import axios from "axios";
const API_KEY = "d50091b39be416d0eae205c5e5fa6f9d";
// const API_KEY = process.env.API_KEY;

export default function Home({ results }) {
  // console.log(process.env);
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  const fetchMovies = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: API_KEY,
          query: searchValue,
        },
      }
    );
    console.log({ data });
    setMovies(data.results);
    setSearchValue("");
  };
  // console.log(searchValue);
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        fetchMovies={fetchMovies}
        setSearchKey={setSearchValue}
        searchKey={searchValue}
      />
      <Navbar setMovies={setMovies} />
      <Body results={movies.length ? movies : results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());
  return {
    props: {
      results: request.results,
    },
  };
}
