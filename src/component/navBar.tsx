import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import logoSmall from "@/assets/logo-small.svg";

const Links = [
  {
    name: "Characters",
    url: "/",
  },
  {
    name: "Comics",
    url: "/",
  },
  {
    name: "Movies",
    url: "/",
  },
];

export default function NavBar() {
  return (
    <div className="w-full h-[52px] px-2 sm:px-20 bg-black-light ">
      <div className="max-w-screen-xl mx-auto h-full flex gap-2 sm:gap-5 items-center justify-between text-white font-bold text-sm sm:text-xl">
        <img src={logo} alt="logo" className="hidden sm:block w-[130px] h-[40px]" />
        <img src={logoSmall} alt="logo" className="block sm:hidden w-[40px] h-[40px]" />

        <nav className="flex-1">
          <ul className="flex gap-3 sm:gap-10 uppercase">
            {Links.map((link) => (
              <li key={link.name}>
                <Link to={link.url}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-2 items-center">
          <RxAvatar size={24} />
          <span>Lin</span>
        </div>
      </div>
    </div>
  );
}
