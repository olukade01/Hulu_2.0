import Image from "next/image";
import { ThumbUpIcon } from "@heroicons/react/outline";
import { forwardRef } from "react";
import Link from "next/link";

const Thumbnail = forwardRef(({ result }, ref) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  return (
    <Link href={`/movie/${result.id}`}>
      <div
        ref={ref}
        className="group cursor-pointer p-2 transition duration-200 ease-in transform hover:border-2 hover:border-gray-500 sm:hover:scale-105 "
      >
        <Image
          width={1920}
          height={1000}
          alt={result.title}
          src={
            `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
            `${BASE_URL}${result.poster_path}`
          }
          layout="responsive"
          priority={true}
        />
        <div className="p-2">
          <p className="truncate max-w-md">{result.overview}</p>
          <h2 className="mt-1 text-2xl text-white transition-all duration-200 ease-in-out group-hover:font-bold">
            {result.title || result.original_title}
          </h2>
          <p className="flex items-center opacity-0 group-hover:opacity-100">
            {result.media_type} {result.release_date || result.first_air_date}
            . <ThumbUpIcon className="h-5 mx-2" />
            {result.vote_count}
          </p>
        </div>
      </div>
    </Link>
  );
});

Thumbnail.displayName = "Thumbnail";

export default Thumbnail;
