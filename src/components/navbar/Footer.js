import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import "../pages/Home.css";
import { LuFacebook } from "react-icons/lu";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [collapsedStates, setCollapsedStates] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const toggleCollapse = (index) => {
    const newCollapsedStates = [...collapsedStates];
    newCollapsedStates[index] = !newCollapsedStates[index];
    setCollapsedStates(newCollapsedStates);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //--------------------page refresh--------------------------------------------

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div
        className="container-fluid bg-dark text-white-50 py-lg-5  px-sm-3 px-lg-5 footer-head"
        // style={{
        //   marginTop: "90px",
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        // }}
      >
        <div className="container">
          <h2 className="text-center py-lg-5 mb-lg-5 py-4 Partnered">
            Partnered with the best in the industry
          </h2>
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8">
              <img
                src="/assets/img/partners.png"
                className="img-fluid"
                alt="Partners Image"
                style={{ objectFit: "fill" }}
              />
            </div>
          </div>
        </div>
        <hr />
        <div
          className="row d-flex justify-content-center align-items-center container "
          style={{}}
        >
          <div className="col-lg-6 col-md-6 mb-1 mb-md-5 px-3 ">
            <p className="footer-para">
              Welcome to All India Tours and Travels, your gateway to
              unforgettable journeys and unparalleled experiences across the
              diverse landscapes of India. Our company is committed to providing
              exceptional travel services, creating memories that last a
              lifetime. Explore the enchanting beauty of India with our
              meticulously crafted itineraries covering a plethora of
              destinations. From the majestic Himalayas to the serene beaches of
              Goa, from the historical wonders of Delhi to the vibrant culture
              of Rajasthan, we curate experiences that showcase the rich
              tapestry of India.
            </p>
          </div>
          <div className="col-lg-5 col-md-6 mb-5 d-none d-lg-block px-3  ">
            <Link to="/" className="navbar-brand" onClick={scrollToTop}>
              <img
                src="/assets/img/logo1.png"
                style={{ height: "70px", width: "350px" }}
                className="desktop-logo"
                alt="Logo"
              />
            </Link>
          </div>
        </div>

        <div className="container">
          <div className="accordion-item">
            <div
              className="card"
              style={{
                backgroundColor: "black",
                color: "white",
                borderBottom: "1px solid #908181",
                borderTop: "1px solid  #908181",
              }}
            >
              <div
                className="card-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <h5 style={{ color: "white", fontSize: "15px" }}>
                    India Packages
                  </h5>
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                  <h5>
                    <Link
                      to="#"
                      className="link"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCollapse(0);
                      }}
                      aria-expanded={!collapsedStates[0]}
                      aria-controls="collapseContent-0"
                      style={{ color: "white" }}
                    >
                      {collapsedStates[0] ? <BsChevronDown /> : <BsChevronUp />}
                    </Link>
                  </h5>
                </div>
              </div>
              <Collapse in={!collapsedStates[0]}>
                <div id="collapseContent-0">
                  <div className="container">
                    <div className="container py-2">
                      <div className="row d-flex justify-content-center align-items-center text-left">
                        <div className="row align-items-start">
                          <div className="col ml-5">
                            <ul className="footer-accordian">
                              <li>Tamil Nadu Packages</li>
                              <li>Goa Packages</li>
                              <li>Kerala Packages</li>
                              <li>Telangana Packages</li>
                              <li>Andhra Pradesh Packages</li>
                              <li>Delhi Packages</li>
                              <li>Mumbai Packages</li>
                              <li>Himachal Packages</li>
                              <li>Jammu Packages</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>

          <div className="accordion-item">
            <div
              className="card"
              style={{
                backgroundColor: "black",
                color: "white",
                borderBottom: "1px solid  #908181",
              }}
            >
              <div
                className="card-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <h5 style={{ color: "white", fontSize: "15px" }}>
                    South Asian Vacation Packages
                  </h5>
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                  <h5>
                    <Link
                      to="#"
                      className="link"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCollapse(1);
                      }}
                      aria-expanded={!collapsedStates[1]}
                      aria-controls="collapseContent-1"
                      style={{ color: "white" }}
                    >
                      {collapsedStates[1] ? <BsChevronDown /> : <BsChevronUp />}
                    </Link>
                  </h5>
                </div>
              </div>
              <Collapse in={!collapsedStates[1]}>
                <div id="collapseContent-1">
                  <div className="container">
                    <div className="container py-2">
                      <div className="row d-flex justify-content-center align-items-center text-left">
                        <div className="row align-items-start">
                          <div className="col ml-5">
                            <ul className="footer-accordian">
                              <li>International Tour Packages</li>
                              <li>Singapore Packages</li>
                              <li>Sri Lanka Packages</li>
                              <li>Maldives Packages</li>
                              <li>Thailand Packages</li>
                              <li>Andaman Packages</li>
                              <li>Vietnam Packages</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
          <div className="accordion-item">
            <div
              className="card"
              style={{
                backgroundColor: "black",
                color: "white",
                borderBottom: "1px solid  #908181",
              }}
            >
              <div
                className="card-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <h5 style={{ color: "white", fontSize: "15px" }}>
                    Holiday destinations
                  </h5>
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                  <h5>
                    <Link
                      to="#"
                      className="link"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCollapse(2);
                      }}
                      aria-expanded={!collapsedStates[2]}
                      aria-controls="collapseContent-1"
                      style={{ color: "white" }}
                    >
                      {collapsedStates[2] ? <BsChevronDown /> : <BsChevronUp />}
                    </Link>
                  </h5>
                </div>
              </div>
              <Collapse in={!collapsedStates[2]}>
                <div id="collapseContent-1">
                  <div className="container">
                    <div className="container py-2">
                      <div className="row d-flex justify-content-center align-items-center text-left">
                        <div className="row align-items-start">
                          <div className="col ml-5">
                            <ul className="footer-accordian">
                              <li>International Tour Packages</li>
                              <li>International Honeymoon Packages</li>
                              <li>International Family Packages</li>
                              <li>International Beach Packages</li>
                              <li>Adventure Packages</li>
                              <li>Summer Holiday Packages</li>
                              <li>International Visa on arrival Packages</li>
                              <li>International Budget Packages</li>
                              <li>International Luxury Packages</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
          <div className="accordion-item">
            <div
              className="card"
              style={{
                backgroundColor: "black",
                color: "white",
                borderBottom: "1px solid  #908181",
              }}
            >
              <div
                className="card-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <h5 style={{ color: "white", fontSize: "15px" }}>
                    Europe Specials
                  </h5>
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                  <h5>
                    <Link
                      to="#"
                      className="link"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCollapse(3);
                      }}
                      aria-expanded={!collapsedStates[3]}
                      aria-controls="collapseContent-1"
                      style={{ color: "white" }}
                    >
                      {collapsedStates[3] ? <BsChevronDown /> : <BsChevronUp />}
                    </Link>
                  </h5>
                </div>
              </div>
              <Collapse in={!collapsedStates[3]}>
                <div id="collapseContent-1">
                  <div className="container">
                    <div className="container py-2">
                      <div className="row d-flex justify-content-center align-items-center text-left">
                        <div className="row align-items-start">
                          <div className="col ml-5">
                            <ul className="footer-accordian">
                              <li>France Tour Packages</li>
                              <li>Italy Tour Packages</li>
                              <li>Austria Tour Packages</li>
                              <li>Switzerland Packages</li>
                              <li>Germany Tour Packages</li>
                              <li>Greece Packages</li>
                              <li>Spain Packages</li>
                              <li>UK Packages</li>
                              <li>Europe Honeymoon Packages</li>
                              <li>Turkey Packages</li>
                              <li>London Packages</li>
                              <li>Croatia Packages</li>
                              <li>Amsterdam Tour Packages</li>
                              <li>Iceland Tour Packages</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
          <div className="accordion-item">
            <div
              className="card"
              style={{
                backgroundColor: "black",
                color: "white",
                borderBottom: "1px solid  #908181",
              }}
            >
              <div
                className="card-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <h5 style={{ color: "white", fontSize: "15px" }}>
                    Holiday destinations
                  </h5>
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                  <h5>
                    <Link
                      to="#"
                      className="link"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCollapse(4);
                      }}
                      aria-expanded={!collapsedStates[4]}
                      aria-controls="collapseContent-1"
                      style={{ color: "white" }}
                    >
                      {collapsedStates[4] ? <BsChevronDown /> : <BsChevronUp />}
                    </Link>
                  </h5>
                </div>
              </div>
              <Collapse in={!collapsedStates[4]}>
                <div id="collapseContent-1">
                  <div className="container">
                    <div className="container py-2">
                      <div className="row d-flex justify-content-center align-items-center text-left">
                        <div className="row align-items-start">
                          <div className="col ml-5">
                            <ul className="footer-accordian">
                              <li>Australia Tour Packages</li>
                              <li>Europe Tour Packages</li>
                              <li>Dubai Tour Packages</li>
                              <li>New Zealand Packages</li>
                              <li>Singapore Tour Packages</li>
                              <li>Thailand Tour Packages</li>
                              <li>Bali Packages</li>
                              <li>Maldives Packages</li>
                              <li>Seychelles Packages</li>
                              <li>Malaysia Packages</li>
                              <li>South Africa Packages</li>
                              <li>Cambodia Packages</li>
                              <li>USA Packages</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
          <div className="accordion-item">
            <div
              className="card"
              style={{
                backgroundColor: "black",
                color: "white",
                borderBottom: "1px solid  #908181",
              }}
            >
              <div
                className="card-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <h5 style={{ color: "white", fontSize: "15px" }}>
                    Honeymoon Packagess
                  </h5>
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                  <h5>
                    <Link
                      to="#"
                      className="link"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCollapse(5);
                      }}
                      aria-expanded={!collapsedStates[5]}
                      aria-controls="collapseContent-1"
                      style={{ color: "white" }}
                    >
                      {collapsedStates[5] ? <BsChevronDown /> : <BsChevronUp />}
                    </Link>
                  </h5>
                </div>
              </div>
              <Collapse in={!collapsedStates[5]}>
                <div id="collapseContent-1">
                  <div className="container">
                    <div className="container py-2">
                      <div className="row d-flex justify-content-center align-items-center text-left">
                        <div className="row align-items-start">
                          <div className="col ml-5">
                            <ul className="footer-accordian">
                              <li>Maldives Honeymoon Packages</li>
                              <li>Dubai Honeymoon Packages</li>
                              <li>Mauritius Honeymoon Packages</li>
                              <li>Switzerland Honeymoon Packages</li>
                              <li>Greece Honeymoon Packages</li>
                              <li>Turkey Honeymoon Packages</li>
                              <li>Sri Lanka Honeymoon Packages</li>
                              <li>Bali Honeymoon Packages</li>
                              <li>Italy Honeymoon Packages</li>
                              <li>Spain Honeymoon Packages</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
          <div className="accordion-item">
            <div
              className="card"
              style={{
                backgroundColor: "black",
                color: "white",
                borderBottom: "1px solid  #908181",
              }}
            >
              <div
                className="card-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <h5 style={{ color: "white", fontSize: "15px" }}>
                    Packages from Departure City
                  </h5>
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                  <h5>
                    <Link
                      to="#"
                      className="link"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCollapse(6);
                      }}
                      aria-expanded={!collapsedStates[6]}
                      aria-controls="collapseContent-1"
                      style={{ color: "white" }}
                    >
                      {collapsedStates[6] ? <BsChevronDown /> : <BsChevronUp />}
                    </Link>
                  </h5>
                </div>
              </div>
              <Collapse in={!collapsedStates[6]}>
                <div id="collapseContent-1">
                  <div className="container">
                    <div className="container py-2">
                      <div className="row d-flex justify-content-center align-items-center text-left">
                        <div className="row align-items-start">
                          <div className="col ml-5">
                            <ul className="footer-accordian">
                              <li>
                                International Tour Packages from Bangalore
                                Packages
                              </li>
                              <li>
                                International Tour Packages from Kolkata
                                Packages
                              </li>
                              <li>
                                International Tour Packages from Chennai
                                Packages
                              </li>
                              <li>
                                International Tour Packages from Ahmedabad
                                Packages
                              </li>
                              <li>
                                International Tour Packages from Kochi Packages
                              </li>
                              <li>
                                International Tour Packages from Delhi Packages
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
          <div className="accordion-item">
            <div
              className="card"
              style={{
                backgroundColor: "black",
                color: "white",
                borderBottom: "1px solid  #908181",
              }}
            >
              <div
                className="card-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <h5 style={{ color: "white", fontSize: "15px" }}>
                    India Packages
                  </h5>
                </div>
                <div style={{ flex: "1", textAlign: "right" }}>
                  <h5>
                    <Link
                      to="#"
                      className="link"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCollapse(7);
                      }}
                      aria-expanded={!collapsedStates[7]}
                      aria-controls="collapseContent-1"
                      style={{ color: "white" }}
                    >
                      {collapsedStates[7] ? <BsChevronDown /> : <BsChevronUp />}
                    </Link>
                  </h5>
                </div>
              </div>
              <Collapse in={!collapsedStates[7]}>
                <div id="collapseContent-1">
                  <div className="container">
                    <div className="container py-2">
                      <div className="row d-flex justify-content-center align-items-center text-left">
                        <div className="row align-items-start">
                          <div className="col ml-5">
                            <ul className="footer-accordian">
                              <li>Bali Thailand Tour Packages</li>
                              <li>Singapore Bali Packages</li>
                              <li>Malaysia and Bali Packages</li>
                              <li>Singapore Malaysia and Bali Packages</li>
                              <li>Singapore Malaysia Thailand Tour Packages</li>
                              <li>Singapore Bali Thailand Tour Packages</li>
                              <li>Singapore Malaysia Tour Packages</li>
                              <li>Bali and Vietnam Packages</li>
                              <li>Vietnam Cambodia Packages</li>
                              <li>Vietnam and Singapore Packages</li>
                              <li>Thailand and Vietnam Tour Packages</li>
                              <li>Thailand Malaysia Tour Packages</li>
                              <li>Spain and Greece Vacation Packages</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        </div>

        <hr />

        <div className="container">
          <div className="footer-bottom-link pt-5 ">
            <div className="footer-bottom-linkone">
              <div className="col-lg-3 col-md-6 mb-5">
                {/* <h5 className="text-white text-uppercase mb-4" style={{ letterSpacing: "5px" }}>Useful Links</h5> */}
                <div className="d-flex flex-column justify-content-start footer">
                  <Link className=" footer mb-2" to="/" onClick={scrollToTop}>
                    Welcome Tours and Travels
                  </Link>
                  <Link className="footer mb-2" to="#" onClick={scrollToTop}>
                    About
                  </Link>
                  <Link className="footer mb-2" to="" onClick={scrollToTop}>
                    Career
                  </Link>
                  <Link className="footer mb-2" to="" onClick={scrollToTop}>
                    Blog
                  </Link>
                  <Link className="footer mb-2" to="#" onClick={scrollToTop}>
                    Testimonial
                  </Link>
                  <Link className="footer" to="#" onClick={scrollToTop}>
                    Press
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-5">
                {/* <h5 className="text-white text-uppercase mb-4" style={{ letterSpacing: "5px" }}>Useful Links</h5> */}
                <div className="d-flex flex-column justify-content-start footer">
                  <Link className="footer mb-2" to="#" onClick={scrollToTop}>
                    Policy
                  </Link>
                  <Link className="footer mb-2" to="/Faq" onClick={scrollToTop}>
                    Frequently asked questions
                  </Link>
                  <Link className="footer mb-2" to="" onClick={scrollToTop}>
                    Terms & Conditions
                  </Link>
                  <Link
                    className="footer mb-2"
                    to="/Privacy"
                    onClick={scrollToTop}
                  >
                    Privacy
                  </Link>
                  <Link className="footer" to="/Contact" onClick={scrollToTop}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <div className="footer-bottom-linkone">
              <div className="col-lg-4 col-md-6 mb-5 footer">
                <p className="text-white ">
                  <i className=" mr-2"></i>Talk to us
                </p>
                <p className="text-white  mt-2">
                  <i className="fa fa-map-marker-alt mr-2"></i>Chennai, Tamil
                  Nadu
                </p>
                <p className="text-white  mt-2">
                  <Link
                    to="tel:+91 73733 39933"
                    target="blank"
                    style={{ color: "white" }}
                  >
                    {" "}
                    <i className="fa fa-phone-alt mr-2"></i> +91 73733 39933
                  </Link>
                </p>
                <p className="text-white mt-2">
                  <Link
                    to="director@allindiatours.com"
                    target="blank"
                    style={{ color: "white" }}
                  >
                    <i className="fa fa-envelope mr-2"></i>
                    director@allindiatours.com
                  </Link>
                </p>
              </div>
              <div className="col-lg-3 col-md-6 mb-5 footer text-white">
                <p className="text-white">
                  <i className=" mr-2"></i>Social Links
                </p>

                <p className="text-white  mt-2">
                  <Link
                    to="https://www.facebook.com/welcometoursindia/"
                    target="blank"
                    style={{ color: "white" }}
                  >
                    <LuFacebook style={{ marginRight: "4px" }} />
                    facebook
                  </Link>
                </p>
                <p className="text-white  mt-2">
                  <Link to="" target="blank" style={{ color: "white" }}>
                    <RiTwitterXLine style={{ marginRight: "4px" }} />
                    Twitter
                  </Link>
                </p>

                <p className="text-white  mt-2">
                  <Link
                    to="https://www.instagram.com/welcome_tours_and_travels/"
                    target="blank"
                    style={{ color: "white" }}
                  >
                    <FaInstagram style={{ marginRight: "4px" }} />
                    Instagram
                  </Link>
                </p>
                <p className="text-white  mt-2">
                  <Link to="" target="blank" style={{ color: "white" }}>
                    <FaLinkedin style={{ marginRight: "4px" }} />
                    LinkedIn
                  </Link>
                </p>
                <p className="text-white mt-2  ">
                  <Link to="" target="blank" style={{ color: "white" }}>
                    <FaYoutube style={{ marginRight: "4px" }} />
                    Youtube
                  </Link>
                </p>

                <p style={{ marginTop: "10px" }}>
                  Welcome Tours and Travels Chennai Private Ltd. © 2024 all
                  rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5"
        style={{ borderColor: "rgba(256, 256, 256, .1)" }}
      >
        <div className="row">
          <div className="col-lg-12 text-center  pb-4 pb-sm-0 mb-3 mb-md-0">
            <p className="m-0 text-white-50">
              Copyright &copy;{" "}
              <Link to="#" onClick={scrollToTop} style={{ color: "white" }}>
                Welcome Tours and Travels Chennai Private Ltd
              </Link>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
