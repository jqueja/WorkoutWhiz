import React from "react";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function EditSettings({ ...props }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
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
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Form style={{ marginBottom: "1rem" }}>
                            <Form.Label>Name</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control placeholder="First name" />
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Last name" />
                                </Col>
                            </Row>
                        </Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Female</option>
                                    <option>Male</option>
                                    <option>Other</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formDOB">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control placeholder="dd/mm/yy" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formWeight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formHeight">
                                <Form.Label>Height</Form.Label>
                                <Form.Control />
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
