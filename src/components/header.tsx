import WhiteLogoImg from "@/assets/img/logo-white.png";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHeaderVisibilityOnScroll } from "@/hooks/useHeaderVisibilityOnScroll";

export function Header() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const path: string = pathname.replace("/", "");
    const activeState: HTMLElement = document.getElementById(
      `${path}-link`,
    ) as HTMLElement;
    activeState.className = "underline decoration-4 underline-offset-[14px]";

    return () => {
      activeState.className = "";
    };
  }, [pathname]);

  useHeaderVisibilityOnScroll("header");

  return (
    <>
      <header
        id="header"
        className="fixed top-0 z-50 block w-full bg-[#ff6600]/80 backdrop-blur-[6px] transition-all duration-500"
      >
        <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-5 ">
          <div className="flex items-center justify-center">
            <img src={WhiteLogoImg} alt="" className="w-32" />
          </div>
          <button
            id="navbar-button"
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => {}}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <nav className="static top-14 ml-0 hidden w-auto sm:block">
            <ul className="flex gap-6 pb-1 leading-none text-white">
              <li className="">
                <Link id="work-link" to={`/work${search ? search : ""}`}>
                  Work
                </Link>
              </li>
              <li>
                <Link id="about-link" to={`/about${search ? search : ""}`}>
                  About
                </Link>
              </li>
              <li>
                <Link
                  id="services-link"
                  to={`/services${search ? search : ""}`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link id="ideas-link" to={`/ideas${search ? search : ""}`}>
                  Ideas
                </Link>
              </li>
              <li>
                <Link id="careers-link" to={`/careers${search ? search : ""}`}>
                  Careers
                </Link>
              </li>
              <li>
                <Link id="contact-link" to={`/contact${search ? search : ""}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
