import React from "react";
import requests from "../../utils/Requests";
const API_KEY = process.env.API_KEY;

const Id = ({ request }) => {
  return <div>{request.title}</div>;
};

export default Id;

export async function getStaticProps(context) {
  const id = context.params.id;
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  ).then((res) => res.json());
  return {
    props: {
      request,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    `https://api.themoviedb.org/3${requests.fetchTrending.url}`
  );
  const next = await res.json();
  const posts = next.results;
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: true };
}

// export async function getStaticPaths() {
//   const res = await fetch(
//     `https://api.themoviedb.org/3${requests.fetchTrending.url}`
//   );
//   const next = await res.json();
//   const posts = next.results;
//   const paths = posts.map((post) => ({
//     params: { id: post.id.toString() },
//   }));
//   // return { paths, fallback: false };
//   const ress = await fetch(
//     `https://api.themoviedb.org/3${requests.fetchTopRated.url}`
//   );
//   const nextt = await ress.json();
//   const postss = nextt.results;
//   const pathss = postss.map((post) => ({
//     params: { id: post.id.toString() },
//   }));
//   return { paths: [...pathss, ...paths], fallback: false };
// }
