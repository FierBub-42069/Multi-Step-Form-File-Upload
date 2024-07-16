import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Step5 = ({ updateProgress }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    updateProgress();
    const step1Data = JSON.parse(localStorage.getItem("step1"));
    const step2Data = JSON.parse(localStorage.getItem("step2"));
    const step3Data = JSON.parse(localStorage.getItem("step3"));
    const step4Data = JSON.parse(localStorage.getItem("step4"));
    setData({ ...step1Data, ...step2Data, ...step3Data, ...step4Data });
  }, [updateProgress]);

  // Function for handling submit operation
  const handleSubmit = async () => {
    try {
      // Check for existing email
      const response = await axios.get("http://localhost:3000/registrations", {
        params: { email: data.email },
      });
      if (response.data.length > 0) {
        toast.error("Email address already registered");
        return;
      } else {
        await axios.post("http://localhost:3000/registrations", data);
        toast.success("Registration successful");
        localStorage.removeItem("step1");
        localStorage.removeItem("step2");
        localStorage.removeItem("step3");
        localStorage.removeItem("step4");
        navigate("/");
      }
    } catch (error) {
      console.error("Error saving registration data", error);
      toast.error("Error saving registration data");
    }
  };

  // Function for handling previous operation
  const handlePrevious = () => {
    navigate("/step4");
  };

  return (
    <div>
      <h4>Confirm Your Details</h4>
      <Row>
        <Col>
          <p>
            <strong>First Name:</strong> {data.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {data.lastName}
          </p>
          <p>
            <strong>Mobile Phone:</strong> {data.mobilePhone}
          </p>
          <p>
            <strong>Email Address:</strong> {data.email}
          </p>
          <p>
            <strong>Gender:</strong> {data.gender}
          </p>
          <p>
            <strong>Date of Birth:</strong> {data.dateOfBirth}
          </p>
          <p>
            <strong>Address:</strong> {data.address}
          </p>
          <p>
            <strong>Degree:</strong> {data.degree}
          </p>
          <p>
            <strong>University:</strong> {data.university}
          </p>
          <p>
            <strong>Year of Passing:</strong> {data.yearOfPassing}
          </p>
          <p>
            <strong>Percentage:</strong> {data.percentage}
          </p>
          <p>
            <strong>Organisation Name:</strong> {data.organisationName}
          </p>
          <p>
            <strong>Company Address:</strong> {data.companyAddress}
          </p>
          <p>
            <strong>Years Worked:</strong> {data.yearsWorked}
          </p>
          <p>
            <strong>Designation:</strong> {data.designation}
          </p>
          <p>
            <strong>Profile picture:</strong> <br />
            {data.photo && (
              <img
                src={data.photo}
                alt="Profile"
                style={{ maxWidth: "100px" }}
              />
            )}
          </p>
        </Col>
      </Row>
      <div className="button-container">
        <Button variant="secondary" onClick={handlePrevious} className="mr-2">
          Previous
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default Step5;
