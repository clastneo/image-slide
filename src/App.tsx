import * as React from "react";
import ImageSlider from "./components/ImageSlider";

function App() {
  return (
    <div className="App">
      <ImageSlider 
      indicatorWrapperPosition={"bottom:0px"}
      sliderHeight={"height: 50vw"}
      slideTime={2}
      indicatorWrapperColor={"red"} />
    </div>
  );
}
// console.log(document.documentElement.clientWidth);
// console.log(document.documentElement.offsetWidth);
// console.log(window.innerWidth);
export default App;
