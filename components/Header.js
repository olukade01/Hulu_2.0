import Image from "next/image";
import HeaderItems from "./HeaderItems";
import {
  HomeIcon,
  CollectionIcon,
  BadgeCheckIcon,
  LightningBoltIcon,
  UserIcon,
  SearchIcon,
} from "@heroicons/react/outline";

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
function Header({ fetchMovies, setSearchKey }) {
  return (
    <header className="flex flex-col m-5 sm:flex-row h-auto items-center justify-between">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        {headerItemsArr.map((data) => (
          <HeaderItems key={data.title} {...data} />
        ))}
      </div>
      <form className="form" onSubmit={fetchMovies}>
        <input
          className="search"
          type="text"
          id="search"
          onInput={(event) => setSearchKey(event.target.value)}
        />
        <button className="submit-search" type="submit">
          <i className="fa fa-search">th</i>
        </button>
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
