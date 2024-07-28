import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Welcome from "./Welcome";
import Create from "./Create-page";
import Tasks from "./Tasks";

function Root() {
  const location = useLocation(); //How location looks below on mount
  //{ hash:'', search:'', key:'default', pathname:'/', state:null}
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  //   console.log(location === displayLocation);
  //   console.log(transitionStage);

  // The useEffect is executed when the location or displayLocation changes. Note that a change in the url path e.g from '/' to '/tasks' doesn't re-render the <Root/> component
  useEffect(() => {
    if (location !== displayLocation) {
      //This would always be executed on every re-render, the location object generated is a totally new one
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  return (
    // We're wrapping all the different pages in this div because we can't animate each pages like <Welcome/>, <Tasks/> directly via react-router and since the opacity property a parent element is respected by it's children element
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={transitionStage}
      //className='fadeIn' on mount
      onAnimationEnd={() => {
        if (transitionStage == "fadeOut") {
          setDisplayLocation(location);
          setTransitionStage("fadeIn");
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Welcome />} />
        <Route path="/create" element={<Create />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default Root;
