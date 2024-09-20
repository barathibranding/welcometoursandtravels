import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Collapse, Spinner } from "react-bootstrap";
import "./Home.css";
import { fetchSubPackageDetail, fetchPackages } from "./ApiService";
import SafeHtmlComponent from "./SafeHtmlComponent";
import Slider from "react-slick";
import Insta from "./Insta";
import Review from "./Review";
import Map from "./Map";
import { FaShareAlt } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import Floatbutton from "./Floatbutton";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowRoundUp } from "react-icons/io";
import { IoMdArrowRoundDown } from "react-icons/io";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Modal, Button } from "react-bootstrap";
import { FaCalendarDays } from "react-icons/fa6";
import { MdOutlineApartment } from "react-icons/md";
import { FaUtensils } from "react-icons/fa";
import { MdOutlineDirectionsBusFilled } from "react-icons/md";
import Header1 from "../navbar/Header1";
// import { Helmet } from "react-helmet";

const Detail = () => {
  const [section, setSection] = useState(0);

  const [northindia, setNorthindia] = useState([]);
  const { Id } = useParams();
  const [packageDetail, setPackageDetail] = useState(null);
  const [notification, setNotification] = useState("");
  const [signSuccessModal, setSignSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [show, setShow] = useState(false);
  const [buttonsection, setButtonsection] = useState(0);

  const [formData, setFormData] = useState({
    date: new Date(),
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    by_email: false,
    by_phone: false,
    update_latest_news: false,
    past_traveller: false,
  });

  const sliderRef = useRef(null);

  const [collapsedStates, setCollapsedStates] = useState(
    localStorage.getItem("accordionStates")
      ? JSON.parse(localStorage.getItem("accordionStates"))
      : packageDetail?.dayschedule_set?.map(() => true) || []
  );
  const [allExpanded, setAllExpanded] = useState(true);

  const saveAccordionStateToLocalStorage = (states) => {
    localStorage.setItem("accordionStates", JSON.stringify(states));
  };

  useEffect(() => {
    saveAccordionStateToLocalStorage(collapsedStates);
  }, [collapsedStates]);

  const toggleCollapse = (index) => {
    const newCollapsedStates = [...collapsedStates];
    newCollapsedStates[index] = !newCollapsedStates[index];
    setCollapsedStates(newCollapsedStates);
  };

  const toggleAll = () => {
    const newAllExpanded = !allExpanded;
    setAllExpanded(newAllExpanded);
    setCollapsedStates(
      packageDetail?.dayschedule_set?.map(() => !newAllExpanded) || []
    );
  };

  const getPackages = async (id, setState) => {
    try {
      const data = await fetchPackages(id);
      setState(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    getPackages(2, setNorthindia);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (Id) {
        try {
          const data = await fetchSubPackageDetail(Id);
          setPackageDetail(data);
        } catch (error) {
          console.error("Error fetching package details:", error);
        }
      }
    };

    fetchData();
  }, [Id]);

  if (!packageDetail) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  const slidersettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  //--------------------page refresh--------------------------------------------

  window.addEventListener("load", function () {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = format(formData.date, "yyyy-MM-dd");
    const updatedFormData = { ...formData, date: formattedDate };

    try {
      const response = await axios.post(
        "https://tours.bwsoft.in/api/api/request/",
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNotification("Form submitted successfully!");
      setSignSuccessModal(true);
      setShow(false);

      setFormData({
        date: new Date(),
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        by_email: false,
        by_phone: false,
        update_latest_news: false,
        past_traveller: false,
      });
    } catch (error) {
      setNotification("Form submission failed. Please try again.");
      setErrorModal(true);
    }
  };

  const handleChange = (e) => {
    if (e.target) {
      const { name, value, type, checked } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        date: e,
      }));
    }
  };
  const handleClose = () => {
    setShow(false);
    window.scrollTo(0, 0);
    window.location.reload();
  };
  const handleerrorClose = () => {
    setErrorModal(false);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  const handlesucessClose = () => {
    setSignSuccessModal(false);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  const handleShow = () => setShow(true);

  // State to track active section

  const handleButtonClick = (index) => {
    setButtonsection(index); // Update active section state
  };

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Product",
    name: packageDetail.name,
    description: packageDetail.description,
    image: packageDetail.imageUrl,
    brand: {
      "@type": "Brand",
      name: "Your Brand Name",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: packageDetail.price,
      availability: "http://schema.org/InStock",
    },
  };

  return (
    <div>
      {/* <Helmet>
        <title>{`${packageDetail.name} | Welcometoursandtravels`}</title>
        <meta name="description" content={packageDetail.description} />
        <meta property="og:title" content={packageDetail.name} />
        <meta property="og:description" content={packageDetail.description} />
        <meta property="og:image" content={packageDetail.imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={packageDetail.name} />
        <meta name="twitter:description" content={packageDetail.description} />
        <meta name="twitter:image" content={packageDetail.imageUrl} />
        <meta
          name="keywords"
          content="tours, travels, welcometoursandtravels, vacation,honeymoon,trip,hillstation"
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet> */}

      <Header1 />
      <div className="" style={{ height: "60px" }}></div>
      <div className="navigationdetail ">
        <p>
          <Link to="/">Home</Link> <IoIosArrowForward />
          <Link to="/">Destination</Link> <IoIosArrowForward />
          <Link to="" style={{ fontWeight: "900" }}>
            {" "}
            {packageDetail.name}{" "}
          </Link>{" "}
        </p>
      </div>

      <div className="detail">
        <p>
          <b>
            <Link to="">
              <FaShareAlt />
              Share
            </Link>
          </b>
        </p>

        <p>
          <b>
            <Link to="">View Compare (0)</Link>
          </b>
        </p>

        <p>
          <b>
            <Link to="">
              <AiFillPlusCircle />
              Add To Compare
            </Link>
          </b>
        </p>
      </div>

      <div className="text-center mb-3 detailheading">
        <div className="rating">
          <img src="/assets/img/gstar.png" alt="img"></img>
          <p>4.4</p>
        </div>
        <h2
          className="text-uppercase "
          style={{ fontSize: "28px", fontWeight: "1000" }}
        >
          {packageDetail.name}
        </h2>
      </div>

      <div>
        <div
          className="d-flex row"
          style={{
            textAlign: "center",
            marginTop: "20px",
            width: "100%",
            boxShadow: " 0 -9px 8px -10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            className={`detailbutton py-2 ${
              buttonsection === 0 ? "active" : ""
            }`}
            onClick={() => {
              handleButtonClick(0);
              setSection(0);
            }}
          >
            THE TRIP
          </div>
          <div
            className={`detailbutton py-2 ${
              buttonsection === 1 ? "active" : ""
            }`}
            onClick={() => {
              handleButtonClick(1);
              setSection(1);
            }}
          >
            PRICING
          </div>
          <div
            className={`detailbutton py-2 ${
              buttonsection === 2 ? "active" : ""
            }`}
            onClick={() => {
              handleButtonClick(2);
              setSection(2);
            }}
          >
            REVIEWS
          </div>
        </div>
        <div
          className="col justify-content-center, d-f"
          style={{ width: "98%" }}
        >
          {section === 0 && (
            <div className="  text-center mb-3 ">
              <div className="detail-one ">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="packages-itemdetail">
                      <img
                        src={packageDetail.image}
                        alt="Travel Guide"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="service-itemdetail  text-left  py-2 py-md-4 px-4 px-lg-5">
                      <h3 className="mb-2">{packageDetail.location}</h3>
                      <p className="py-2 text-justify service-itemdetail-para">
                        {packageDetail.description}
                      </p>

                      <div className="container search-includes-box text-left py-3 mt-4 px-0  px-lg-5">
                        <h6
                          className=" px-0  px-lg-5 pb-3 "
                          style={{
                            fontFamily: "Montserrat,sans-serif",
                            marginLeft: "35px",
                          }}
                        >
                          I N C L U D E S
                        </h6>
                        <div className="row  px-0  px-lg-5">
                          <div className="col px-5 ">
                            <p className="search-includes-box-heading">
                              <FaCalendarDays
                                style={{
                                  fontSize: "20px",
                                  marginBottom: "10px",
                                }}
                              />{" "}
                              Days
                            </p>
                            <p className="search-includes-box-text">
                              <u>{packageDetail.days}</u>
                            </p>
                          </div>
                          <div className="col ">
                            <p className="search-includes-box-heading">
                              {" "}
                              <MdOutlineApartment
                                style={{
                                  fontSize: "20px",
                                  marginBottom: "10px",
                                }}
                              />{" "}
                              Accommodation
                            </p>
                            <p className="search-includes-box-text">
                              {packageDetail.accomodation}
                            </p>
                          </div>
                        </div>
                        <div className="row py-3  px-0  px-lg-5">
                          <div className="col px-5">
                            <p className="search-includes-box-heading">
                              {" "}
                              <FaUtensils
                                style={{
                                  fontSize: "20px",
                                  marginBottom: "10px",
                                }}
                              />{" "}
                              Meals
                            </p>
                            <p className="search-includes-box-text">
                              {packageDetail.food}
                            </p>
                          </div>
                          <div className="col">
                            <p className="search-includes-box-heading">
                              {" "}
                              <MdOutlineDirectionsBusFilled
                                style={{
                                  fontSize: "20px",
                                  marginBottom: "5px",
                                }}
                              />{" "}
                              Transport
                            </p>
                            <p className="search-includes-box-text">
                              {packageDetail.transport}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col d-flex align-items-center justify-content-center py-3">
                        <button
                          type="button"
                          className=" px-3 res-btn"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          onClick={handleShow}
                        >
                          REQUEST MORE INFO
                        </button>

                        <Modal
                          show={show}
                          onHide={handleClose}
                          id="exampleModalCenter"
                        >
                          <div className="modal-from" role="document">
                            <div className="modal-content">
                              <form onSubmit={handleSubmit}>
                                <div className="modal-header">
                                  <div className="modal-header-text align-items-center">
                                    <h6
                                      className="modal-title"
                                      id="exampleModalCenterTitle"
                                    >
                                      REQUEST MORE INFO
                                    </h6>
                                    <button
                                      type="button"
                                      className="close"
                                      aria-label="Close"
                                      onClick={handleClose}
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                </div>
                                <div className="image-content">
                                  <div>
                                    <img
                                      src={packageDetail.image}
                                      alt={packageDetail.name}
                                    />
                                  </div>
                                  <div className="image-content-text text-left">
                                    {packageDetail.name}
                                  </div>
                                </div>
                                <div className="modal-body">
                                  <div className="form-group date-form  px-3">
                                    <DatePicker
                                      name="date"
                                      selected={formData.date}
                                      onChange={handleChange}
                                      dateFormat="dd/MM/yyyy"
                                      className="form-date"
                                      placeholderText="Date"
                                    />
                                    <div className="mt-3 name-form">
                                      <input
                                        type="text"
                                        name="first_name"
                                        className="form-control"
                                        placeholder="First Name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                      />
                                      <input
                                        type="text"
                                        name="last_name"
                                        className="form-control ml-md-3 mt-3 mt-md-0"
                                        placeholder="Last Name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="mt-3 email-form">
                                      <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                      />
                                      <input
                                        type="number"
                                        name="mobile"
                                        className="form-control ml-md-3 mt-3 mt-md-0"
                                        placeholder="Phone Number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-3 container">
                                    <p>
                                      <b>
                                        How would you like us to contact you?
                                      </b>
                                    </p>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="by_email"
                                        checked={formData.by_email}
                                        onChange={handleChange}
                                        id="contactByEmail"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="contactByEmail"
                                      >
                                        By Email
                                      </label>
                                    </div>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="by_phone"
                                        checked={formData.by_phone}
                                        onChange={handleChange}
                                        id="contactByPhone"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="contactByPhone"
                                      >
                                        By Phone
                                      </label>
                                    </div>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="update_latest_news"
                                        checked={formData.update_latest_news}
                                        onChange={handleChange}
                                        id="subscribeUpdates"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="subscribeUpdates"
                                      >
                                        Keep me updated on the latest Welcome
                                        tours news, deals, and latest trips
                                      </label>
                                    </div>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="past_traveller"
                                        checked={formData.past_traveller}
                                        onChange={handleChange}
                                        id="pastTraveller"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="pastTraveller"
                                      >
                                        I am a Welcome tours past traveller
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-footer justify-content-center">
                                  <button type="submit" className="modal-btn">
                                    Submit
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </Modal>

                        {/* Success Modal */}
                        <Modal
                          show={signSuccessModal}
                          onHide={() => setSignSuccessModal(false)}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Register Successful</Modal.Title>
                            <button
                              type="button"
                              className="close"
                              aria-label="Close"
                              onClick={handleClose}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </Modal.Header>
                          <Modal.Body>
                            <p>Form submitted successfully!</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="primary"
                              onClick={handlesucessClose}
                            >
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>

                        {/* Error Modal */}
                        <Modal
                          show={errorModal}
                          onHide={() => setErrorModal(false)}
                        >
                          <Modal.Header>
                            <Modal.Title>Submission Error</Modal.Title>
                            <button
                              type="button"
                              className="close"
                              aria-label="Close"
                              onClick={handleClose}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </Modal.Header>
                          <Modal.Body style={{ height: "100px" }}>
                            <p>
                              Form submission failed. Please try again later.
                            </p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="primary"
                              onClick={handleerrorClose}
                            >
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="TRIPHIGHLIGHTS">
                <div className=" py-3 TRIPHIGHLIGHTS-font">
                  <p className="text-center text-uppercase">TRIP HIGHLIGHTS</p>
                  <h6 className="text-center ">
                    The must do experiences that you can cross off your bucket
                    list
                  </h6>
                </div>

                <Slider ref={sliderRef} {...slidersettings}>
                  {packageDetail.triphighlights_set.map((highlight) => (
                    <div
                      className="container col-lg-12 col-md-12 col-11 mb-4 "
                      key={highlight.id}
                    >
                      <div className="package-itemdetail bg-white mb-2">
                        <div className="tripimg">
                          <img
                            className="img-fluid"
                            src={highlight.image}
                            alt=""
                          />
                        </div>
                        <div
                          className="text-data"
                          id="package-itemdetail-textdata"
                        >
                          <h1>
                            <b> {highlight.name}</b>
                          </h1>

                          <div className=" " style={{ textAlign: "left" }}>
                            <p
                              style={{
                                fontFamily: "Lato",
                                fontWeight: "400",
                                fontSize: "14px ",
                                lineHeight: "21px",
                              }}
                            >
                              {highlight.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="container justify-content-center d-flex Map">
                <h1>
                  <b>Map & Itinerary</b>
                </h1>
              </div>

              <div className="container justify-content-center d-flex">
                <Map />
              </div>
              <div className="accordian-button">
                <button>
                  <IoMdArrowRoundDown className="accordian-button-icon" />
                  DOWNLOAD ITINERARY
                </button>
                <button onClick={toggleAll} className="text-uppercase">
                  {allExpanded ? "Collapse All Days" : "Expand All Days "}
                  {allExpanded ? (
                    <IoMdArrowRoundUp className="accordian-button-icon" />
                  ) : (
                    <IoMdArrowRoundDown className="accordian-button-icon" />
                  )}
                </button>
              </div>

              {packageDetail.dayschedule_set.map((dayschedule, index) => (
                <div className="container" key={dayschedule.id}>
                  <div className="accordion-item mb-2" style={{}}>
                    <div className="card" style={{ border: "none" }}>
                      <div className="accordion-item-heading">
                        <div className="accordion-item-heading-one">
                          {dayschedule.day}
                        </div>
                        <div className="accordion-item-heading-two">
                          {" "}
                          {dayschedule.city_name}
                        </div>
                        <div className="accordion-item-heading-three">
                          {" "}
                          <Link
                            to="#"
                            className="link"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleCollapse(index);
                            }}
                            aria-expanded={!collapsedStates[index]}
                            aria-controls={`collapseContent-${index}`}
                          >
                            <u>
                              {collapsedStates[index] ? "Expand" : "Collapse"}
                              {collapsedStates[index] ? (
                                <IoMdArrowRoundDown className="accordion-item-heading-icon" />
                              ) : (
                                <IoMdArrowRoundUp className="accordion-item-heading-icon" />
                              )}
                            </u>
                          </Link>
                        </div>
                      </div>
                      <Collapse in={!collapsedStates[index]}>
                        <div id={`collapseContent-${index}`}>
                          <div className="container">
                            <div className="container py-2">
                              <div className="row d-flex justify-content-center align-items-center text-left">
                                {/* Image Column */}
                                <div className="col-12 col-lg-5 d-flex justify-content-center order-1 order-lg-2">
                                  <img
                                    src={dayschedule.image}
                                    className="img-fluid"
                                    alt="Madurai Landscape"
                                    style={{
                                      maxHeight: "300px",
                                      maxWidth: "30vw%",
                                      objectFit: "cover",
                                      borderRadius: "10px",
                                    }}
                                  />
                                </div>

                                <div className="col-12 col-lg-7 mb-3 mb-lg-0 mt-3 mb-lg-0 order-2 order-lg-1">
                                  <div className="row align-items-start">
                                    <div className="col ml-5">
                                      <SafeHtmlComponent
                                        htmlContent={dayschedule.description}
                                      />
                                    </div>
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
              ))}
            </div>
          )}

          {section === 1 && (
            <div>
              <h1>2</h1>
            </div>
          )}

          {section === 2 && (
            <div>
              <Review />
            </div>
          )}
        </div>

        {/* --------------------------------------card------------------------------ */}
        <div className=" label-detail-main ">
          <div className=" label-detail">
            <div className="col-md-3 col-sm-6 mb-3 ">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <svg
                  style={{ maxWidth: "35px" }}
                  viewBox="0 0 64 64"
                  class="mx-auto h-7 w-7 md:mb-1 md:h-10 md:w-10"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path
                      fill="#59DD7D"
                      stroke="#3F4144"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M31.909 24.51H5.647a1.882 1.882 0 01-1.882-1.883V3.804c0-1.04.843-1.882 1.882-1.882h52.706c1.04 0 1.882.842 1.882 1.882v18.823c0 1.04-.842 1.883-1.882 1.883H37.286"
                    ></path>
                    <path
                      fill="#3F4144"
                      fill-rule="nonzero"
                      stroke="#3F4144"
                      stroke-width="0.5"
                      d="M19.803 7.122v1.844h-5.252v3.483h4.48v1.844h-4.48v5.14h-2.183V7.122h7.435zm6.325 0c2.56 0 4.517.903 4.517 3.651 0 1.883-.978 3.012-2.447 3.52l2.937 5.14h-2.447l-2.654-4.82h-1.883v4.82h-2.183V7.122zm24.527 0v1.844h-5.233v3.144h4.423v1.845h-4.423v3.633h5.421v1.844h-7.605V7.122h7.417zM37.018 17.587h3.698v1.845h-3.294l-.404-1.845zm3.51-10.465v1.844h-5.233v3.144h4.423v1.845h-4.423v2.72l-2.184.78V7.122h7.417zm-14.626 1.75h-1.75v4.01h1.75c1.675 0 2.598-.716 2.598-2.109 0-1.411-.923-1.9-2.598-1.9z"
                    ></path>
                    <path
                      fill="#EDEFF0"
                      d="M35.477 27.294h6.701l.637 4.494 1.4-2.247 2.826-.753 1.417 3v2.094h5.466v11.355c0 .885-1.027 4.908-3.08 12.07H34.412l-1.3-3.776 2.365-26.237z"
                    ></path>
                    <path
                      fill="#EDEFF0"
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M37.574 28.788v-9.037a2.811 2.811 0 10-5.622 0v20.193l-3.535-4.932a2.917 2.917 0 00-3.94-.759 2.91 2.91 0 00-.964 3.89l10.899 19.162"
                    ></path>
                    <path
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M48.459 37.548v-5.937a2.822 2.822 0 00-5.644 0v5.767"
                    ></path>
                    <path
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M42.815 32.001v-3.183a2.62 2.62 0 10-5.24 0v8.559"
                    ></path>
                    <path
                      fill="#FFF"
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M31.998 57.306h20.36v5.481h-20.36z"
                    ></path>
                    <path
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M50.2 57.306A30.507 30.507 0 0053.924 42.7v-6.8a2.733 2.733 0 10-5.466 0v1.477"
                    ></path>
                  </g>
                </svg>
                <div className="mt-0 d-flex flex-column justify-content-center align-items-center">
                  <p
                    style={{
                      color: " #3f4144",
                      marginBottom: "0",
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: "700",
                    }}
                  >
                    <b>Totally Free Planning</b>
                  </p>
                  <h6
                    className="mb-0  text-center "
                    style={{
                      color: "#3f4144",

                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    Receive a non-binding offer.
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 mb-3 ">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <svg
                  style={{ maxWidth: "35px" }}
                  viewBox="0 0 64 64"
                  class="mx-auto h-7 w-7 md:mb-1 md:h-10 md:w-10"
                >
                  <g class="tourlane-USPs-CustomizedItinerary__nc-icon-wrapper">
                    <defs>
                      <path
                        id="tourlane-USPs-CustomizedItinerary__path-1"
                        d="M.818 7.75L14.87.356a1.37 1.37 0 011.333.032l12.51 7.358a1.37 1.37 0 001.342.026l12.432-6.675a1.37 1.37 0 011.235-.032l1.525.722c-.672 5.458-.316 8.515 1.069 9.17 1.384.655 4.574-.723 9.57-4.135l1.995.944c.48.226.785.709.785 1.238v38.348a1.37 1.37 0 01-2.013 1.21l-12.655-6.71a1.37 1.37 0 00-1.335.028l-12.53 7.344a1.37 1.37 0 01-1.386 0l-12.5-7.323a1.37 1.37 0 00-1.39.002l-5.395 3.181a1.37 1.37 0 01-.237.111l-7.31 2.595a1.37 1.37 0 01-1.829-1.291V8.963c0-.509.282-.975.732-1.212z"
                      ></path>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                      <g transform="translate(1.796 7.529)">
                        <mask
                          id="tourlane-USPs-CustomizedItinerary__mask-2"
                          fill="#fff"
                        >
                          <use></use>
                        </mask>
                        <use fill="#EDEFF0"></use>
                        <path
                          fill="#FFF"
                          d="M15.544 0h13.831v54.588h-13.83zM43.38 0h15.06v54.588H43.38z"
                          mask="url(#tourlane-USPs-CustomizedItinerary__mask-2)"
                        ></path>
                      </g>
                      <path
                        stroke="#3F4144"
                        stroke-dasharray="2.936470480526195,5.872940961052389"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.302 27.427c2.826 12.357 7.471 14.911 13.936 7.663 9.699-10.872 16.298 5.56 22.969 1.919"
                      ></path>
                      <path
                        stroke="#3F4144"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7.945 19.408l3.566 3.566M11.511 19.408l-3.566 3.566M31.235 55.968l-.064-17.181m0-13.228l.064-9.894M45.002 48.272v-4.215M59.732 15.279c.448.237.729.703.729 1.21V54.88a1.37 1.37 0 01-2.013 1.21l-12.655-6.71a1.37 1.37 0 00-1.335.028l-12.53 7.344a1.37 1.37 0 01-1.386 0l-12.539-7.345a1.37 1.37 0 00-1.33-.03L7.466 54.22 3.89 56.102a1.37 1.37 0 01-2.009-1.213V16.49c0-.508.28-.974.729-1.211l13.952-7.394a1.37 1.37 0 011.33.026l12.65 7.352a1.37 1.37 0 001.382-.002l12.533-7.345a1.37 1.37 0 011.335-.029l-3.705 11.992 17.644-4.6z"
                      ></path>
                      <path
                        fill="#59DD7D"
                        stroke="#3F4144"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M51.388 2.884c6.238 0 11.294 5.056 11.294 11.294 0 4.158-3.764 10.433-11.294 18.823-7.53-8.39-11.294-14.665-11.294-18.823 0-6.238 5.057-11.294 11.294-11.294zm-.23 6.527a3.765 3.765 0 100 7.53 3.765 3.765 0 000-7.53z"
                      ></path>
                      <path
                        stroke="#3F4144"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.958"
                        d="M17.34 48.272v-4.438"
                      ></path>
                      <path
                        stroke="#3F4144"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.34 31.404V9.211"
                      ></path>
                    </g>
                  </g>
                </svg>

                <div className="mt-0 d-flex flex-column justify-content-center align-items-center">
                  <p
                    style={{
                      color: "#3f4144",
                      marginBottom: "0",
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: "700",
                    }}
                  >
                    <b>Tailor-Made Trips</b>
                  </p>
                  <h6
                    className="mb-0  text-center"
                    style={{
                      color: "#3f4144",

                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    Your own tailor-made itinerary
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 mb-3 " style={{ width: "300px" }}>
              <div className="d-flex flex-column align-items-center">
                <svg
                  style={{ maxWidth: "35px" }}
                  fill="none"
                  viewBox="0 0 64 64"
                  class="mx-auto h-7 w-7 md:mb-1 md:h-10 md:w-10"
                >
                  <path
                    stroke="#3F4144"
                    stroke-width="2"
                    d="M50.779 37.005l-.063 6.18c-.035 10.117-8.246 18.299-18.362 18.299-10.07 0-18.233-8.164-18.233-18.233v-6.246"
                  ></path>
                  <path
                    fill="#59DD7D"
                    fill-rule="evenodd"
                    d="M14.12 42.096H4.995V24.912h6.782"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    stroke="#3F4144"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.12 42.096H4.995V24.912h6.782"
                  ></path>
                  <path
                    fill="#59DD7D"
                    fill-rule="evenodd"
                    d="M52.842 24.912h6.807v17.184h-8.87"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    stroke="#3F4144"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M52.842 24.912h6.807v17.184h-8.87"
                  ></path>
                  <path
                    stroke="#3F4144"
                    stroke-width="2"
                    d="M58.009 42.096v.96a7.83 7.83 0 01-7.83 7.83h-11.81"
                  ></path>
                  <path
                    fill="#EDEFF0"
                    fill-rule="evenodd"
                    stroke="#3F4144"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M27.63 47.7h12.093v6.364H27.63V47.7z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    stroke="#3F4144"
                    stroke-width="2"
                    d="M54.916 24.276C54.916 11.973 44.8 2 32.322 2 19.844 2 9.728 11.973 9.728 24.276"
                  ></path>
                  <path
                    fill="#EDEFF0"
                    fill-rule="evenodd"
                    stroke="#3F4144"
                    stroke-width="2"
                    d="M32.575 23.634a.602.602 0 00-.663.004L14.121 35.493V40.5s-2.054-1.27-2.054-6.498v-3.955c0-11.06 8.87-20.08 19.928-20.261v0C43.312 9.6 52.586 18.73 52.586 30.05v3.952c0 3.228-1.807 6.498-1.807 6.498v-5.007L32.575 23.634z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    stroke="#3F4144"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.905 37.633c1.23-1.103 2.581-1.654 4.053-1.654 1.471 0 2.772.551 3.903 1.654m7.956 0c1.23-1.103 2.58-1.654 4.052-1.654 1.471 0 2.773.551 3.904 1.654"
                  ></path>
                </svg>

                <div className="mt-0 text-center" style={{ width: "250px" }}>
                  <p
                    style={{
                      color: "#3f4144",
                      marginBottom: "0",
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: "700",
                    }}
                  >
                    <b>Consultation With Travel Experts</b>
                  </p>
                  <h6
                    className="mb-0"
                    style={{
                      color: "#3f4144",

                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    Personal advice and insider tips.
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <div className="d-flex flex-column  justify-content-center align-items-center">
                <svg
                  style={{ maxWidth: "35px" }}
                  viewBox="0 0 64 64"
                  class="mx-auto h-7 w-7 md:mb-1 md:h-10 md:w-10"
                >
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    transform="translate(3.765 1.882)"
                  >
                    <path
                      fill="#FFF"
                      d="M1.882 9.412h35.765v41.412H1.882z"
                    ></path>
                    <path
                      fill="#EDEFF0"
                      d="M1.882 50.824h35.765v9.412H1.882zM1.882 0h33.882v9.412H1.882z"
                    ></path>
                    <rect
                      width="35.765"
                      height="60.235"
                      x="0.941"
                      stroke="#3F4144"
                      stroke-width="2"
                      rx="1.882"
                    ></rect>
                    <path
                      stroke="#3F4144"
                      stroke-linecap="square"
                      stroke-width="2"
                      d="M.941 8.471h35.765"
                    ></path>
                    <circle
                      cx="18.824"
                      cy="55.059"
                      r="1.882"
                      fill="#3F4144"
                    ></circle>
                    <path
                      stroke="#3F4144"
                      stroke-linecap="square"
                      stroke-width="2"
                      d="M.941 49.882h35.765"
                    ></path>
                    <path
                      fill="#59DD7D"
                      d="M25.744 33.203l-.772 3.851 3.743 3.371 3.367-.983 2.045-3.222z"
                    ></path>
                    <path
                      fill="#59DD7D"
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M31.536 39.601c2.338.913 4.99 1.429 7.8 1.429 9.436 0 17.086-5.814 17.086-12.986 0-7.171-7.65-12.985-17.087-12.985-9.436 0-17.086 5.814-17.086 12.985 0 2.657 1.05 5.127 2.851 7.185"
                    ></path>
                    <path
                      fill="#3F4144"
                      fill-rule="nonzero"
                      d="M30.91 32.776c2.04 0 3.217-1.309 3.217-2.812 0-1.281-.654-2.019-1.687-2.465l-1.098-.473c-.733-.32-1.295-.515-1.295-1.072 0-.515.418-.821 1.085-.821.68 0 1.204.264 1.766.724l.98-1.295a3.828 3.828 0 00-2.746-1.198c-1.779 0-3.034 1.198-3.034 2.701 0 1.323.837 2.103 1.713 2.479l1.112.5c.745.335 1.23.516 1.23 1.087 0 .543-.393.877-1.19.877-.707 0-1.492-.39-2.107-.947l-1.098 1.406a4.516 4.516 0 003.152 1.31zm8.135 0c2.302 0 3.872-1.782 3.872-4.747 0-2.952-1.57-4.665-3.872-4.665-2.302 0-3.871 1.699-3.871 4.665 0 2.965 1.57 4.747 3.871 4.747zm0-1.768c-1.164 0-1.896-1.156-1.896-2.98 0-1.81.732-2.895 1.896-2.895s1.897 1.086 1.897 2.896c0 1.823-.733 2.979-1.897 2.979zm8.083 1.768c2.04 0 3.218-1.309 3.218-2.812 0-1.281-.654-2.019-1.687-2.465l-1.099-.473c-.732-.32-1.295-.515-1.295-1.072 0-.515.419-.821 1.086-.821.68 0 1.203.264 1.765.724l.981-1.295a3.828 3.828 0 00-2.746-1.198c-1.779 0-3.035 1.198-3.035 2.701 0 1.323.837 2.103 1.714 2.479l1.111.5c.746.335 1.23.516 1.23 1.087 0 .543-.392.877-1.19.877-.707 0-1.491-.39-2.106-.947l-1.099 1.406a4.516 4.516 0 003.152 1.31z"
                    ></path>
                    <path
                      fill="#59DD7D"
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M25.1 35.229c-1.9 3.594-3.323 6.007-4.268 7.24-1.417 1.85 9.58-1.82 10.704-2.868"
                    ></path>
                  </g>
                </svg>

                <div className="mt-0 text-center">
                  <p
                    style={{
                      color: "#3f4144",
                      marginBottom: "0",
                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: "700",
                    }}
                  >
                    <b>24/7 Emergency Hotline</b>
                  </p>
                  <h6
                    className="mb-0"
                    style={{
                      color: "#3f4144",

                      fontFamily: "Montserrat,sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    Our safety team are here for you.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------------------card mobile------------------------------ */}
        <div className="detail-banner-card  ">
          <div className="detail-banner-card-contain  ">
            <div className=" detail-banner-card-contain-one">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <svg
                  style={{ maxWidth: "35px" }}
                  viewBox="0 0 64 64"
                  class="mx-auto h-7 w-7 md:mb-1 md:h-10 md:w-10"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path
                      fill="#59DD7D"
                      stroke="#3F4144"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M31.909 24.51H5.647a1.882 1.882 0 01-1.882-1.883V3.804c0-1.04.843-1.882 1.882-1.882h52.706c1.04 0 1.882.842 1.882 1.882v18.823c0 1.04-.842 1.883-1.882 1.883H37.286"
                    ></path>
                    <path
                      fill="#3F4144"
                      fill-rule="nonzero"
                      stroke="#3F4144"
                      stroke-width="0.5"
                      d="M19.803 7.122v1.844h-5.252v3.483h4.48v1.844h-4.48v5.14h-2.183V7.122h7.435zm6.325 0c2.56 0 4.517.903 4.517 3.651 0 1.883-.978 3.012-2.447 3.52l2.937 5.14h-2.447l-2.654-4.82h-1.883v4.82h-2.183V7.122zm24.527 0v1.844h-5.233v3.144h4.423v1.845h-4.423v3.633h5.421v1.844h-7.605V7.122h7.417zM37.018 17.587h3.698v1.845h-3.294l-.404-1.845zm3.51-10.465v1.844h-5.233v3.144h4.423v1.845h-4.423v2.72l-2.184.78V7.122h7.417zm-14.626 1.75h-1.75v4.01h1.75c1.675 0 2.598-.716 2.598-2.109 0-1.411-.923-1.9-2.598-1.9z"
                    ></path>
                    <path
                      fill="#EDEFF0"
                      d="M35.477 27.294h6.701l.637 4.494 1.4-2.247 2.826-.753 1.417 3v2.094h5.466v11.355c0 .885-1.027 4.908-3.08 12.07H34.412l-1.3-3.776 2.365-26.237z"
                    ></path>
                    <path
                      fill="#EDEFF0"
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M37.574 28.788v-9.037a2.811 2.811 0 10-5.622 0v20.193l-3.535-4.932a2.917 2.917 0 00-3.94-.759 2.91 2.91 0 00-.964 3.89l10.899 19.162"
                    ></path>
                    <path
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M48.459 37.548v-5.937a2.822 2.822 0 00-5.644 0v5.767"
                    ></path>
                    <path
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M42.815 32.001v-3.183a2.62 2.62 0 10-5.24 0v8.559"
                    ></path>
                    <path
                      fill="#FFF"
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M31.998 57.306h20.36v5.481h-20.36z"
                    ></path>
                    <path
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M50.2 57.306A30.507 30.507 0 0053.924 42.7v-6.8a2.733 2.733 0 10-5.466 0v1.477"
                    ></path>
                  </g>
                </svg>
                <div className="mt-0 d-flex flex-column justify-content-center align-items-center">
                  <p
                    style={{
                      color: "#3f4144",
                      marginBottom: "0",
                      textAlign: "center",
                      fontSize: "12px",
                    }}
                  >
                    Totally Free Planning
                  </p>
                  <h6
                    className="mb-0  text-center"
                    style={{ fontSize: "12px" }}
                  >
                    Receive a non-binding
                    <br></br>offer.
                  </h6>
                </div>
              </div>
            </div>
            <div className=" detail-banner-card-contain-one">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <svg
                  style={{ maxWidth: "35px" }}
                  viewBox="0 0 64 64"
                  class="mx-auto h-7 w-7 md:mb-1 md:h-10 md:w-10"
                >
                  <g class="tourlane-USPs-CustomizedItinerary__nc-icon-wrapper">
                    <defs>
                      <path
                        id="tourlane-USPs-CustomizedItinerary__path-1"
                        d="M.818 7.75L14.87.356a1.37 1.37 0 011.333.032l12.51 7.358a1.37 1.37 0 001.342.026l12.432-6.675a1.37 1.37 0 011.235-.032l1.525.722c-.672 5.458-.316 8.515 1.069 9.17 1.384.655 4.574-.723 9.57-4.135l1.995.944c.48.226.785.709.785 1.238v38.348a1.37 1.37 0 01-2.013 1.21l-12.655-6.71a1.37 1.37 0 00-1.335.028l-12.53 7.344a1.37 1.37 0 01-1.386 0l-12.5-7.323a1.37 1.37 0 00-1.39.002l-5.395 3.181a1.37 1.37 0 01-.237.111l-7.31 2.595a1.37 1.37 0 01-1.829-1.291V8.963c0-.509.282-.975.732-1.212z"
                      ></path>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                      <g transform="translate(1.796 7.529)">
                        <mask
                          id="tourlane-USPs-CustomizedItinerary__mask-2"
                          fill="#fff"
                        >
                          <use></use>
                        </mask>
                        <use fill="#EDEFF0"></use>
                        <path
                          fill="#FFF"
                          d="M15.544 0h13.831v54.588h-13.83zM43.38 0h15.06v54.588H43.38z"
                          mask="url(#tourlane-USPs-CustomizedItinerary__mask-2)"
                        ></path>
                      </g>
                      <path
                        stroke="#3F4144"
                        stroke-dasharray="2.936470480526195,5.872940961052389"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.302 27.427c2.826 12.357 7.471 14.911 13.936 7.663 9.699-10.872 16.298 5.56 22.969 1.919"
                      ></path>
                      <path
                        stroke="#3F4144"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7.945 19.408l3.566 3.566M11.511 19.408l-3.566 3.566M31.235 55.968l-.064-17.181m0-13.228l.064-9.894M45.002 48.272v-4.215M59.732 15.279c.448.237.729.703.729 1.21V54.88a1.37 1.37 0 01-2.013 1.21l-12.655-6.71a1.37 1.37 0 00-1.335.028l-12.53 7.344a1.37 1.37 0 01-1.386 0l-12.539-7.345a1.37 1.37 0 00-1.33-.03L7.466 54.22 3.89 56.102a1.37 1.37 0 01-2.009-1.213V16.49c0-.508.28-.974.729-1.211l13.952-7.394a1.37 1.37 0 011.33.026l12.65 7.352a1.37 1.37 0 001.382-.002l12.533-7.345a1.37 1.37 0 011.335-.029l-3.705 11.992 17.644-4.6z"
                      ></path>
                      <path
                        fill="#59DD7D"
                        stroke="#3F4144"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M51.388 2.884c6.238 0 11.294 5.056 11.294 11.294 0 4.158-3.764 10.433-11.294 18.823-7.53-8.39-11.294-14.665-11.294-18.823 0-6.238 5.057-11.294 11.294-11.294zm-.23 6.527a3.765 3.765 0 100 7.53 3.765 3.765 0 000-7.53z"
                      ></path>
                      <path
                        stroke="#3F4144"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.958"
                        d="M17.34 48.272v-4.438"
                      ></path>
                      <path
                        stroke="#3F4144"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.34 31.404V9.211"
                      ></path>
                    </g>
                  </g>
                </svg>
                <div className="mt-0 d-flex flex-column justify-content-center align-items-center">
                  <p
                    style={{
                      color: "#3f4144",
                      marginBottom: "0",
                      textAlign: "center",
                      fontSize: "12px",
                    }}
                  >
                    Tailor-Made Trips
                  </p>
                  <h6
                    className="mb-0  text-center"
                    style={{ fontSize: "12px" }}
                  >
                    Your own tailor-made <br></br>itinerary
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-banner-card-contain">
            <div className=" detail-banner-card-contain-one">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <svg
                  style={{ maxWidth: "40px" }}
                  fill="none"
                  viewBox="0 0 64 64"
                  class="mx-auto h-7 w-7 md:mb-1 md:h-10 md:w-10"
                >
                  <path
                    stroke="#3F4144"
                    stroke-width="2"
                    d="M50.779 37.005l-.063 6.18c-.035 10.117-8.246 18.299-18.362 18.299-10.07 0-18.233-8.164-18.233-18.233v-6.246"
                  ></path>
                  <path
                    fill="#59DD7D"
                    fill-rule="evenodd"
                    d="M14.12 42.096H4.995V24.912h6.782"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    stroke="#3F4144"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.12 42.096H4.995V24.912h6.782"
                  ></path>
                  <path
                    fill="#59DD7D"
                    fill-rule="evenodd"
                    d="M52.842 24.912h6.807v17.184h-8.87"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    stroke="#3F4144"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M52.842 24.912h6.807v17.184h-8.87"
                  ></path>
                  <path
                    stroke="#3F4144"
                    stroke-width="2"
                    d="M58.009 42.096v.96a7.83 7.83 0 01-7.83 7.83h-11.81"
                  ></path>
                  <path
                    fill="#EDEFF0"
                    fill-rule="evenodd"
                    stroke="#3F4144"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M27.63 47.7h12.093v6.364H27.63V47.7z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    stroke="#3F4144"
                    stroke-width="2"
                    d="M54.916 24.276C54.916 11.973 44.8 2 32.322 2 19.844 2 9.728 11.973 9.728 24.276"
                  ></path>
                  <path
                    fill="#EDEFF0"
                    fill-rule="evenodd"
                    stroke="#3F4144"
                    stroke-width="2"
                    d="M32.575 23.634a.602.602 0 00-.663.004L14.121 35.493V40.5s-2.054-1.27-2.054-6.498v-3.955c0-11.06 8.87-20.08 19.928-20.261v0C43.312 9.6 52.586 18.73 52.586 30.05v3.952c0 3.228-1.807 6.498-1.807 6.498v-5.007L32.575 23.634z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    stroke="#3F4144"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.905 37.633c1.23-1.103 2.581-1.654 4.053-1.654 1.471 0 2.772.551 3.903 1.654m7.956 0c1.23-1.103 2.58-1.654 4.052-1.654 1.471 0 2.773.551 3.904 1.654"
                  ></path>
                </svg>
                <div className="mt-0 d-flex flex-column justify-content-center align-items-center text-center">
                  <p
                    style={{
                      color: "#3f4144",
                      marginBottom: "0",
                      textAlign: "center",
                      fontSize: "12px",
                    }}
                  >
                    Consultation With Travel <br></br>Experts
                  </p>
                  <h6
                    className="mb-0  text-center"
                    style={{ fontSize: "12px" }}
                  >
                    Personal advice and<br></br> insider tips.
                  </h6>
                </div>
              </div>
            </div>
            <div className=" detail-banner-card-contain-one">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <svg
                  style={{ maxWidth: "40px" }}
                  viewBox="0 0 64 64"
                  class="mx-auto h-7 w-7 md:mb-1 md:h-10 md:w-10"
                >
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    transform="translate(3.765 1.882)"
                  >
                    <path
                      fill="#FFF"
                      d="M1.882 9.412h35.765v41.412H1.882z"
                    ></path>
                    <path
                      fill="#EDEFF0"
                      d="M1.882 50.824h35.765v9.412H1.882zM1.882 0h33.882v9.412H1.882z"
                    ></path>
                    <rect
                      width="35.765"
                      height="60.235"
                      x="0.941"
                      stroke="#3F4144"
                      stroke-width="2"
                      rx="1.882"
                    ></rect>
                    <path
                      stroke="#3F4144"
                      stroke-linecap="square"
                      stroke-width="2"
                      d="M.941 8.471h35.765"
                    ></path>
                    <circle
                      cx="18.824"
                      cy="55.059"
                      r="1.882"
                      fill="#3F4144"
                    ></circle>
                    <path
                      stroke="#3F4144"
                      stroke-linecap="square"
                      stroke-width="2"
                      d="M.941 49.882h35.765"
                    ></path>
                    <path
                      fill="#59DD7D"
                      d="M25.744 33.203l-.772 3.851 3.743 3.371 3.367-.983 2.045-3.222z"
                    ></path>
                    <path
                      fill="#59DD7D"
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M31.536 39.601c2.338.913 4.99 1.429 7.8 1.429 9.436 0 17.086-5.814 17.086-12.986 0-7.171-7.65-12.985-17.087-12.985-9.436 0-17.086 5.814-17.086 12.985 0 2.657 1.05 5.127 2.851 7.185"
                    ></path>
                    <path
                      fill="#3F4144"
                      fill-rule="nonzero"
                      d="M30.91 32.776c2.04 0 3.217-1.309 3.217-2.812 0-1.281-.654-2.019-1.687-2.465l-1.098-.473c-.733-.32-1.295-.515-1.295-1.072 0-.515.418-.821 1.085-.821.68 0 1.204.264 1.766.724l.98-1.295a3.828 3.828 0 00-2.746-1.198c-1.779 0-3.034 1.198-3.034 2.701 0 1.323.837 2.103 1.713 2.479l1.112.5c.745.335 1.23.516 1.23 1.087 0 .543-.393.877-1.19.877-.707 0-1.492-.39-2.107-.947l-1.098 1.406a4.516 4.516 0 003.152 1.31zm8.135 0c2.302 0 3.872-1.782 3.872-4.747 0-2.952-1.57-4.665-3.872-4.665-2.302 0-3.871 1.699-3.871 4.665 0 2.965 1.57 4.747 3.871 4.747zm0-1.768c-1.164 0-1.896-1.156-1.896-2.98 0-1.81.732-2.895 1.896-2.895s1.897 1.086 1.897 2.896c0 1.823-.733 2.979-1.897 2.979zm8.083 1.768c2.04 0 3.218-1.309 3.218-2.812 0-1.281-.654-2.019-1.687-2.465l-1.099-.473c-.732-.32-1.295-.515-1.295-1.072 0-.515.419-.821 1.086-.821.68 0 1.203.264 1.765.724l.981-1.295a3.828 3.828 0 00-2.746-1.198c-1.779 0-3.035 1.198-3.035 2.701 0 1.323.837 2.103 1.714 2.479l1.111.5c.746.335 1.23.516 1.23 1.087 0 .543-.392.877-1.19.877-.707 0-1.491-.39-2.106-.947l-1.099 1.406a4.516 4.516 0 003.152 1.31z"
                    ></path>
                    <path
                      fill="#59DD7D"
                      stroke="#3F4144"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M25.1 35.229c-1.9 3.594-3.323 6.007-4.268 7.24-1.417 1.85 9.58-1.82 10.704-2.868"
                    ></path>
                  </g>
                </svg>
                <div className="mt-0 d-flex flex-column justify-content-center align-items-center text-center">
                  <p
                    style={{
                      color: "#3f4144",
                      marginBottom: "0",
                      textAlign: "center",

                      fontSize: "12px",
                    }}
                  >
                    24/7 Emergency Hotline
                  </p>
                  <h6
                    className="mb-0  text-center"
                    style={{ fontSize: "12px" }}
                  >
                    Our safety team are here <br></br> for you.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------Related trips------------------------------ */}

        <div className="container text-center my-5">
          <div className="container">
            <h4 className="cards-heading">Related trips</h4>
            <p
              className="related-trips-description"
              style={{
                fontFamily: "Lato",
                fontWeight: "400",
                fontSize: "18px",
                lineHeight: "27px",
                marginBottom: "10px",
              }}
            >
              This trip comes in different shapes and sizes. For more options,
              check out these itineraries.
            </p>
            <div className="slider-container w-3/4 m-auto">
              <div className="slider-inner mt-20">
                <Slider {...settings}>
                  {northindia.map((pkg, index) => (
                    <Link to={`/SubPackages/${pkg.id}`} key={index}>
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
        <div
          className="insta d-flex justify-content-center align-items-center"
          style={{ width: "99%" }}
        >
          <Insta />
        </div>

        <div className="container my-5" id="faq">
          <h1 className="text-center detail-card-heading mb-4">
            {" "}
            <span style={{ borderBottom: "3px solid green" }}>FAQ</span>
          </h1>
          <div className="accordion detail-card" id="faqAccordion">
            <div className="card mb-3 ">
              <div className="card-header" id="heading0">
                <h5 className="mb-0">
                  <Link
                    className=" collapsed"
                    to="#question0"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="question0"
                  >
                    What does Welcome Tours include?
                  </Link>
                </h5>
              </div>
              <div
                id="question0"
                className="collapse"
                aria-labelledby="heading0"
                data-parent="#faqAccordion"
              >
                <div className="card-body"></div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header" id="heading1">
                <h5 className="mb-0">
                  <Link
                    className=" collapsed"
                    to="#question1"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="question1"
                  >
                    What does Welcome Tours include?
                  </Link>
                </h5>
              </div>
              <div
                id="question1"
                className="collapse"
                aria-labelledby="heading1"
                data-parent="#faqAccordion"
              >
                <div className="card-body"></div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header" id="heading2">
                <h5 className="mb-0">
                  <Link
                    className=" collapsed"
                    to="question2"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="question2"
                  >
                    What does Welcome Tours exclude?
                  </Link>
                </h5>
              </div>
              <div
                id="question2"
                className="collapse"
                aria-labelledby="heading2"
                data-parent="#faqAccordion"
              >
                <div className="card-body"></div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header" id="heading3">
                <h5 className="mb-0">
                  <Link
                    className="collapsed"
                    to="#question3"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="question3"
                  >
                    Why do we use it?
                  </Link>
                </h5>
              </div>
              <div
                id="question3"
                className="collapse"
                aria-labelledby="heading3"
                data-parent="#faqAccordion"
              >
                <div className="card-body"></div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header" id="heading4">
                <h5 className="mb-0">
                  <Link
                    className=" collapsed"
                    to="#question4"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="question4"
                  >
                    Where can I get some?
                  </Link>
                </h5>
              </div>
              <div
                id="question4"
                className="collapse"
                aria-labelledby="heading4"
                data-parent="#faqAccordion"
              >
                <div className="card-body"></div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header" id="heading5">
                <h5 className="mb-0">
                  <Link
                    className=" collapsed"
                    to="#question5"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="question5"
                  >
                    What is Lorem Ipsum?
                  </Link>
                </h5>
              </div>
              <div
                id="question5"
                className="collapse"
                aria-labelledby="heading5"
                data-parent="#faqAccordion"
              >
                <div className="card-body"></div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header" id="heading6">
                <h5 className="mb-0">
                  <Link
                    className=" collapsed"
                    to="#question6"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="question6"
                  >
                    Where does it come from?
                  </Link>
                </h5>
              </div>
              <div
                id="question6"
                className="collapse"
                aria-labelledby="heading6"
                data-parent="#faqAccordion"
              >
                <div className="card-body"></div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header" id="heading7">
                <h5 className="mb-0">
                  <Link
                    className=" collapsed"
                    to="#question7"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="question7"
                  >
                    Why do we use it?
                  </Link>
                </h5>
              </div>
              <div
                id="question7"
                className="collapse"
                aria-labelledby="heading7"
                data-parent="#faqAccordion"
              >
                <div className="card-body"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Floatbutton />
    </div>
  );
};
export default Detail;
