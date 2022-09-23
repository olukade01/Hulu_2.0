// import Image from "next/image";
import HeaderItems from "./HeaderItems";
import {
  HomeIcon,
  CollectionIcon,
  BadgeCheckIcon,
  LightningBoltIcon,
  UserIcon,
  SearchIcon,
  XIcon,
  BackspaceIcon,
} from "@heroicons/react/outline";
import { useState, useCallback } from "react";
import styles from "../styles/utils.module.scss";
import axios from "axios";
import debounce from "lodash.debounce";
const API_KEY = "d50091b39be416d0eae205c5e5fa6f9d";

const headerItemsArr = [
  {
    Icon: HomeIcon,
    title: "HOME",
  },
  {
    Icon: LightningBoltIcon,
    title: "TRENDING",
  },
  {
    Icon: BadgeCheckIcon,
    title: "VERIFIED",
  },
  {
    Icon: CollectionIcon,
    title: "COLLECTIONS",
  },
  {
    Icon: UserIcon,
    title: "ACCOUNT",
  },
];
function Header({ fetchMovies, setSearchKey, searchKey }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const fetchOptions = async () => {
    if (searchKey) {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: API_KEY,
            query: searchKey,
          },
        }
      );
      setOptions(data.results);
      setLoading(false);
    }
    // else {
    //   setOptions([]);
    // }
  };
  const debouncedSave = useCallback(
    debounce(() => fetchOptions(), 1000),
    [searchKey]
  );
  return (
    <header className="flex flex-col m-5 mb-14 sm:flex-row h-auto items-center justify-between gap-x-8 sm:justify-center  sm:flex-wrap">
      <div className="flex flex-grow justify-between max-w-xl">
        {headerItemsArr.map((data) => (
          <HeaderItems key={data.title} {...data} />
        ))}
      </div>
      <div className="">
        <form
          className={`relative flex items-center ${open && styles.open}`}
          onSubmit={(e) => {
            e.preventDefault();
            fetchMovies();
            setOptions([]);
          }}
        >
          {open ? (
            <button
              className="text-black absolute bottom-[0.4rem] left-1"
              type="submit"
            >
              <SearchIcon className="h-7" />
            </button>
          ) : (
            <div className="group flex flex-col items-center w-20 text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer">
              <SearchIcon
                className={`${styles.icon} bg-gradient-to-l from-sky-500 to-indigo-500 group-hover:from-transparent p-2 z-50 h-12 group-hover:animate-spin absolute`}
                onClick={() => setOpen(true)}
              />
              <p className="tracking-widest opacity-0 mt-10 group-hover:opacity-100">
                SEARCH
              </p>
            </div>
          )}
          <input
            className={`${styles.search}`}
            type="text"
            value={searchKey}
            onInput={(event) => {
              setSearchKey(event.target.value);
              debouncedSave();
              // fetchOptions();
            }}
          />
          {open && (
            <XIcon
              className={`${styles.close} hover:animate-spin text-red-400 h-7 absolute cursor-pointer right-[-4px]`}
              onClick={() => {
                setSearchKey("");
                setOpen(false);
              }}
            />
          )}
          {searchKey.length !== 0 && (
            <BackspaceIcon
              onClick={() => setSearchKey("")}
              className={`${styles.delete} hover:animate-bounce text-blue-300 h-7 absolute cursor-pointer right-[1.8rem]`}
            />
          )}
        </form>
        {searchKey && (
          <div
            className={`${
              open && "w-72 h-32"
            } text-black overflow-scroll p-3 bg-white`}
          >
            <ul>
              {loading && <li>Loading...</li>}
              {options?.length > 0 &&
                !loading &&
                options.map((movie, index) => (
                  <li
                    className="cursor-pointer"
                    key={`${movie.id}-${index}`}
                    onClick={() =>
                      setSearchKey(movie.title || movie.original_title)
                    }
                  >
                    {movie.title || movie.original_title}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
