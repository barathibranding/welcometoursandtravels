import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { fetchSubPackageDetail } from "./ApiService";
import "./Home.css";

const Map = () => {
  const { Id } = useParams();
  const [cityCoordinates, setCityCoordinates] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSubPackageDetail(Id);
        if (data.citycoordinates_set) {
          setCityCoordinates(data.citycoordinates_set);
        } else {
          console.error("City coordinates data not found in API response");
        }
      } catch (error) {
        console.error("Error fetching city coordinates:", error);
      }
    };

    fetchData();
  }, [Id]);

  useEffect(() => {
    if (!cityCoordinates) return;

    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGVlbmEyNDIzIiwiYSI6ImNsd2VsZmNjdDE0NDMybHBuMWlvNnBhOGoifQ.EvOxfoC8QuL9ZO9qQzO_bQ";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [cityCoordinates[0].longitude, cityCoordinates[0].latitude],
      zoom: 6,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      cityCoordinates.forEach((city, index) => {
        // Create a DOM element for the marker
        const el = document.createElement("i");
        el.className = "fas fa-map-marker-alt custom-marker";
        el.textContent = (index + 1).toString();

        // Add marker to the map
        new mapboxgl.Marker(el)
          .setLngLat([city.longitude, city.latitude])
          .addTo(map);

        el.addEventListener("click", () => {
          const popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat([city.longitude, city.latitude])
            .setHTML(`<h3>${city.city_name}</h3>`)
            .addTo(map);
        });
      });

      const bounds = new mapboxgl.LngLatBounds();
      cityCoordinates.forEach((city) => {
        bounds.extend([city.longitude, city.latitude]);
      });
      map.fitBounds(bounds, {
        padding: 50,
      });
    });

    return () => map.remove();
  }, [cityCoordinates]);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "400px", marginBottom: "50px" }}
    />
  );
};

export default Map;
