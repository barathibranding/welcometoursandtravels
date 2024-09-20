import React, { useEffect } from "react";

const Insta = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute("data-use-service-core", "");
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        class="elfsight-app-50fbc6a8-5d1f-4063-9d2b-14c74b044804"
        data-elfsight-app-lazy
      ></div>
    </>
  );
};

export default Insta;
