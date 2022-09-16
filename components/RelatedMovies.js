import Image from "next/image";
import Link from "next/link";
import React from "react";

const RelatedMovies = ({ result }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  return (
    <Link href={`/movie/${result.id}`}>
      <div className="group cursor-pointer p-2 duration-200 hover:scale-110 hover:z-50">
        <Image
          width={1200}
          height={600}
          alt={result.title}
          src={`${BASE_URL}${result.backdrop_path || result.poster_path}`}
          priority={true}
        />
        <h2 className="mt-1 text-lg group-hover:text-red-200 group-hover:font-bold">
          {result.title || result.original_title}
        </h2>
      </div>
    </Link>
  );
};

export default RelatedMovies;
