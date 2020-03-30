import React from "react";
import { LinearProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <div id="loader" className="fixed top-0 left-0 w-screen mt-16 hidden">
      <LinearProgress color="secondary" />
    </div>
  );
};

export default Loader;
