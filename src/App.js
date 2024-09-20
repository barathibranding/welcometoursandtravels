import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import SubPackages from "./components/pages/SubPackages";
// import Header from "./components/navbar/Header";

import Footer from "./components/navbar/Footer";
import Detail from "./components/pages/Detail";
import Packages from "./components/pages/Packages";
import Faq from "./components/pages/Faq";
import Privacy from "./components/pages/Privacy";
import Form from "./components/pages/Form";
import SearchComponent from "./components/pages/SearchComponent";
import Map from "./components/pages/Map";
import ScrollToTop from "./components/pages/ScrollToTop";
import Navbar from "./components/navbar/Navbar";
import Subcategorycard from "./components/pages/Subcategorycard";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Router>
      <ScrollToTop />
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/SubPackages/:packageId/:slug" element={<SubPackages />} />
        <Route path="/Detail/:Id/:slug" element={<Detail />} />
        <Route path="/Packages/:subcategoryId/:slug" element={<Packages />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/SearchComponent" element={<SearchComponent />} />
        <Route path="/Map/:Id" element={<Map />} />
        <Route
          path="/Subcategorycard/:categoryId"
          element={<Subcategorycard />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
