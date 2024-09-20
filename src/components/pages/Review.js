import React, { useEffect } from "react";

const Review = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.taggbox.com/embed-lite.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="taggbox"
      style={{ width: "100%", height: "100%" }}
      data-widget-id="148767"
      data-tags="false"
    ></div>
  );
};

export default Review;
