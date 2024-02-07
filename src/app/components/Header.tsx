import Image from "next/image";
import Navigation from "./Navigation";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed flex w-full flex-col bg-white">
      <div className="flex h-14 w-full items-center justify-center">
        <Link href="/">
          {" "}
          <Image
            src="./jjcx_logo.svg"
            alt="jjcx logo"
            height={20}
            width={65}
          />{" "}
        </Link>
      </div>
      <div className="flex h-14 w-full items-center justify-center">
        <Navigation />
      </div>
    </header>
  );
}
