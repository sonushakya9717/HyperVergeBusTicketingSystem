import React from "react";

const BusNotFound = () => {
  return (
    <div className="col-12">
    <div className="card bg-dark text-white">
      <img className="card-img" src="https://www.odbus.in/frontassets/images/no-image.png" alt="bus not found" />
      <div className="card-img-overlay">
        <h5 className="card-title">NO BUSES FOUND</h5>
        <p className="card-text">
          Try to search bus  for different date
        </p>
      </div>
    </div>
    </div>
  );
};

export default BusNotFound;
