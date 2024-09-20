import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { searchTours } from "./ApiService";
import { fetchLatestTours, fetchPackages } from "./ApiService";
import Floatbutton from "./Floatbutton";
import { AiFillCheckCircle } from "react-icons/ai";
import Header from "../navbar/Header";
// import { Helmet } from "react-helmet";

const Home = () => {
  const [southindia, setSouthindia] = useState([]);
  const [northindia, setNorthindia] = useState([]);
  const [latest, setLatest] = useState([]);
  const [oceania, setOceania] = useState([]);
  const [southeast, SetSoutheast] = useState([]);
  const [scandinavia, setScandinavia] = useState([]);
  const [middleeast, setMiddleeast] = useState([]);
  const [europePackages, setEuropePackages] = useState([]);

  useEffect(() => {
    getPackages(1, setSouthindia);
    getPackages(2, setNorthindia);
    getPackages(3, setEuropePackages);
    getPackages(4, setOceania);
    getPackages(5, SetSoutheast);
    getPackages(6, setScandinavia);
    getPackages(7, setMiddleeast);
    getLatestTours();
  }, []);

  // -----------packeges-----------------------------

  const getPackages = async (id, setState) => {
    try {
      const data = await fetchPackages(id);
      setState(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  //-----------------------------------------Latest tour------------------------------------------------
  const getLatestTours = async () => {
    try {
      const data = await fetchLatestTours();
      setLatest(data);
    } catch (error) {
      console.error("Error fetching latest tours:", error);
    }
  };

  //-----------------------------------------slider setting------------------------------------------------
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
        },
      },
    ],
  };
  const latestsettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          autoplaySpeed: 5000,
        },
      },
    ],
  };

  //--------------------search function--------------------------------------------

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError("Please enter city name.");
      return;
    }
    try {
      const data = await searchTours(inputValue);
      console.log("Search Results:", data);
      setError(null);
      navigate("/searchComponent", { state: { searchResults: data } });
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      setError("Failed to fetch search results. Please try again later.");
    }
  };
  //--------------------page refresh--------------------------------------------

  window.addEventListener("load", function () {
    window.scrollTo(0, 0);
  });

  const carouselRef = useRef(null);
  let startX = 0;
  let endX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX - endX > 50) {
      carouselRef.current.next();
    } else if (endX - startX > 50) {
      carouselRef.current.prev();
    }
  };

  return (
    <>
      {/* <Helmet>
        <title>
          Discover Amazing Tour Packages from Chennai | Welcome Tours and
          Travels
        </title>
        <meta
          name="description"
          content="Explore a variety of affordable tour packages from Chennai with Welcome Tours and Travels. Call us at 7373339933 to book your dream trip now!"
        />
        <meta name="robots" content="index, follow" />
      </Helmet> */}

      <Header />

      <div className="home-page ">
        <div style={{ fontFamily: "Kalnia" }} className="font-size-72-26">
          Your Dream Vacation
          <br />
          Is Finally Here
        </div>
      </div>
      <div
        style={{ backgroundColor: "black", marginRight: "0px" }}
        className="row align-items-center justify-content-center"
      >
        <marquee
          className="container"
          style={{ backgroundColor: "black", color: "white", width: "100%" }}
        >
          <div className="d-flex flex-row ">
            <div
              className="d-flex align-items-center"
              style={{ marginRight: "50px" }}
            >
              <AiFillCheckCircle style={{ color: "green", fontSize: "25px" }} />
              <span className="ms-2">Visa Success Rate</span>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ marginRight: "50px" }}
            >
              <AiFillCheckCircle style={{ color: "green", fontSize: "25px" }} />
              <span className="ms-2">100% Customized Trips</span>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ marginRight: "50px" }}
            >
              <AiFillCheckCircle style={{ color: "green", fontSize: "25px" }} />
              <span className="ms-2">24x7 Concierge</span>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ marginRight: "50px" }}
            >
              <img
                src="/assets/img/googlefb.png"
                style={{ height: "25px" }}
                alt="Rating"
              />
              <span className="ms-2">4.5 Rated</span>
            </div>
          </div>
        </marquee>
      </div>

      <div className="container-fluid ">
        <div className="container pb-5">
          <div className="shadow">
            <div className="shadow-text">
              <h3 style={{ textAlign: "left" }}>
                <span className="DESTINATION-span ">DESTINATION</span>
              </h3>
            </div>

            <div className="shadowp">Where would you like to go? </div>

            <div
              style={{
                minHeight: "60px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", width: "100%" }}
              >
                <div className="row" style={{ flex: "1", fontSize: "30px" }}>
                  <div className="row-md-12 col-xs-9">
                    <input
                      type="text"
                      className="form-control p-4"
                      id="searchform"
                      placeholder={error ? error : "e.g. Delhi, Amritsar"}
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div
                    className="row-md-3 col-xs-3"
                    style={{ flex: "none", fontSize: "30px" }}
                  >
                    <button className="btn ml-3 search-button" type="submit">
                      PLAN YOUR TRIP
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center packages-card" id="packages-north">
        <div className="container">
          <h4 className="cards-heading">NORTH INDIA TOURS</h4>
          <div className="slider-container w-3/4 m-auto">
            <div className="slider-inner mt-20">
              <Slider {...settings}>
                {northindia.map((pkg, index) => (
                  <Link to={`/SubPackages/${pkg.id}/${pkg.slug}`} key={index}>
                    <div className="package-card h-[450px] text-black rounded-xl">
                      <div className="package-image-container  bg-indigo-500 d-flex justify-center items-center rounded-t-xl">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="package-image"
                        />
                      </div>
                      <p className="package-name mt-1">{pkg.name}</p>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center  packages-card">
        <div className="container">
          <h4 className="cards-heading">SOUTH INDIA TOURS</h4>
          <div className="slider-container w-3/4 m-auto">
            <div className="slider-inner mt-20">
              <Slider {...settings}>
                {southindia.map((pkg, index) => (
                  <Link to={`/SubPackages/${pkg.id}/${pkg.slug}`} key={index}>
                    <div className="package-card h-[450px] text-black rounded-xl">
                      <div className="package-image-container  bg-indigo-500 d-flex justify-center items-center rounded-t-xl">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="package-image"
                        />
                      </div>
                      <p className="package-name mt-1">{pkg.name}</p>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center  packages-card">
        <div className="container">
          <h4 className="cards-heading">LATEST TOURS</h4>

          <div className=" w-3/4 ">
            <div className="slider-inner latest-tour-card">
              <Slider {...latestsettings}>
                {latest.map((lat, index) => (
                  <Link to={`/SubPackages/${lat.id}`} key={index}>
                    <div className="package-card text-black rounded-xl">
                      <div className="package-image-container  bg-indigo-500  rounded-t-xl">
                        <img src={lat.image} alt={lat.name} />
                      </div>
                      <p className="package-name mt-3">{lat.name}</p>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------- Your Dream-web --------------------------------------------------------------*/}
      <div
        className="container d-none d-md-flex"
        style={{
          backgroundColor: "#f8f9fa",
          color: "black",
          fontFamily: "Kalnia",
          padding: "50px",
          marginTop: "20px",
          height: "600px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          width: "1200px",
        }}
      >
        <div className="row" style={{ width: "1200px" }}>
          <div className="col-md-8 d-none d-md-flex">
            <h1
              className="text-md-start text-center"
              style={{ fontSize: "90px", paddingLeft: "50px" }}
            >
              Your
              <br></br>Dream
              <br />
              Travel In
              <br />3 Steps
            </h1>
          </div>
          <div className="col-md-3 align-items-left d-none d-md-flex ">
            <Carousel controls={false} indicators={false} interval={3000}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/img/caraousel1.png"
                  alt="First slide"
                  style={{
                    height: "200px",
                    width: "10px",
                    objectFit: "cover",
                    fontFamily: "Montserrat, serif",
                  }}
                />
                <div
                  className="mt-5"
                  style={{ fontFamily: "Montserrat, serif" }}
                >
                  <h5
                    style={{
                      fontFamily: "Montserrat, serif",
                      textAlign: "center",
                    }}
                  >
                    <b>1. You Describe</b>
                  </h5>
                  <h5
                    style={{
                      fontFamily: "Montserrat, serif",
                      fontWeight: "400",
                      fontSize: "19px",
                      lineHeight: "29px",
                      textAlign: "center",
                    }}
                  >
                    You describe Adventure or beach apartment or resort? Let's
                    know your travel preferences quickly and easily online.
                  </h5>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/img/caraousel2.png"
                  alt="Second slide"
                  style={{ height: "200px", width: "10px", objectFit: "cover" }}
                />
                <div className="mt-5 ">
                  <h5
                    style={{
                      fontFamily: "Montserrat, serif",
                      textAlign: "center",
                    }}
                  >
                    <b>2. We Organize</b>
                  </h5>
                  <h5
                    style={{
                      fontFamily: "Montserrat, serif",
                      fontWeight: "400",
                      fontSize: "19px",
                      lineHeight: "29px",
                      textAlign: "center",
                    }}
                  >
                    Based on preferences and wishes, our Welcome Tours and
                    Travels experts organize tailor-made trips for you over the
                    phone.
                  </h5>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/img/caraousel3.png"
                  alt="Third slide"
                  style={{ height: "200px", width: "10px", objectFit: "cover" }}
                />
                <div className="mt-5">
                  <h5
                    style={{
                      fontFamily: "Montserrat, serif",
                      textAlign: "center",
                    }}
                  >
                    <b>3. You Travel!</b>
                  </h5>
                  <h5
                    style={{
                      fontFamily: "Montserrat, serif",
                      fontWeight: "400",
                      fontSize: "19px",
                      lineHeight: "29px",
                      textAlign: "center",
                    }}
                  >
                    Happy with our offer? Pack your suitcase as your dream
                    travel tour is about to start!
                  </h5>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------- Your Dream-mobile --------------------------------------------------------------*/}
      <div
        className="container  d-sm-flex d-md-none Your-Dream-mobile"
        style={{
          backgroundColor: "#f8f9fa",
          color: "black",
          fontFamily: "Lato,serif",
          padding: "30px 30px 0px 30px ",
          marginTop: "20px",
          width: "90%",
          height: "450px",
          fontWeight: "500",

          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <div className="col" style={{ width: "300px" }}>
          <div className="col-md-12  d-md-flex">
            <p
              className="text-md-start text-center"
              style={{
                marginBottom: "0px",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              Your Dream Travel In 3 Steps
            </p>
          </div>
          <div className="col-md-3 align-items-left  d-md-flex ">
            <Carousel
              controls={false}
              indicators={false}
              interval={3000}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ height: "400px" }}
            >
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/img/caraousel1.png"
                  alt="First slide"
                  style={{
                    height: "230px",
                    width: "10px",
                    objectFit: "cover",
                    fontFamily: "Montserrat, serif",
                  }}
                />
                <div
                  className="mt-4"
                  style={{ fontFamily: "Montserrat, serif" }}
                >
                  <h6
                    style={{
                      fontFamily: "Montserrat, serif",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    <b>1. You Describe</b>
                  </h6>
                  <h5
                    style={{
                      fontFamily: "Montserrat, serif",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "21px",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    1.You describe Adventure or beach apartment or resort? Let's
                    know your travel preferences quickly and easily online.
                  </h5>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 "
                  src="/assets/img/caraousel2.png"
                  alt="Second slide"
                  style={{ height: "230px", width: "10px", objectFit: "cover" }}
                />
                <div className="mt-4 ">
                  <h6
                    style={{
                      fontFamily: "Montserrat, serif",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    <b>2. We Organize</b>
                  </h6>
                  <h5
                    style={{
                      fontFamily: "Montserrat, serif",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "21px",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    Based on preferences and wishes, our Welcome Tours and
                    Travels experts organize tailor-made trips for you over the
                    phone.
                  </h5>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/img/caraousel3.png"
                  alt="Third slide"
                  style={{ height: "230px", width: "10px", objectFit: "cover" }}
                />
                <div className="mt-4">
                  <h6
                    style={{
                      fontFamily: "Montserrat, serif",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    <b>3. You Travel!</b>
                  </h6>
                  <p
                    style={{
                      fontFamily: "Montserrat, serif",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "21px",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    Happy with our offer? Pack your suitcase as your dream
                    travel tour is about to start!
                  </p>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>

      <div class="container-fluid px-md-5  Home-center-cards my-5">
        <div class="row justify-content-center align-items-center py-5">
          <div class=" text-center mb-3 mb-md-0 ">
            <img
              src="/assets/img/landscape1.png"
              class="img-fluid rounded-3"
              alt="landscape1"
              style={{
                borderRadius: "25px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            />
          </div>
          <div class=" text-center">
            <img
              src="/assets/img/landscape2.png"
              class="img-fluid rounded-3"
              alt="landscape2"
              style={{
                borderRadius: "25px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            />
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------- QUICK GETAWAY DESTINATIONS --------------------------------------------------------------*/}

      <div
        className="container-fluid bg-registration d-none d-md-block "
        style={{ backgroundColor: "rgb(18, 27, 34)" }}
      >
        <div className="container  d-flex flex-column justify-content-center align-items-center inside-banner">
          <h2 style={{ color: "rgb(42, 204, 101)", fontWeight: "700" }}>
            QUICK GETAWAY DESTINATIONS
          </h2>
          <p
            style={{
              color: "rgb(42, 204, 101)",
              fontSize: "18px",
              fontFamily: "Montserrat,serif",
            }}
          >
            Ideal for 3-5 days trip
          </p>
          <div
            className="row align-items-center"
            style={{
              display: "flex",
              flexDirection: "row",
              height: "400px",
              gap: "20px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div className="position-relative d-inline-block">
                <img
                  src="/assets/img/QuickGetaway/agra.jpeg"
                  className="img-fluid rounded-15"
                  alt="Kerala"
                  style={{
                    height: "200px",
                    width: "350px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
                <div className="QUICK-GETAWAy-text">
                  <h1>Agra</h1>
                  <p style={{ color: "white" }}>from₹320</p>
                </div>
              </div>

              <div className="d-flex flex-row gap-10">
                <div className="position-relative d-inline-block">
                  <img
                    src="/assets/img/QuickGetaway/kerala.webp"
                    className="img-fluid rounded-15"
                    alt="Kerala"
                    style={{
                      height: "200px",
                      width: "175px",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                  />
                  <div className="QUICK-GETAWAy-text">
                    <h1>kerala</h1>
                    <p style={{ color: "white" }}>from₹320</p>
                  </div>
                </div>
                <div className="position-relative d-inline-block">
                  <img
                    src="/assets/img/QuickGetaway/goa.jpeg"
                    className="img-fluid rounded-15"
                    alt="Goa"
                    style={{
                      height: "200px",
                      width: "165px",
                      objectFit: "cover",
                      borderRadius: "20px",
                      marginLeft: "10px",
                    }}
                  />
                  <div className="QUICK-GETAWAy-text">
                    <h1>goa</h1>
                    <p style={{ color: "white" }}>from₹320</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="position-relative ">
              <img
                src="/assets/img/QuickGetaway/Himachal.jpeg"
                className="img-fluid rounded-15"
                alt="Himachal"
                style={{
                  height: "410px",
                  width: "350px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
              <div className="QUICK-GETAWAy-text-center">
                <h1>Himachal</h1>
                <p style={{ color: "white" }}>from₹320</p>
              </div>
            </div>

            <div className="d-none d-md-flex flex-column gap-10">
              <div className="position-relative d-inline-block">
                <img
                  src="/assets/img/QuickGetaway/mumbai.jpg"
                  className="img-fluid rounded-15"
                  alt="Mumbai"
                  style={{
                    height: "200px",
                    width: "350px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
                <div className="QUICK-GETAWAy-text">
                  <h1>Mumbai</h1>
                  <p style={{ color: "white" }}>from₹320</p>
                </div>
              </div>
              <div className="position-relative d-inline-block">
                <img
                  src="/assets/img/QuickGetaway/tamilNadu.jpeg"
                  className="img-fluid rounded-15"
                  alt="Tamil Nadu"
                  style={{
                    height: "200px",
                    width: "350px",
                    objectFit: "cover",
                    marginTop: "10px",
                    borderRadius: "20px",
                  }}
                />
                <div className="QUICK-GETAWAy-text">
                  <h1>TamilNadu</h1>
                  <p style={{ color: "white" }}>from₹320</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- QUICK GETAWAY DESTINATIONS mobile --------------------------------------------------------------*/}

      <div
        className="container-fluid quick-contain d-block d-lg-none"
        style={{ backgroundColor: "rgb(18, 27, 34)" }}
      >
        <h2
          style={{ color: "rgb(42, 204, 101)", fontWeight: "700" }}
          className="text-uppercase"
        >
          QUICK GETAWAY DESTINATIONS
        </h2>
        <p
          style={{
            color: "rgb(42, 204, 101)",
            fontSize: "18px",
            fontFamily: "Montserrat,serif",
          }}
        >
          Ideal for 3-5 days trip
        </p>
        <div className="container  quick-getaways">
          <div className="quick-getaways-images">
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/EuropeanHolidays/italy1.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Italy</p>
            </div>
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/EuropeanHolidays/turkey.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Turkey</p>
            </div>
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/EuropeanHolidays/austria.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Austria</p>
            </div>
          </div>
          <div className="quick-getaways-images">
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/EuropeanHolidays/norway.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Norwey</p>
            </div>
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/EuropeanHolidays/turkey2.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Turkey</p>
            </div>
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/EuropeanHolidays/finland.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Finland</p>
            </div>
          </div>
          <div className="quick-getaways-images">
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/EuropeanHolidays/spain.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Spain</p>
            </div>
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/EuropeanHolidays/france.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>France</p>
            </div>
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/EuropeanHolidays/switerland.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Switzerland</p>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------- VISA ON --------------------------------------------------------------*/}

      <div className="container text-center my-5">
        <div className="container">
          <h4 className="cards-heading">VISA ON ARRIVAL DESTINATIONS</h4>
          <div className="slider-container w-3/4 m-auto">
            <div className="slider-inner mt-20">
              <Slider {...settings}>
                {southeast.map((pkg, index) => (
                  <Link to={`/SubPackages/${pkg.id}/${pkg.slug}`} key={index}>
                    <div className="package-card h-[450px] text-black rounded-xl">
                      <div className="package-image-container  bg-indigo-500 d-flex justify-center items-center rounded-t-xl">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="package-image"
                        />
                      </div>
                      <p className="package-name mt-1">{pkg.name}</p>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------EXPLORATIONS--------------------------------------------------------------*/}

      <div
        className="container-fluid bg-registration d-none d-md-block "
        style={{ backgroundColor: "rgb(18, 27, 34)" }}
      >
        <div className="container  d-flex flex-column justify-content-center align-items-center inside-banner">
          <h2 style={{ color: "rgb(42, 204, 101)" }}>EXPLORATIONS FAR AWAY</h2>
          <p
            style={{
              color: "rgb(42, 204, 101)",
              fontSize: "18px",
              fontFamily: "Montserrat,serif",
            }}
          >
            Ideal for 5-14 days trip
          </p>
          <div
            className="row align-items-center"
            style={{
              display: "flex",
              flexDirection: "row",
              height: "400px",
              gap: "20px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div className="position-relative d-inline-block">
                <img
                  src="/assets/img/Oceania/perth.webp"
                  className="img-fluid rounded-15"
                  alt="Agra"
                  style={{
                    height: "200px",
                    width: "350px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
                <div className="QUICK-GETAWAy-text">
                  <h1>Perth</h1>
                  <p style={{ color: "white" }}>from₹320</p>
                </div>
              </div>

              <div className="d-flex flex-row gap-10">
                <div className="position-relative d-inline-block">
                  <img
                    src="/assets/img/Oceania/fijii.webp"
                    className="img-fluid rounded-15"
                    alt="Kerala"
                    style={{
                      height: "200px",
                      width: "175px",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                  />
                  <div className="QUICK-GETAWAy-text">
                    <h1>Fijii</h1>
                    <p style={{ color: "white" }}>from₹320</p>
                  </div>
                </div>
                <div className="position-relative d-inline-block">
                  <img
                    src="/assets/img/Oceania/syndey.webp"
                    className="img-fluid rounded-15"
                    alt="Goa"
                    style={{
                      height: "200px",
                      width: "165px",
                      objectFit: "cover",
                      borderRadius: "20px",
                      marginLeft: "10px",
                    }}
                  />
                  <div className="QUICK-GETAWAy-text">
                    <h1>Syndey</h1>
                    <p style={{ color: "white" }}>from₹320</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="position-relative d-none d-md-block">
              <img
                src="/assets/img/Oceania/newsland.webp"
                className="img-fluid rounded-15"
                alt="Himachal"
                style={{
                  height: "410px",
                  width: "350px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
              <div className="QUICK-GETAWAy-text-center">
                <h1>Newsland</h1>
                <p style={{ color: "white" }}>from₹320</p>
              </div>
            </div>

            <div className="d-none d-md-flex flex-column gap-10">
              <div className="position-relative d-inline-block">
                <img
                  src="/assets/img/Oceania/quensland.webp"
                  className="img-fluid rounded-15"
                  alt="Mumbai"
                  style={{
                    height: "200px",
                    width: "350px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
                <div className="QUICK-GETAWAy-text">
                  <h1>Quensland</h1>
                  <p style={{ color: "white" }}>from₹320</p>
                </div>
              </div>
              <div className="position-relative d-inline-block ">
                <img
                  src="/assets/img/Oceania/tahiti.webp"
                  className="img-fluid rounded-15"
                  alt="Tamil Nadu"
                  style={{
                    height: "200px",
                    width: "350px",
                    objectFit: "cover",
                    marginTop: "10px",
                    borderRadius: "20px",
                  }}
                />
                <div className="QUICK-GETAWAy-text">
                  <h1>Tahiti</h1>
                  <p style={{ color: "white" }}>from₹320</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------EXPLORATIONS mobile--------------------------------------------------------------*/}

      <div
        className="container-fluid quick-contain d-block d-lg-none"
        style={{ backgroundColor: "rgb(18, 27, 34)" }}
      >
        <h2
          style={{ color: "rgb(42, 204, 101)", fontWeight: "700" }}
          className="text-uppercase"
        >
          EXPLORATIONS FAR AWAY
        </h2>
        <p
          style={{
            color: "rgb(42, 204, 101)",
            fontSize: "18px",
            fontFamily: "Montserrat,serif",
          }}
        >
          Ideal for 5-14 days trip
        </p>
        <div className="container  quick-getaways">
          <div className="quick-getaways-images">
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/Oceania/perth.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Perth</p>
            </div>
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/Oceania/syndey.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Sydney</p>
            </div>
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/Oceania/fijii.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Fiji</p>
            </div>
          </div>
          <div className="quick-getaways-images">
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/Oceania/newsland.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Newzealand</p>
            </div>
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/Oceania/quensland.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Queensland</p>
            </div>
            <div className="quick-getaways-cards">
              <img
                src="/assets/img/Oceania/tahiti.webp"
                className="img-fluid rounded-15"
                alt="img"
              />
              <p>Tahiti</p>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------OCEANIA --------------------------------------------------------------*/}
      <div className="container text-center my-5  packages-card">
        <div className="container">
          <h4 className="cards-heading">OCEANIA</h4>
          <div className="slider-container w-3/4 m-auto">
            <div className="slider-inner mt-20">
              <Slider {...settings}>
                {oceania.map((pkg, index) => (
                  <Link to={`/SubPackages/${pkg.id}/${pkg.slug}`} key={index}>
                    <div className="package-card h-[450px] text-black rounded-xl">
                      <div className="package-image-container  bg-indigo-500 d-flex justify-center items-center rounded-t-xl">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="package-image"
                        />
                      </div>
                      <p className="package-name mt-1">{pkg.name}</p>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------  EUROPEAN HOLIDAYS --------------------------------------------------------------*/}
      <div className="container text-center  ">
        <div className="container">
          <h4 className="cards-heading">EUROPEAN HOLIDAYS</h4>
          <div className="slider-container w-3/4 m-auto">
            <div className="slider-inner mt-20">
              <Slider {...settings}>
                {europePackages.map((pkg, index) => (
                  <Link to={`/SubPackages/${pkg.id}/${pkg.slug}`} key={index}>
                    <div className="package-card h-[450px] text-black rounded-xl">
                      <div className="package-image-container  bg-indigo-500 d-flex justify-center items-center rounded-t-xl">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="package-image"
                        />
                      </div>
                      <p className="package-name mt-1">{pkg.name}</p>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------  HOLIDAYS FOR ALL --------------------------------------------------------------*/}

      <div className="container py-5 d-flex flex-column justify-content-center align-items-center ">
        <div
          className="py-5 d-flex flex-column justify-content-center align-items-center Holiday "
          style={{}}
        >
          <h2
            style={{
              color: "white",
              fontWeight: "700",
              fontFamily: "sans-serif",
            }}
          >
            HOLIDAYS FOR ALL
          </h2>
          <p
            className="my-3 mb-5"
            style={{
              color: "rgb(36, 183, 116)",
              fontSize: "28px",
              fontFamily: "Dancing Script",
              lineHeight: "1.2px",
            }}
          >
            Budget
          </p>

          <div className="row align-items-center image-grid">
            <div className="mobile-res">
              <div className="position-relative d-inline-block mx-2 image-item">
                <img
                  src="/assets/img/VisaArrival/maldives.avif"
                  className="img-fluid rounded-15"
                  alt="Agra"
                />
                <div className="image-caption">Maldives</div>
              </div>
              <div className="position-relative d-inline-block mx-2 image-item">
                <img
                  src="/assets/img/VisaArrival/thailand.avif"
                  className="img-fluid rounded-15"
                  alt="Agra"
                />
                <div className="image-caption">Thaliland</div>
              </div>
            </div>
            <div className="mobile-res">
              <div className="position-relative d-inline-block mx-2 image-item">
                <img
                  src="/assets/img/VisaArrival/andaman.webp"
                  className="img-fluid rounded-15"
                  alt="Agra"
                />
                <div className="image-caption">Andaman</div>
              </div>
              <div className="position-relative d-inline-block mx-2 image-item">
                <img
                  src="/assets/img/VisaArrival/maritius.avif"
                  className="img-fluid rounded-15"
                  alt="Agra"
                />
                <div className="image-caption">Maritius</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- SOUTH EAST ASIAN VACATIONS --------------------------------------------------------------*/}

      <div className="container text-center  packages-card mb-5">
        <div className="container">
          <h4 className="cards-heading">SOUTH EAST ASIAN VACATIONS</h4>
          <div className="slider-container w-3/4 m-auto">
            <div className="slider-inner mt-20">
              <Slider {...settings}>
                {southeast.map((pkg, index) => (
                  <Link to={`/SubPackages/${pkg.id}/${pkg.slug}`} key={index}>
                    <div className="package-card h-[450px] text-black rounded-xl">
                      <div className="package-image-container  bg-indigo-500 d-flex justify-center items-center rounded-t-xl">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="package-image"
                        />
                      </div>
                      <p className="package-name mt-1">{pkg.name}</p>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------  MOBILE BANNER--------------------------------------------------------------*/}

      <div className="mobile-banner">
        <img
          src="/assets/img/welcome.png"
          alt="img"
          style={{ height: "500px" }}
        ></img>
      </div>
      {/* -------------------------------------------------------  SCANDINAVIA --------------------------------------------------------------*/}
      <div className="container text-center">
        <div className="container">
          <h4 className="cards-heading">SCANDINAVIA</h4>
          <div className="slider-container w-3/4 m-auto">
            <div className="slider-inner mt-20">
              <Slider {...settings}>
                {scandinavia.map((pkg, index) => (
                  <Link to={`/SubPackages/${pkg.id}/${pkg.slug}`} key={index}>
                    <div className="package-card h-[450px] text-black rounded-xl">
                      <div className="package-image-container  bg-indigo-500 d-flex justify-center items-center rounded-t-xl">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="package-image"
                        />
                      </div>
                      <p className="package-name mt-1">{pkg.name}</p>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------  VACATION FOR ALL --------------------------------------------------------------*/}
      <div className="container py-5 d-flex flex-column justify-content-center align-items-center">
        <div
          className="py-5 d-flex flex-column justify-content-center align-items-center Holiday"
          style={{}}
        >
          <h2
            style={{
              color: "white",
              fontWeight: "700",
              fontFamily: "sans-serif",
            }}
          >
            VACATION FOR ALL
          </h2>
          <p
            className="my-3  mb-5"
            style={{
              color: "rgb(36, 183, 116)",
              fontSize: "28px",
              fontFamily: "Dancing Script",
              lineHeight: "1.2px",
            }}
          >
            Travellers
          </p>

          <div className="row align-items-center image-grid">
            <div className="mobile-res">
              <div className="position-relative d-inline-block mx-2 image-item">
                <img
                  src="/assets/img/VisaArrival/North-india.avif"
                  className="img-fluid rounded-15"
                  alt="North-india"
                />
                <div className="image-caption">North India</div>
              </div>
              <div className="position-relative d-inline-block mx-2 image-item">
                <img
                  src="/assets/img/VisaArrival/South-india.avif"
                  className="img-fluid rounded-15"
                  alt="South-india.avif"
                />
                <div className="image-caption">South India</div>
              </div>
            </div>
            <div className="mobile-res">
              <div className="position-relative d-inline-block mx-2 image-item">
                <img
                  src="/assets/img/VisaArrival/Honeymoon.avif"
                  className="img-fluid rounded-15"
                  alt="Agra"
                />
                <div className="image-caption">Honeymoon</div>
              </div>
              <div className="position-relative d-inline-block mx-2 image-item">
                <img
                  src="/assets/img/VisaArrival/Spiritual.avif"
                  className="img-fluid rounded-15"
                  alt="Agra"
                />
                <div className="image-caption">Spiritual</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------  MIDDLE EAST --------------------------------------------------------------*/}
      <div className="container text-center">
        <div className="container">
          <h4 className="cards-heading">MIDDLE EAST</h4>
          <div className="slider-container w-3/4 m-auto">
            <div className="slider-inner mt-20">
              <Slider {...settings}>
                {middleeast.map((pkg, index) => (
                  <Link to={`/SubPackages/${pkg.id}/${pkg.slug}`} key={index}>
                    <div className="package-card h-[450px] text-black rounded-xl">
                      <div className="package-image-container  bg-indigo-500 d-flex justify-center items-center rounded-t-xl">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="package-image"
                        />
                      </div>
                      <p className="package-name mt-1">{pkg.name}</p>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------  Contact Us BUTTON --------------------------------------------------------------*/}

      <div class="d-flex justify-content-center contact-button">
        <button class="btn  contact-btn">Contact Us!</button>
      </div>

      {/* ------------------------------------------------------- FLOAT BUTTON --------------------------------------------------------------*/}

      <Floatbutton />
    </>
  );
};

export default Home;
