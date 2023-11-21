import React from "react";
import Container from "@material-ui/core/Container";
//import { useState } from "react";
// import WeightliftCarousel from "./WeightliftCarousel.js";

// import DistanceCarousel from "./DistanceCarousel.js";

// import Carousel from "react-bootstrap/Carousel";

function Music() {
     //const [index, setIndex] = useState(0);

     // const handleSelect = (selectedIndex) => {
     //      setIndex(selectedIndex);
     // };
     //https://open.spotify.com/playlist/4IzIb3lor60mKXDrAe4ldg?si=9befbe7623294099
     return (
          <div>
               <Container
                    className="page-header"
                    style={{
                         display: "flex",
                         justifyContent: "space-between",
                    }}
               >
                    Music
               </Container>
               <Container
                    className="page-header"
                    style={{
                         display: "flex",
                         justifyContent: "space-between",
                    }}
               >
                    {" "}
                    <iframe
                         style={{ borderRadius: "12px" }}
                         src="https://open.spotify.com/embed/playlist/4jwOXOlk6eUe3Oh2B515mZ?utm_source=generator&theme=0"
                         width="100%"
                         height="500"
                         frameBorder="0"
                         allowfullscreen=""
                         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                         loading="lazy"
                    ></iframe>
               </Container>
               {/* <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                         <WeightliftCarousel />
                    </Carousel.Item>
                    <Carousel.Item>
                         <DistanceCarousel />
                    </Carousel.Item>
               </Carousel> */}
          </div>
     );
}

export default Music;
