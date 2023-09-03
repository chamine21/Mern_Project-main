import React from "react";

function Error({ msg }) {
  let errorMessage = "An error occurred.";
  if (typeof msg === "string") {
    errorMessage = msg;
  } else if (msg && msg.message) {
    errorMessage = msg.message;
  }
  return <div className="alert alert-danger">{errorMessage}</div>;
}

export default Error;
