import "../navbar/Nav.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { fetchCategories, fetchSubCategories } from "../pages/ApiService";
import { FaCaretDown } from "react-icons/fa6";

const Header1 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);

  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getSubCategories = async () => {
    try {
      const data = await fetchSubCategories();
      setSubCategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null); // Reset active dropdown when closing mobile menu
  };

  const handleDropdownHover = (index) => {
    setActiveDropdown(index);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <>
      <div
        className={`site-mobile-menu site-navbar-target ${
          isMobileMenuOpen ? "active" : ""
        }`}
        data-spy="scroll"
        data-target=".site-navbar-target"
        data-offset="300"
      >
        <div className="site-mobile-menu-header">
          <div
            className="site-mobile-menu-close mt-3"
            onClick={toggleMobileMenu}
          >
            <span className="icon-close2 js-menu-toggle">
              <FiX />
            </span>
          </div>
        </div>
        <div className=" mt-5">
          {categories.map((category, index) => (
            <ul
              className="site-menu main-menu js-clone-nav mr-auto d-lg-none "
              key={category.id}
            >
              <li
                className="has-children"
                onMouseEnter={() => handleDropdownHover(index)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  // to="/Subcategorycard"
                  to={`/Subcategorycard/${category.id}`}
                  className="nav-link"
                  style={{
                    fontFamily: "Montserrat, serif",
                    fontWeight: "700",
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "black",
                  }}
                >
                  {category.name}
                </Link>
              </li>
            </ul>
          ))}
        </div>
      </div>

      <header
        className={`site-navbar py-0  bg-white  site-navbar-target ${
          scrolled ? "scrolled" : ""
        }`}
        style={{ height: "65px", paddingBottom: "50px" }}
        role="banner"
      >
        <div className="containers">
          <div className="row align-items-center">
            <div className="col-10 col-xl-2">
              <h1 className="mb-0 site-logo">
                <Link to="/" className="text-black h2 mb-0">
                  <img
                    src={"/assets/img/HorizontalLogo.png"}
                    alt="Logo"
                    style={{ height: "40px" }}
                  />
                </Link>
              </h1>
            </div>

            <div
              className="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
              style={{ position: "relative", top: "3px" }}
            >
              <button
                className="site-menu-toggle js-menu-toggle "
                onClick={toggleMobileMenu}
              >
                <span className={`icon-menu h3 ${scrolled ? "scrolled" : ""}`}>
                  {" "}
                  <FaBars style={{ color: "black" }} />
                </span>
              </button>
            </div>

            <div className="col-12 col-md-10  d-none d-xl-block ">
              <nav
                className="site-navigation position-relative text-right d-flex flex-row navli"
                role="navigation"
              >
                {categories.map((category, index) => (
                  <ul
                    className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block"
                    key={category.id}
                  >
                    <li
                      className="has-children"
                      onMouseEnter={() => handleDropdownHover(index)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <Link
                        to="#"
                        className="nav-link"
                        style={{
                          fontFamily: "Montserrat, serif",
                          fontWeight: "700",
                          fontSize: "14px",
                          lineHeight: "21px",
                          color: "black",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {category.name}
                        <FaCaretDown />
                      </Link>
                      <ul
                        className="dropdown"
                        style={{
                          display: activeDropdown === index ? "grid" : "none",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: "10px",
                        }}
                      >
                        {subcategories
                          .filter(
                            (subcategory) =>
                              subcategory.category === category.id
                          )
                          .map((filteredSubcategory, subIndex) => (
                            <li
                              key={subIndex}
                              style={{ listStyleType: "none" }}
                            >
                              <Link
                                to={`/SubPackages/${filteredSubcategory.id}/${filteredSubcategory.slug}`}
                              >
                                <div>
                                  Packages by {filteredSubcategory.name}
                                </div>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  </ul>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header1;
