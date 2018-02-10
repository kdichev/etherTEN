import React from 'react'
import ContentLoader from 'react-content-loader'

// tool to create the loader
// http://danilowoz.com/create-react-content-loader/

const Loader = props => (
  <ContentLoader
    height={97}
    width={400}
    speed={2}
    primaryColor={"#f3f3f3"}
    secondaryColor={"#ecebeb"}
  >
    <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" />
    <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
    <rect x="4" y="5.27" rx="0" ry="0" width="60.14" height="42.16" />
  </ContentLoader>
)

export default Loader