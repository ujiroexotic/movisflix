import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import './style.scss';

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movisflix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const controlNavbar = () => {

    if (window.scrollY > 180) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      }
      else {
        setShow("show");
      }
    }
    else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar) // For optimization or save memory
    }
  }, [lastScrollY])

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  }

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  }

  const searchQueryHandler = (event) => {

    if (event.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false)
        setQuery("");
      }, 1000);
    }

  }

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate('/explore/movie')
    }
    else {
      navigate('/explore/tv')
    }
    setMobileMenu(false)
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate(`/`)}>
          <img src={logo} />
        </div>
        <ul className="menuItems">
          <li className="menuItem"
            onClick={() => navigationHandler("movie")}
          >
            Movies
          </li>
          <li className="menuItem"
            onClick={() => navigationHandler("tv")}
          >
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch
              onClick={openSearch}
              className="cursor"
            />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch
            onClick={openSearch}
            className="cursor"
          />
          {
            mobileMenu ? (
              <VscChromeClose
                onClick={() => setMobileMenu(false)}
                className="cursor"
              />
            ) : (
              <SlMenu
                onClick={openMobileMenu}
                className="cursor"
              />
            )
          }
        </div>
      </ContentWrapper>
      {
        showSearch && <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder='Search for a movie or tv show....'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>
      }
    </header>
  );
};

export default Header;