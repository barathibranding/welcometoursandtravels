import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Modal, Button } from "react-bootstrap";

const Form = () => {
  const [notification, setNotification] = useState("");
  const [signSuccessModal, setSignSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [show, setShow] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = format(formData.date, "yyyy-MM-dd");
    const updatedFormData = { ...formData, date: formattedDate };

    try {
      const response = await axios.post(
        "https://welcometoursandtravels.com/api/api/request/",
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNotification("Form submitted successfully!");
      setSignSuccessModal(true);
      setShow(false); // Close the "Request More Info" modal

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

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Request More Info
      </Button>

      <Modal show={show} onHide={handleClose} id="exampleModalCenter">
        <div className="modal-from" role="document">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <div className="modal-header-text align-items-center">
                  <h6 className="modal-title" id="exampleModalCenterTitle">
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
                  <img src="/assets/img/taj.webp" alt="Taj Mahal" />
                </div>
                <div className="image-content-text">
                  <h3>Madurai Rameswaram Madurai - 2 Nights 3 Days</h3>
                  <p>Tour commencing from Madurai and completing at Madura</p>
                </div>
              </div>
              <div className="modal-body">
                <div className="form-group date-form">
                  <DatePicker
                    name="date"
                    selected={formData.date}
                    onChange={handleChange}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
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
                    <b>How would you like us to contact you?</b>
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
                      Keep me updated on the latest Welcome tours news, deals,
                      and latest trips
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
                    <label className="form-check-label" htmlFor="pastTraveller">
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
      <Modal show={signSuccessModal} onHide={() => setSignSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Form submitted successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setSignSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={errorModal} onHide={() => setErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submission Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Form submission failed. Please try again later.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Form;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from 'date-fns';
// import { Modal, Button } from 'react-bootstrap';

// const Form = () => {
//   const [notification, setNotification] = useState("");
//   const [signSuccessModal, setSignSuccessModal] = useState(false);
//   const [errorModal, setErrorModal] = useState(false);
//   const [formData, setFormData] = useState({
//     date: new Date(),
//     first_name: "",
//     last_name: "",
//     email: "",
//     mobile: "",
//     by_email: false,
//     by_phone: false,
//     update_latest_news: false,
//     past_traveller: false,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Format the date to "YYYY-MM-DD"
//     const formattedDate = format(formData.date, 'yyyy-MM-dd');

//     // Update formData with formatted date
//     const updatedFormData = { ...formData, date: formattedDate };

//     // Log the form data before sending
//     console.log("Form data being sent:", updatedFormData);

//     try {
//       const response = await axios.post(
//         "https://tours.bwsoft.in/api/api/request/",
//         updatedFormData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Log server response if successful
//       console.log("Server response:", response.data);
//       setNotification("Form submitted successfully!");
//       setSignSuccessModal(true); // Show success modal

//       // Clear form data after submission
//       setFormData({
//         date: new Date(),
//         first_name: "",
//         last_name: "",
//         email: "",
//         mobile: "",
//         by_email: false,
//         by_phone: false,
//         update_latest_news: false,
//         past_traveller: false,
//       });

//       // Close the "Request More Info" modal
//       document.getElementById("exampleModalCenter").classList.remove("show");
//       document.getElementById("exampleModalCenter").setAttribute("aria-hidden", "true");
//       document.body.classList.remove("modal-open");
//       document.getElementsByClassName("modal-backdrop")[0].remove();
//     } catch (error) {
//       // Log error response if request fails
//       console.error("Error response:", error.response);
//       setNotification("Form submission failed. Please try again.");
//       setErrorModal(true); // Show error modal
//     }
//   };

//   useEffect(() => {
//     if (notification) {
//       const timer = setTimeout(() => {
//         setNotification("");
//       }, 3000); // Hide notification after 3 seconds

//       // Cleanup the timeout if the component unmounts
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   const handleChange = (e) => {
//     if (e.target) {
//       const { name, value, type, checked } = e.target;
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     } else {
//       // If e.target is undefined, it means it's a date change event
//       setFormData((prevState) => ({
//         ...prevState,
//         date: e,
//       }));
//     }
//   };

//   return (
//     <div>

//        <div
//        className="modal fade custom-modal"
//        id="exampleModalCenter"
//        tabIndex="-1"
//        role="dialog"
//        aria-labelledby="exampleModalCenterTitle"
//        aria-hidden="true"

//       >
//         <div className="" role="document">
//           <div className="modal-content">
//             <form onSubmit={handleSubmit}>
//               <div className="modal-header">
//                 <div className="modal-header-text">

//                 </div>

//               </div>

//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Success Modal */}
//       <Modal show={signSuccessModal} onHide={() => setSignSuccessModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Register Successful</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Form submitted successfully!</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={() => setSignSuccessModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Error Modal */}
//       <Modal show={errorModal} onHide={() => setErrorModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Submission Error</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Form submission failed. Please try again later.</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={() => setErrorModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Form;
