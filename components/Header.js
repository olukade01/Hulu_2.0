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
    Icon: SearchIcon,
    title: "SEARCH",
  },
  {
    Icon: UserIcon,
    title: "ACCOUNT",
  },
];
function Header() {
  return (
    <header className="flex flex-col m-5 sm:flex-row h-auto items-center justify-between">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        {headerItemsArr.map((data) => (
          <HeaderItems key={data.title} {...data} />
        ))}
      </div>
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
