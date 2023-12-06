import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import Container from "@material-ui/core/Container";
import { motion } from "framer-motion";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./Components.scss";

function Music(...props) {
     const { userId } = useUser();
     const navigate = useNavigate();

     // OffCanvas states
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     // verification states
     const [validated, setValidated] = useState(false);
     const [repeat, setRepeat] = useState(false);

     // Link states
     const [link, setLink] = useState("");
     const [linkList, setLinkList] = useState([]);
     //let listLink = [];

     const fetchMusic = async () => {
          try {
               const response = await fetch(
                    `http://127.0.0.1:8000/music/all-links/${userId}`,
                    {
                         method: "GET",
                         credentials: "include",
                         headers: {
                              Accept: "application/json",
                         },
                    }
               );

               if (!response.ok) {
                    throw new Error(
                         `Error fetching music list: ${response.statusText}`
                    );
               }

               const data = await response.json();
               if (data.playlist_links !== undefined) {
                    setLinkList(data.playlist_links);
               }
          } catch (error) {
               console.error(error);
               navigate("/login");
          }
     };
     useEffect(() => {
          fetchMusic();
     }, []); // Run once when the component mounts

     const handleSubmit = (e) => {
          const form = e.currentTarget;
          e.preventDefault();
          if (form.checkValidity() === false) {
               e.preventDefault();
               e.stopPropagation();
               setValidated(true); // Show validation errors
          } else {
               setValidated(false);
               setRepeat(false);

               // example spotify link: https://open.spotify.com/playlist/7pPkmfFovCJIyAKGZ4Ovzr?si=4f2c69c3469c4175
               // Regular expression to match Spotify playlist URLs
               const spotifyRegex =
                    /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+(\?si=[a-zA-Z0-9]+)?$/;

               // Check if the link matches the Spotify playlist URL pattern
               if (!spotifyRegex.test(link)) {
                    e.preventDefault();
                    e.stopPropagation();
                    setValidated(true); // Show validation errors
               } else {
                    const uniqueURLPart = link.split(/[/?]/)[4]; // split link using "/" or "?"
                    const spotifyEmbed =
                         "https://open.spotify.com/embed/playlist/" +
                         uniqueURLPart +
                         "?utm_source=generator&theme=0";

                    if (linkList.indexOf(spotifyEmbed) != -1) {
                         // check for repeat playlist
                         console.log("ALREADY HERE");
                         e.preventDefault();
                         e.stopPropagation();
                         setRepeat(true); // Show repeat errors
                    } else {
                         setValidated(false);
                         setRepeat(false);
                         handleUpdateDB(spotifyEmbed);
                         handleClose();
                    }
               }
          }
     };

     const handleUpdateDB = async (link) => {
          try {
               const response = await fetch(
                    `http://127.0.0.1:8000/music/add-music/${userId}`,
                    {
                         method: "POST",
                         credentials: "include",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({
                              user_id: userId,
                              link: link,
                         }),
                    }
               );

               if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error updating music list:", errorData);
                    throw new Error(
                         `Error updating music list: ${response.statusText}`
                    );
               }
               console.log("Music updated successfully");
               fetchMusic();
          } catch (error) {
               console.error(error);
          }
     };
     const musicCardList = linkList.map((l) => (
          <iframe
               style={{ borderRadius: "12px", marginBottom: "1rem" }}
               src={l}
               //"https://open.spotify.com/embed/playlist/4jwOXOlk6eUe3Oh2B515mZ?utm_source=generator&theme=0"
               width="100%"
               height={linkList.length > 1 ? 170 : 360}
               frameBorder="0"
               allowfullscreen=""
               allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
               loading="lazy"
               key={l}
          ></iframe>
     ));

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
                         paddingLeft: "0px",
                         paddingRight: "0px",
                    }}
               >
                    Music
                    <Button
                         onClick={handleShow}
                         style={{
                              height: "3rem",
                              width: "3rem",
                              padding: "0rem",
                              background: "#F65858",
                              borderColor: "#F65858",
                         }}
                    >
                         <AddRoundedIcon className="page-icon"></AddRoundedIcon>
                    </Button>
                    <Offcanvas
                         placement="bottom"
                         show={show}
                         onHide={handleClose}
                         {...props}
                         style={{ height: "auto" }}
                    >
                         <Offcanvas.Header
                              closeButton
                              style={{
                                   paddingBottom: "8px",
                                   flexDirection: "down",
                              }}
                         >
                              <Offcanvas.Title>
                                   Add a workout playlist{" "}
                              </Offcanvas.Title>{" "}
                         </Offcanvas.Header>

                         <Offcanvas.Body style={{ paddingTop: "8px" }}>
                              Integrate a Spotify playlist by copying and
                              pasting the share link into the field below.
                              <Form
                                   noValidate
                                   //validated={validated}
                                   onSubmit={handleSubmit}
                                   style={{ paddingTop: "1rem" }}
                              >
                                   {/* Alert for displaying validation errors */}
                                   {validated && (
                                        <Alert variant="danger">
                                             The link provided is invalid.
                                             Please try again.
                                        </Alert>
                                   )}
                                   {repeat && (
                                        <Alert variant="danger">
                                             This playlist has already been
                                             added.
                                        </Alert>
                                   )}

                                   <Form.Group
                                        style={{ marginBottom: "2rem" }}
                                        className="mb-3"
                                   >
                                        <Form.Control
                                             type="text"
                                             name="link"
                                             value={link}
                                             onChange={(e) => {
                                                  setLink(e.target.value);
                                                  setRepeat(false);
                                             }}
                                        />
                                   </Form.Group>
                                   <div
                                        style={{
                                             display: "flex",
                                             justifyContent: "Center",
                                        }}
                                   >
                                        <Button
                                             type="submit"
                                             style={{
                                                  background: "#F3A64B",
                                                  borderColor: "#F3A64B",
                                             }}
                                        >
                                             Submit
                                        </Button>
                                   </div>
                              </Form>
                         </Offcanvas.Body>
                    </Offcanvas>
               </Container>
               <Container
                    className="page-header"
                    style={{
                         alignContent: "center",
                         display: "flex",
                         alignItems: "center",
                         justifyCntent: "center",
                         flexDirection: "column",
                         paddingLeft: "0px",
                         paddingRight: "0px",
                    }}
               >
                    {linkList.length !== 0 ? (
                         musicCardList
                    ) : (
                         <div
                              style={{
                                   fontSize: "1.5rem",
                                   justifyContent: "center",
                                   display: "flex",
                                   alignItems: "center",
                                   textAlign: "center",
                                   paddingTop: "3rem",
                                   flexDirection: "column",
                              }}
                         >
                              To add a new playlist, click on the &quot;+&quot;
                              above!
                         </div>
                    )}
               </Container>
          </motion.div>
     );
}

export default Music;
