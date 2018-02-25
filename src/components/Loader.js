import React from "react";
import ContentLoader from "react-content-loader";

// tool to create the loader
// http://danilowoz.com/create-react-content-loader/

const Loader = props => (
  <ContentLoader
    height={86}
    width={530}
    speed={2}
    primaryColor={"#f3f3f3"}
    secondaryColor={"#ecebeb"}
  >
    <circle cx="25" cy="25" r="25" />
    <rect x="64" y="0" rx="0" ry="0" width="149" height="17" />
    <rect x="64" y="28.27" rx="0" ry="0" width="285" height="12" />
    <rect x="64" y="48.27" rx="0" ry="0" width="285" height="12" />
  </ContentLoader>
);

export default Loader;
