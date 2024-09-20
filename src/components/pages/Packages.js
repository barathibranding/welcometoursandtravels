import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPackages } from "./ApiService";
import { Container, Row, Col } from "react-bootstrap";

const Packages = () => {
  const { subcategoryId } = useParams();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (subcategoryId) {
        try {
          const data = await fetchPackages(subcategoryId);
          setPackages(data);
        } catch (error) {
          console.error("Error fetching packages:", error);
        }
      }
    };

    fetchData();
  }, [subcategoryId]);

  if (!packages) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container className="mt-5">
        <div className="text-center mb-3  py-5">
          <h6
            className="text-primary text-uppercase"
            style={{ letterSpacing: "5px" }}
          >
            Packages
          </h6>
          <h1>Tours & Travel Services</h1>
        </div>
        <Row className="justify-content-center">
          {packages.map((packages, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className="text-center px-3 mb-4"
            >
              <Link to={`/SubPackages/${packages.id}`}>
                <img
                  src={packages.image}
                  alt={packages.name}
                  style={{
                    height: "250px",
                    width: "300px",
                    borderRadius: "10px",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                />
                <h5 className="mt-2">{packages.name}</h5>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default Packages;
