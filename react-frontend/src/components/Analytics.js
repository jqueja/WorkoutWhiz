import React from "react";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import WeightliftCarousel from "./WeightliftCarousel.js";

import DistanceCarousel from "./DistanceCarousel.js";

import Carousel from "react-bootstrap/Carousel";

function Analytics() {
     const [index, setIndex] = useState(0);

     const handleSelect = (selectedIndex) => {
          setIndex(selectedIndex);
     };
     return (
          <div>
               <Container
                    className="page-header"
                    style={{
                         display: "flex",
                         justifyContent: "space-between",
                    }}
               >
                    Analytics
               </Container>
               <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                         <WeightliftCarousel />
                    </Carousel.Item>
                    <Carousel.Item>
                         <DistanceCarousel />
                    </Carousel.Item>
               </Carousel>
          </div>
     );
}

export default Analytics;
