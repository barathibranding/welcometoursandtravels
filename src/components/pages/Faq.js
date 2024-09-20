import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


const Faq = () => {
  return (
    <div>
      <div className="container my-5" id="faq">
        <h1 className="text-center mb-4">FAQ</h1>
        <div className="accordion" id="faqAccordion">
          <div className="card mb-3">
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
              <h5 className="mb-0" style={{ color: "black" }}>
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
  );
};
export default Faq;
