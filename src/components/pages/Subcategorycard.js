import React, { useEffect, useState } from "react";
import "./Home.css";
import { fetchmobilePackages } from "./ApiService";
import { Link, useParams } from "react-router-dom";
import Header1 from "../navbar/Header1";
// import { Helmet } from "react-helmet";

const Subcategorycard = () => {
  const { categoryId } = useParams();
  const [mobilePackages, setMobilePackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packages = await fetchmobilePackages(categoryId);
        setMobilePackages(packages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, [categoryId]);

  return (
    <div>
      {/* <Helmet>
        <title>Top Trips| Welcometoursandtravels</title>
        <meta
          name="description"
          content="  Your Dream Vacation Is Finally Here."
        />
        <meta
          name="keywords"
          content="tours, travels, welcometoursandtravels, vacation,honeymoon,trip,hillstation"
        />
      </Helmet> */}
      <Header1 />
      <div className="container subcategory mt-5">
        <h1 className="mt-5">Top Trips</h1>

        {mobilePackages.map((pkg, index) => (
          <Link to={`/SubPackages/${pkg.id}/${pkg.slug}`} key={index}>
            <div className="subcategory-image mt-2">
              <img src={pkg.image} alt={pkg.name}></img>
            </div>
            <h5 className="subcategory-name">{pkg.name}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subcategorycard;
