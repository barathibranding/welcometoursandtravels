// import React, { useState, useEffect } from "react";
// import "./Nav.css"; // Import the CSS file

// import { FaBars, FaTimes } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { fetchCategories, fetchSubCategories } from "../pages/ApiService";

// const Navbar = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [isNavbarOpen, setIsNavbarOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubCategories] = useState([]);
//   const [openDropdown, setOpenDropdown] = useState(null);

//   useEffect(() => {
//     getCategories();
//     getSubCategories();
//   }, []);

//   const getCategories = async () => {
//     try {
//       const data = await fetchCategories();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const getSubCategories = async () => {
//     try {
//       const data = await fetchSubCategories();
//       setSubCategories(data);
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsActive(true);
//       } else {
//         setIsActive(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const toggleNavbar = () => {
//     setIsNavbarOpen(!isNavbarOpen);
//   };

//   const handleDropdownToggle = (id) => {
//     setOpenDropdown((prevDropdown) => (prevDropdown === id ? null : id));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         setIsNavbarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <nav
//       className={`header1 navbar-expand-lg fixed-top ${
//         isActive ? "header1-active" : "header1-inactive"
//       }`}
//       id="mainNav"
//     >
//       <div className="container">
//         <Link to="/" className="d-none d-md-block">
//           <img
//             src="assets/img/HorizontalLogo.png"
//             alt="Logo"
//             style={{ height: "40px" }}
//           />
//         </Link>
//         <Link to="/" className="mobileresponsive">
//           <img
//             src="assets/img/HorizontalLogo.png"
//             alt="Logo"
//             style={{ height: "40px" }}
//           />
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           onClick={toggleNavbar}
//           aria-label="Toggle navigation"
//         >
//             menu
//           {isNavbarOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         <div
//           className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}
//         >
//           <ul className="navbar-nav ms-auto py-4 py-lg-0">
//             {categories.map((category) => (
//               <li
//                 className="nav-item dropdown"
//                 key={category.id}
//                 style={{
//                   fontFamily: "Montserrat, serif",
//                   fontWeight: "700",
//                   fontSize: "14px",
//                   lineHeight: "21px",
//                   color: "white",
//                 }}
//               >
//                 <Link
//                   className="nav-link dropdown-toggle"
//                   to="#"
//                   id={`navbarDropdown${category.id}`}
//                   role="button"
//                   aria-expanded={openDropdown === category.id ? 'true' : 'false'}
//                   onClick={() => handleDropdownToggle(category.id)}
//                 >
//                   {category.name}
//                 </Link>
//                 {openDropdown === category.id && (
//                   <div
//                     className="dropdown-menu show"
//                     aria-labelledby={`navbarDropdown${category.id}`}
//                   >
//                     <div className="container">
//                       <div className="row">
//                         {subcategories
//                           .filter(
//                             (subcategory) => subcategory.category === category.id
//                           )
//                           .map((filteredSubcategory, index) => (
//                             <div
//                               key={index}
//                               className="col-md-6 col-lg-4 mb-3 mb-lg-0"
//                             >
//                               <div className="list-group list-group-flush">
//                                 <Link
//                                   to="#"
//                                   className="list-group-item list-group-item-action text-left header-dropdown"
//                                 >
//                                   {filteredSubcategory.name}
//                                 </Link>
//                               </div>
//                             </div>
//                           ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState } from 'react';
// import './Nav.css';

// const Navbar = () => {
//   const [showMenu, setShowMenu] = useState(false);

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   return (
//     <div>
//       <nav className='navbar'>
//         <img src='assets/img/HorizontalLogo.png' alt='Logo'></img>
//         <button onClick={toggleMenu}>Menu</button>
//         <ul className={showMenu ? 'show' : ''}>
//           <li>Home</li>
//           <li>Service</li>
//           <li>Page</li>
//           <li>Contact</li>
//           <li>About</li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;
