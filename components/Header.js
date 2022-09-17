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
import { useState } from "react";
import styles from "../styles/utils.module.scss";

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
  return (
    <header className="flex flex-col m-5 mb-14 sm:flex-row h-auto items-center justify-between gap-x-8">
      <div className="flex flex-grow justify-between max-w-xl">
        {headerItemsArr.map((data) => (
          <HeaderItems key={data.title} {...data} />
        ))}
      </div>
      <form
        className={`relative pr-8 flex justify-start items-center ${
          open && styles.open
        }`}
        onSubmit={fetchMovies}
      >
        {open ? (
          <button
            className="text-black absolute bottom-[0.4rem] left-1"
            type="submit"
          >
            <SearchIcon className="h-7" />
          </button>
        ) : (
          <div className="group flex flex-col items-center w-12 sm:w-20 text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer">
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
          onInput={(event) => setSearchKey(event.target.value)}
        />
        {open && (
          <XIcon
            className={`${styles.close} hover:animate-spin text-red-400 h-7 absolute cursor-pointer right-9`}
            onClick={() => {
              setSearchKey("");
              setOpen(false);
            }}
          />
        )}
        {searchKey.length !== 0 && (
          <BackspaceIcon
            onClick={() => setSearchKey("")}
            className={`${styles.delete} hover:animate-bounce text-blue-300 h-7 absolute cursor-pointer right-[5rem]`}
          />
        )}
      </form>
      {/* <Image
        className="object-contain"
        src="https://links.papareact.com/ua6"
        alt="hulu-logo"
        width={200}
        height={100}
      /> */}
    </header>
  );
}

export default Header;
