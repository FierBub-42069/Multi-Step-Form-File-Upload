import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Form as BootstrapForm, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Step1 = ({ updateProgress }) => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    mobilePhone: "",
    emailAddress: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  // Effect for patching input data onto form fields when 'previous' button is clicked
  useEffect(() => {
    const savedValues = JSON.parse(localStorage.getItem("step1"));
    if (savedValues) {
      setInitialValues(savedValues);
    }
  }, []);

  // Effect for updating progress bar upon successful submission of forms in each individual step
  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  // Validation Schema for form validation
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required.")
      .matches(
        /^[A-Za-z]+$/,
        "First Name must contain only alphabets and no spaces"
      ),
    lastName: Yup.string()
      .required("Last Name is required.")
      .matches(
        /^[A-Za-z]+$/,
        "Last Name must contain only alphabets and no spaces"
      ),
    mobilePhone: Yup.string()
      .required("Mobile Phone is required.")
      .matches(
        /^\d{10}$/,
        "Mobile Phone must be exactly 10 digits with no spaces"
      ),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email address is required.")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address."),
    gender: Yup.string().required("Gender is required."),
    dateOfBirth: Yup.date()
      .required("Date of Birth is Required.")
      .max(new Date(), "Date of Birth cannot be in the future."),
    address: Yup.string()
      .required("Address is required.")
      .min(10, "Address is too short")
      .max(100, "Address is too long")
      .matches(
        /^[a-zA-Z0-9\s,.'-]{10,100}$/,
        "Address contains invalid characters"
      ),
    password: Yup.string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm Password is required."),
  });

  // Function for handling save operation
  const handleSave = (values) => {
    localStorage.setItem("step1", JSON.stringify(values));
    toast.success("Step 1 data saved.");
  };

  // Function for handling submit operation
  const handleSubmit = (values, { setSubmitting }) => {
    handleSave(values);
    setSubmitting(false);
    navigate("/step2");
  };

  return (
    <>
      <h4>User Information</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, validateForm, values }) => (
          <Form as={BootstrapForm}>
            <BootstrapForm.Group controlId="firstName">
              <BootstrapForm.Label>First Name</BootstrapForm.Label>
              <Field name="firstName" type="text" className="form-control" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="lastName">
              <BootstrapForm.Label>Last Name</BootstrapForm.Label>
              <Field name="lastName" type="text" className="form-control" />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="mobilePhone">
              <BootstrapForm.Label>Mobile Phone</BootstrapForm.Label>
              <Field
                name="mobilePhone"
                type="number"
                className="form-control"
              />
              <ErrorMessage
                name="mobilePhone"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="email">
              <BootstrapForm.Label>Email Address</BootstrapForm.Label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="gender">
              <BootstrapForm.Label>Gender</BootstrapForm.Label>
              <div role="group" aria-labelledby="gender-group">
                <Field
                  type="radio"
                  name="gender"
                  value="Male"
                  id="male"
                ></Field>
                <label htmlFor="male">Male</label>
                <Field
                  type="radio"
                  name="gender"
                  value="Female"
                  id="female"
                  className="ml-2"
                ></Field>
                <label htmlFor="female">Female</label>
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="dateOfBirth">
              <BootstrapForm.Label>Date of Birth</BootstrapForm.Label>
              <Field name="dateOfBirth" type="date" className="form-control" />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="address">
              <BootstrapForm.Label>Address</BootstrapForm.Label>
              <Field name="address" as="textarea" className="form-control" />
              <ErrorMessage
                name="address"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="password">
              <BootstrapForm.Label>Password</BootstrapForm.Label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="confirmPassword">
              <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
              <Field
                name="confirmPassword"
                type="password"
                className="form-control"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <div className="button-container">
              <Button
                variant="secondary"
                onClick={() => navigate("/")}
                className="mr-2"
              >
                Previous
              </Button>
              <Button
                variant="dark"
                type="button"
                onClick={() =>
                  validateForm().then((errors) => {
                    if (Object.keys(errors).length === 0) {
                      handleSave(values);
                    } else {
                      toast.error("Please correct the errors before saving");
                    }
                  })
                }
                className="mr-2"
              >
                Save
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Next
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Step1;
