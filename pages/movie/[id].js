import React from "react";
import requests from "../../utils/Requests";
const API_KEY = process.env.API_KEY;
import { ArrowNarrowLeftIcon, StarIcon, EyeIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import YouTube from "react-youtube";
import Body from "../../components/Body";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RelatedMovies from "../../components/RelatedMovies";

const Id = ({ request, requestt }) => {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 3,
    swipeToSlide: true,
    draggable: true,
    // arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1008,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log(request);
  if (request && request.success === false) {
    return (
      <h1 className="text-center mt-40 text-3xl sm:text-6xl animate-bounce p-10 text-red-400">
        Movie Details Coming Soon!!!
      </h1>
    );
  }
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const trailerVid = request?.videos.results.find(
    ({ type }) => type === "Trailer"
  );
  const key = trailerVid ? trailerVid : request?.videos.results[0];
  const languages = request?.spoken_languages.map(
    (language) => language.english_name || language.name
  );
  const genres = request?.genres.map((genre) => genre.name);

  return (
    <div>
      <Link href={"/"}>
        <div className="flex items-center gap-x-2 justify-center bg-white w-40 shadow-lg text-lg text-black cursor-pointer rounded-full m-6">
          <ArrowNarrowLeftIcon className="h-12 text-red-400" />
          <h1>Go Back</h1>
        </div>
      </Link>
      <div className="sm:p-10 p-3 lg:p-20 pb-6">
        <h1 className="text-3xl mb-6">OFFICIAL TRAILER</h1>
        {request?.videos && request?.videos.results.length ? (
          <YouTube
            videoId={key.key}
            opts={{ width: "100%", height: "600px" }}
          />
        ) : (
          <h1 className="text-4xl">Sorry, No trailer available</h1>
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-4 pr-8">
        <div className="m-auto">
          <Image
            alt={request?.title}
            src={
              // `${BASE_URL}${request.poster_path}` ||
              `${BASE_URL}${request?.poster_path || request?.backdrop_path}`
            }
            width={800}
            height={800}
            objectFit="contain"
          />
        </div>
        <div className="space-y-2 max-w-2xl px-4">
          <h1 className="text-4xl font-bold">
            {request?.title || request?.original_title}
          </h1>
          <h1 className="font-semibold">{request?.overview}</h1>
          <h1>Genres: {genres?.join(", ")}</h1>
          <h1>Tagline: {request?.tagline}</h1>
          <h1>Status: {request?.status}</h1>
          <h1>Duration: {request?.runtime} minutes</h1>
          <h1>Languages: {languages?.join(", ")}</h1>
          <h1 className="flex items-center">
            The people seen this: {request?.popularity}{" "}
            <EyeIcon className="h-5 text-blue-300" />
          </h1>
          <h1>
            Released in: {request?.release_date || request?.first_air_date}
          </h1>
          <h1 className="flex items-center">
            Vote average: {request?.vote_average}{" "}
            <StarIcon className="h-5 text-yellow-300" />
          </h1>
          <h1>Vote count: {request?.vote_count}</h1>
          {request?.adult && (
            <h1 className="text-red-400 text-2xl">Rated 18</h1>
          )}
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl p-5 pb-0 sm:p-8 text-gray-400">
        Related Images
      </h1>
      {request?.images.backdrops.length ? (
        <div className="px-6 grid grid-cols-2 md:flex flex-wrap justify-center gap-x-3 sm:gap-x-5">
          {request?.images.backdrops.slice(0, 8).map(({ file_path }, index) => (
            <Image
              key={index}
              alt={request?.title}
              src={`${BASE_URL}${file_path}`}
              width={300}
              height={210}
              objectFit="contain"
            />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-3xl">Related Images not available</h1>
      )}
      <div className="p-8 sm:p-12">
        <h1 className="text-3xl mb-6">Similar Movies</h1>
        <Slider {...settings}>
          {requestt?.results.map(
            (result) =>
              (result.backdrop_path || result.poster_path) && (
                <RelatedMovies result={result} />
              )
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Id;

export async function getStaticProps(context) {
  const id = context.params.id;
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
  ).then((res) => res.json());
  const requestt = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&append_to_response=videos`
  ).then((res) => res.json());
  return {
    props: {
      request,
      requestt,
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
    params: {
      id: post.id.toString(),
    },
  }));
  return { paths, fallback: true };
}
