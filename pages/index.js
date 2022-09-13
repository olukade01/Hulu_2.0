import Head from "next/head";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Body from "../components/Body";
import requests from "../utils/Requests";

export default function Home({ results }) {
  // console.log(results);
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />
      <Body results={results} />
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
  console.log(request);
  return {
    props: {
      results: request.results,
    },
  };
}
