import React from "react";

//8 -> for routes not specified in the router
import { useRouteError } from "react-router-dom";

const Error = () => {
  //9
  const error = useRouteError();
  console.error(error);
  return (
    <div>
      {/* //10 */}
      <h1>{error.statusText || error.message}</h1>
      <p>sachin</p>
    </div>
  );
};

export default Error;
