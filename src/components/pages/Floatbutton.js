import React from "react";
import { ImWhatsapp } from "react-icons/im";
import { IoCall } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { FiMail } from "react-icons/fi";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Floatbutton = () => {
  const WhatsAppButton = styled.button`
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #ffffff; /* WhatsApp green color */
    border: none;
    cursor: pointer;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #25d366;
    font-size: 30px; /* Adjust icon size */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      transform: translateY(-10px);
      background-color: #25d366;
      color: #ffffff; /* Change icon color on hover */
    }

    // Media query for hiding on mobile devices
    @media (max-width: 768px) {
      display: none; // Hide the button on screens smaller than 768px (typically mobile devices)
    }
  `;

  const CallButton = styled.button`
    position: fixed;
    bottom: 170px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #fff;
    border: none;
    cursor: pointer;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #007bff;
    font-size: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    /* Hover state */
    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      transform: translateY(-10px);
      color: #fff;
      background-color: #007bff;
    }

    // Media query for hiding on mobile devices
    @media (max-width: 768px) {
      display: none;
    }
  `;

  const MailButton = styled.button`
    position: fixed;
    bottom: 10px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #fff;
    border: none;
    cursor: pointer;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    font-size: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    /* Hover state */
    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      transform: translateY(-10px);
      color: #fff;
      background-color: red;
    }

    // Media query for hiding on mobile devices
    @media (max-width: 768px) {
      display: none;
    }
  `;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div>
        <Link to="mailto:director@allindiatours.com" target="blank">
          <MailButton>
            <FiMail />
          </MailButton>
        </Link>

        <Link to="https://wa.me/+917373339933" target="blank">
          <WhatsAppButton>
            <ImWhatsapp />
          </WhatsAppButton>
        </Link>
        <Link to="tel:+917373339933">
          <CallButton>
            <IoCall />
          </CallButton>
        </Link>
      </div>
      <div className="row  d-sm-none align-items-center justify-content-center float-mobile text-center">
        <div className="col-4 text-center">
          <Link to="/" onClick={handleScrollToTop}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 12 14"
              cursor="pointer"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.682.985a2.495 2.495 0 00-3.364 0l-3.5 3.19A2.51 2.51 0 000 6.032v5.129a2.503 2.503 0 002.5 2.507h7c1.38 0 2.5-1.123 2.5-2.507V6.03a2.51 2.51 0 00-.818-1.854l-3.5-3.19zM8 9.667v2.667H4V9.667a2 2 0 114 0z"
              ></path>
            </svg>
            <p>Explore</p>
          </Link>
        </div>

        <div className="col-4">
          <Link to="https://wa.me/+917373339933" target="blank">
            <ImWhatsapp />
            <p>WhatsApp</p>
          </Link>
        </div>

        <div
          className="col-4 call-us bg-dark"
          style={{ height: "100%", paddingTop: "8px" }}
        >
          <Link to="tel:+917373339933">
            <IoCallOutline style={{ color: "rgb(152, 255, 83)" }} />

            <p style={{ color: "rgb(152, 255, 83)" }}>Call Us!</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Floatbutton;
