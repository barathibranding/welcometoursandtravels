import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSubPackages, fetchPackages } from "./ApiService";
import Floatbutton from "./Floatbutton";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { LuArrowRightFromLine } from "react-icons/lu";
import { FaCalendarDays } from "react-icons/fa6";
import { MdOutlineApartment } from "react-icons/md";
import { FaUtensils } from "react-icons/fa";
import { MdOutlineDirectionsBusFilled } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import Header1 from "../navbar/Header1";
// import { Helmet } from "react-helmet";

const SearchComponent = () => {
  const { packageId } = useParams();
  const [subPackages, setSubPackages] = useState([]);
  const [packages, setPackages] = useState([]);
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (packageId) {
        try {
          const data = await fetchSubPackages(packageId);
          setSubPackages(data);
        } catch (error) {
          console.error("Error fetching sub-packages:", error);
        }
      }
    };

    fetchData();
  }, [packageId]);

  useEffect(() => {
    const fetchData = async () => {
      if (packageId) {
        try {
          const data = await fetchSubPackages(packageId);
          setSubPackages(data);
        } catch (error) {
          console.error("Error fetching sub-packages:", error);
        }
      }
    };

    fetchData();
  }, [packageId]);

  useEffect(() => {
    const fetchData = async () => {
      if (packageId) {
        try {
          const data = await fetchPackages(packageId);
          setPackages(data);
        } catch (error) {
          console.error("Error fetching packages:", error);
        }
      }
    };

    fetchData();
  }, [packageId]);

  if (!subPackages) {
    return <div>Loading...</div>;
  }

  if (!searchResults || searchResults.length === 0) {
    return (
      <div style={{ height: "100vh", marginTop: "100px" }}>
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <br></br>
        </div>
        <h3 className="text-center">
          Sorry No Packages{" "}
          <Link to="/">
            <span style={{ color: "green" }}>Return to home</span>
          </Link>
        </h3>
      </div>
    );
  }

  //--------------------page refresh--------------------------------------------

  window.addEventListener("load", function () {
    window.scrollTo(0, 0);
  });

  const minIdSubPackage = searchResults.reduce(
    (min, subPackage) => (subPackage.id < min.id ? subPackage : min),
    searchResults[0]
  );

  const firstWord = minIdSubPackage.name.split(" ")[0];

  return (
    <div>
      {/* <Helmet>
        <title>{firstWord} | Welcometoursandtravels</title>
        <meta
          name="description"
          content=" Explore the World with Welcome Tours: Our Exclusive Tour Package."
        />
        <meta
          name="keywords"
          content="tours, travels, welcometoursandtravels, vacation,honeymoon,trip,hillstation"
        />
      </Helmet> */}
      <Header1 />

      <div className="subheader-div"></div>
      <div className="navigation ">
        <p>
          <Link to="/">Home</Link> <IoIosArrowForward />
          <Link to="/">Destination</Link> <IoIosArrowForward />
          <Link to="" style={{ fontWeight: "900" }}>
            {firstWord}
          </Link>{" "}
        </p>
      </div>

      <div>
        <div
          className="container-fluid page-header"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, -0.5), rgba(0, 0, 0, -3.5)), url(${minIdSubPackage.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="d-flex flex-column align-items-center justify-content-center page-header-discover">
              <h3 className="display-4 text-white text-uppercase pb-2">
                DISCOVER OUR {firstWord} TOURS
              </h3>

              <div className="d-inline-flex text-white">
                <button className="see-btn">SEE TRIPS</button>
              </div>
            </div>
          </div>
        </div>

        <div className=" container text-center py-0 pt-2 pt-lg-0 py-lg-3 search-component">
          <h3 className="subpackages-heading">
            Explore the World with Welcome Tours: Our Exclusive Tour Package
          </h3>
          <p
            className={`text-center subpackages-random-para ${
              isExpanded ? "expanded" : "collapsed"
            }`}
          >
            {minIdSubPackage.description}
          </p>
          <h1
            onClick={handleToggle}
            className="readbtn"
            style={{
              fontFamily: "Maven Pro",
              fontSize: "23px",
              lineHeight: "30px",
              fontWeight: "500",
              color: "black",
            }}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </h1>
          <style jsx>{`
            .collapsed {
              display: -webkit-box;
              -webkit-line-clamp: 3; /* number of lines to show */
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .expanded {
              display: block;
            }
          `}</style>
        </div>
      </div>

      <div
        className="container-fluid py-2"
        style={{ backgroundColor: "rgb(250, 250, 250)" }}
      >
        <div
          className="containersub text-center py-2 py-lg-3"
          style={{ maxWidth: "900px", margin: "10px auto" }}
        >
          <h1 className="text-center toptrips">Top {firstWord} Trips</h1>
        </div>

        <div className="container pt-1  packages-item" id="subpackages-card">
          {searchResults.map((result) => (
            <div className="row packages" key={result.id}>
              <div
                id={`myCarousel-${result.id}`}
                className="carousel slide  col-lg-6 imgslide"
                data-ride="carousel"
                data-interval="3000"
                data-touch="true" // Enable touch swipe for mobile
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="d-block w-100"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="d-block w-100"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="d-block w-100"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={result.image4}
                      alt={result.name}
                      className="d-block w-100"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href={`#myCarousel-${result.id}`}
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href={`#myCarousel-${result.id}`}
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>

              <div
                className="col-lg-6 "
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                <div className="service-item bg-white text-left ">
                  <h1
                    className="mb-3"
                    style={{
                      fontFamily: "Lato, sans-serif",
                      fontWeight: "700px",
                      fontSize: "24px ",
                      lineHeight: "36px",
                    }}
                  >
                    {result.name}
                  </h1>
                  <p className="m-0 service-item-days">
                    <LuArrowRightFromLine style={{ marginRight: "10px" }} />
                    {result.days}
                  </p>

                  <div className="container includes-box text-left py-3 mt-4">
                    <h6 style={{ fontFamily: "Montserrat,sans-serif" }}>
                      I N C L U D E S
                    </h6>
                    <div className="row ">
                      <div className="col px-3 ">
                        <p className="includes-box-heading">
                          <FaCalendarDays
                            style={{ fontSize: "20px", marginBottom: "10px" }}
                          />{" "}
                          Days
                        </p>
                        <p className="includes-box-text">
                          <u>{result.days}</u>
                        </p>
                      </div>
                      <div className="col ">
                        <p className="includes-box-heading">
                          {" "}
                          <MdOutlineApartment
                            style={{ fontSize: "20px", marginBottom: "10px" }}
                          />{" "}
                          Accommodation
                        </p>
                        <p className="includes-box-text">
                          {result.accomodation}
                        </p>
                      </div>
                    </div>
                    <div className="row py-3">
                      <div className="col px-3">
                        <p className="includes-box-heading">
                          {" "}
                          <FaUtensils
                            style={{ fontSize: "20px", marginBottom: "10px" }}
                          />{" "}
                          Meals
                        </p>
                        <p className="includes-box-text">{result.food}</p>
                      </div>
                      <div className="col">
                        <p className="includes-box-heading">
                          {" "}
                          <MdOutlineDirectionsBusFilled
                            style={{ fontSize: "20px", marginBottom: "5px" }}
                          />{" "}
                          Transport
                        </p>
                        <p className="includes-box-text">{result.transport}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row d-flex justify-content-center align-items-center g-5">
                    <div className="col starts">
                      <p
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          marginBottom: "0px",
                        }}
                      >
                        Starts from
                      </p>
                      <p
                        style={{
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "400",
                          marginBottom: "20px",
                        }}
                      >
                        ₹ {result.price} /person
                      </p>
                    </div>
                    <div className="col">
                      <Link to={`/Detail/${result.id}/${result.slug}`}>
                        <button className="btn viewbtn ">View Tour</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Floatbutton />
    </div>
  );
};
export default SearchComponent;
