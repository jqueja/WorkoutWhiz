import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Components.scss";

function LogWorkout({ ...props }) {
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
                <AddRoundedIcon className="page-icon"></AddRoundedIcon>
            </Button>

            <Offcanvas
                placement="bottom"
                show={show}
                onHide={handleClose}
                {...props}
                style={{ height: "18rem" }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Log a new workout</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Form.Select
                            aria-label="Exercise Input"
                            style={{ marginBottom: "2rem" }}
                        >
                            <option value="1">Weightlifting</option>
                            <option value="2">Distance</option>
                        </Form.Select>

                        <InputGroup style={{ marginBottom: "2rem" }}>
                            <InputGroup.Text size="sm">Weight</InputGroup.Text>
                            <Form.Control
                                placeholder="lbs"
                                aria-label="Weight"
                            />

                            <InputGroup.Text id="basic-addon1">
                                Sets
                            </InputGroup.Text>
                            <Form.Control aria-label="Sets" />
                            <InputGroup.Text id="basic-addon1">
                                Reps
                            </InputGroup.Text>
                            <Form.Control aria-label="Reps" />
                        </InputGroup>
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
export default LogWorkout;
