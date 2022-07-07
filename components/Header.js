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

function Header() {
  return (
    <header className="flex flex-col m-5 sm:flex-row h-auto items-center justify-between">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        <HeaderItems Icon={HomeIcon} title="HOME" />
        <HeaderItems Icon={LightningBoltIcon} title="TRENDING" />
        <HeaderItems Icon={BadgeCheckIcon} title="VERIFIED" />
        <HeaderItems Icon={CollectionIcon} title="COLLECTIONS" />
        <HeaderItems Icon={SearchIcon} title="SEARCH" />
        <HeaderItems Icon={UserIcon} title="ACCOUNT" />
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
