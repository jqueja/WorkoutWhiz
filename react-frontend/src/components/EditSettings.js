import React from "react";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function EditSettings({ onUpdate, ...props }) {
     const [show, setShow] = useState(false);
     const [firstname, setFirstName] = useState("");
     const [lastname, setLastName] = useState("");
     const [dob, setDob] = useState("");
     const [age, setAge] = useState("");
     const [gender, setGender] = useState("");
     const [weight, setWeight] = useState("");
     const [height, setHeight] = useState("");
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     const handleSubmit = (event) => {
          event.preventDefault();
          // Assuming the form submission is successful
          onUpdate({ firstname, lastname, dob, age, gender, weight, height });
          handleClose();
     };

     return (
          <>
               <Button
                    variant="success"
                    onClick={handleShow}
                    style={{
                         height: "3rem",
                         width: "3rem",
                         padding: "0rem",
                    }}
               >
                    <EditRoundedIcon className="page-icon"></EditRoundedIcon>
               </Button>

               <Offcanvas
                    placement="bottom"
                    show={show}
                    onHide={handleClose}
                    {...props}
                    style={{ height: "25rem" }}
               >
                    <Offcanvas.Header closeButton>
                         <Offcanvas.Title>Edit User Settings</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                         <Form noValidate onSubmit={handleSubmit}>
                              <Form style={{ marginBottom: "1rem" }}>
                                   <Form.Label>Name</Form.Label>
                                   <Row>
                                        <Col>
                                             <Form.Control
                                                  placeholder="First name"
                                                  value={firstname}
                                                  onChange={(e) =>
                                                       setFirstName(e.target.value)
                                                  }
                                             />
                                        </Col>
                                        <Col>
                                             <Form.Control
                                                  placeholder="Last name"
                                                  value={lastname}
                                                  onChange={(e) =>
                                                       setLastName(e.target.value)
                                                  }
                                             />
                                        </Col>
                                   </Row>
                              </Form>
                              <Row className="mb-3">
                                   <Form.Group as={Col} controlId="formGender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select
                                             defaultValue="Choose..."
                                             onChange={(e) =>
                                                  setGender(e.target.value)
                                             }
                                        >
                                             <option value="Female">
                                                  Female
                                             </option>
                                             <option value="Male">Male</option>
                                             <option value="Other">
                                                  Other
                                             </option>
                                        </Form.Select>
                                   </Form.Group>

                                   <Form.Group as={Col} controlId="formDOB">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control
                                             placeholder="dd/mm/yy"
                                             value={dob}
                                             onChange={(e) =>
                                                  setDob(e.target.value)
                                             }
                                        />
                                   </Form.Group>

                                   <Form.Group as={Col} controlId="formAge">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control
                                             value={age}
                                             onChange={(e) =>
                                                  setAge(e.target.value)
                                             }
                                        />
                                   </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                   <Form.Group as={Col} controlId="formWeight">
                                        <Form.Label>Weight</Form.Label>
                                        <Form.Control
                                             value={weight}
                                             onChange={(e) =>
                                                  setWeight(e.target.value)
                                             }
                                        />
                                   </Form.Group>

                                   <Form.Group as={Col} controlId="formHeight">
                                        <Form.Label>Height</Form.Label>
                                        <Form.Control
                                             value={height}
                                             onChange={(e) =>
                                                  setHeight(e.target.value)
                                             }
                                        />
                                   </Form.Group>
                              </Row>

                              <div
                                   style={{
                                        display: "flex",
                                        justifyContent: "Center",
                                   }}
                              >
                                   <Button type="submit">Submit</Button>
                              </div>
                         </Form>
                    </Offcanvas.Body>
               </Offcanvas>
          </>
     );
}
export default EditSettings;
