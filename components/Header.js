import Image from "next/image";
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
    <header className="flex flex-col m-5 sm:flex-row h-auto items-center justify-between">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        {headerItemsArr.map((data) => (
          <HeaderItems key={data.title} {...data} />
        ))}
      </div>
      <form
        className={`relative flex justify-start items-center ${
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
          <SearchIcon
            className={`${styles.icon} h-8 hover:animate-spin absolute cursor-pointer`}
            onClick={() => setOpen(true)}
          />
        )}
        <input
          className={`${styles.search}`}
          type="text"
          onInput={(event) => setSearchKey(event.target.value)}
        />
        {open && (
          <XIcon
            className={`${styles.close} hover:animate-spin text-red-400 h-7 absolute cursor-pointer right-1`}
            onClick={() => {
              setSearchKey("");
              setOpen(false);
            }}
          />
        )}
        {searchKey.length !== 0 && (
          <BackspaceIcon
            onClick={() => setSearchKey("")}
            className={`${styles.delete} hover:animate-bounce text-blue-300 h-7 absolute cursor-pointer right-[3rem]`}
          />
        )}
      </form>
      <Image
        className="object-contain"
        src="https://links.papareact.com/ua6"
        alt="hulu-logo"
        width={200}
        height={100}
      />
    </header>
  );
}

export default Header;
