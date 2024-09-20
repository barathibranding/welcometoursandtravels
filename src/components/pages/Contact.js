import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import "./Home.css";

const Contact = () => {
  useEffect(() => {
    document.title = "ContactUs | Welcome Tours and Travels";
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", " contact now");
  }, []);
  return (
    <div>
      <section id="contact" className="contact mt-5">
        <div className="container">
          <header className="section-header text-center">
            <h4 style={{ fontSize: "2.5rem" }}>Contact Us</h4>
          </header>

          <div className="row gy-4" style={{ backgroundColor: " #fafbff" }}>
            <div className="col-lg-6 ">
              <div className="row gy-4">
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-geo-alt"></i>
                    <h3>Address</h3>
                    <p style={{ fontSize: "14px", fontWeight: "400" }}>
                      1 Woods Road,
                      <br></br>
                      Chennai,
                      <br></br>
                      Tamilnadu, India.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-telephone"></i>
                    <h3>Call Us</h3>
                    <p style={{ fontSize: "14px", fontWeight: "400" }}>
                      <Link to="tel:+91 73733 39933">+91 73733 39933</Link>
                    </p>
                    <br></br>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-envelope"></i>
                    <h3>Email Us</h3>
                    <p style={{ fontSize: "14px", fontWeight: "400" }}>
                      <Link to="director@allindiatours.com">
                        director@allindiatours.com
                      </Link>
                    </p>
                    <br></br>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-clock"></i>
                    <h3>Open Hours</h3>
                    <p style={{ fontSize: "14px", fontWeight: "400" }}>
                      Monday - Friday<br></br>9:00AM - 05:00PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <form action="" method="post" className="php-email-form">
                <div className="row gy-4">
                  <div className="col-md-6 py-2 px-2 contact-name">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="col-md-6 py-2 px-2 contact-email">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>

                  <div className="col-md-12 py-2 px-2 contact-text">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>

                  <div className="col-md-12 py-2 px-2 contact-text-area">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="6"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>

                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>

                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="text-center mt-4 col-12 col-md-12">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.580029596371!2d80.26114607505254!3d13.062382912881475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526617091d06ad%3A0x8b7dc16a2d87c425!2sWelcome%20Tours%20and%20Travels%20Chennai%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1715766181871!5m2!1sen!2sin"
            width="100%"
            height="400px"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
export default Contact;
