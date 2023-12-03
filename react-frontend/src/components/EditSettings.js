import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function EditSettings({ onUpdate, ...props }) {
     const userData = props.data;
     const [show, setShow] = useState(false);

     const calculateAge = (dob) => {
          const today = new Date();
          const birthDate = new Date(dob);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (
               monthDiff < 0 ||
               (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
               age--;
          }

          return age;
     };

     const [formData, setFormData] = useState({
          first_name: userData.first_name,
          last_name: userData.last_name,
          dob: userData.dob,
          age: calculateAge(userData.dob), // Calculate age based on dob
          gender: userData.gender,
          weight: userData.weight,
          height: userData.height,
     });

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     const handleSubmit = (e) => {
          e.preventDefault();

          const updatedData = {
               first_name: formData.first_name,
               last_name: formData.last_name,
               dob: formData.dob,
               age: formData.age,
               gender: formData.gender,
               weight: formData.weight,
               height: formData.height,
          };

          // Identify the changed field
          const changedField = Object.keys(updatedData).find(
               (key) => updatedData[key] !== userData[key]
          );

          if (!changedField) {
               // No changes, close the form
               handleClose();
               return;
          }

          // Only update the changed field
          const fieldToUpdate = { [changedField]: updatedData[changedField] };
          onUpdate(fieldToUpdate);
          handleClose();
     };

     return (
          <>
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
                    <EditRoundedIcon className="page-icon"></EditRoundedIcon>
               </Button>

               <Offcanvas
                    placement="bottom"
                    show={show}
                    onHide={handleClose}
                    style={{ height: "25rem" }}
               >
                    <Offcanvas.Header closeButton>
                         <Offcanvas.Title>
                              Edit User Information
                         </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                         <Form noValidate onSubmit={handleSubmit}>
                              <Form style={{ marginBottom: "1rem" }}>
                                   <Form.Label>Name</Form.Label>
                                   <Row>
                                        <Col>
                                             <Form.Control
                                                  placeholder="First name"
                                                  value={formData.first_name}
                                                  onChange={(e) =>
                                                       setFormData({
                                                            ...formData,
                                                            first_name:
                                                                 e.target.value,
                                                       })
                                                  }
                                             />
                                        </Col>
                                        <Col>
                                             <Form.Control
                                                  placeholder="Last name"
                                                  value={formData.last_name}
                                                  onChange={(e) =>
                                                       setFormData({
                                                            ...formData,
                                                            last_name:
                                                                 e.target.value,
                                                       })
                                                  }
                                             />
                                        </Col>
                                   </Row>
                              </Form>
                              <Row className="mb-3">
                                   <Form.Group as={Col} controlId="formGender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select
                                             value={formData.gender}
                                             onChange={(e) =>
                                                  setFormData({
                                                       ...formData,
                                                       gender: e.target.value,
                                                  })
                                             }
                                        >
                                             <option>Select</option>
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
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                             type="date"
                                             value={formData.dob}
                                             onChange={(e) =>
                                                  setFormData({
                                                       ...formData,
                                                       dob: e.target.value,
                                                       age: calculateAge(
                                                            e.target.value
                                                       ),
                                                  })
                                             }
                                        />
                                   </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                   <Form.Group as={Col} controlId="formWeight">
                                        <Form.Label>Weight</Form.Label>
                                        <Form.Control
                                             value={formData.weight}
                                             onChange={(e) =>
                                                  setFormData({
                                                       ...formData,
                                                       weight: e.target.value,
                                                  })
                                             }
                                        />
                                   </Form.Group>

                                   <Form.Group as={Col} controlId="formHeight">
                                        <Form.Label>Height</Form.Label>
                                        <Form.Control
                                             value={formData.height}
                                             onChange={(e) =>
                                                  setFormData({
                                                       ...formData,
                                                       height: e.target.value,
                                                  })
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
                                   <Button
                                        type="submit"
                                        style={{
                                             background: "#F3A64B",
                                             borderColor: "#F3A64B",
                                        }}
                                        onClick={handleClose}
                                   >
                                        Save
                                   </Button>
                              </div>
                         </Form>
                    </Offcanvas.Body>
               </Offcanvas>
          </>
     );
}

export default EditSettings;

