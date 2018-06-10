import React from "react";

import './LoaderComponent'

const LoaderComponent = ({ showLoading }) => {


  const getLoader = (showLoader) => (
    showLoader
    && <div>
      <div className="overlay">
      </div>
      <div className="message">Loading...</div>
    </div>
  )

  return getLoader(showLoading);
};

export default LoaderComponent;
