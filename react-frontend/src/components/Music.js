import React from "react";
import Container from "@material-ui/core/Container";
import { motion } from "framer-motion";

function Music() {
     //https://open.spotify.com/playlist/4IzIb3lor60mKXDrAe4ldg?si=9befbe7623294099
     return (
          <motion.div
               initial={{ translateX: "-100%" }}
               animate={{
                    translateX: 0,
               }}
          >
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
                         alignContent: "center",
                         display: "flex",
                         alignItems: "center",
                         justifyCntent: "center",
                         flexDirection: "column",
                    }}
               >
                    {" "}
                    <iframe
                         style={{ borderRadius: "12px", marginBottom: "1rem" }}
                         src="https://open.spotify.com/embed/playlist/4jwOXOlk6eUe3Oh2B515mZ?utm_source=generator&theme=0"
                         width="90%"
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
          </motion.div>
     );
}

export default Music;
