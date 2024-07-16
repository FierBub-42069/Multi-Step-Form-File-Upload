import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Step3 = ({ updateProgress }) => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    organisationName: "",
    companyAddress: "",
    yearsWorked: "",
    designation: "",
  });

  // Effect for patching input data onto form fields when 'previous' button is clicked
  useEffect(() => {
    const savedValues = JSON.parse(localStorage.getItem("step3"));
    if (savedValues) {
      setInitialValues(savedValues);
    }
  }, []);

  // Effect for updating progress bar
  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  // Validation schema
  const validationSchema = Yup.object().shape({
    organisationName: Yup.string()
      .required("Organisation Name is required")
      .min(2, "Organization name is too short")
      .max(50, "Organization name is too long")
      .matches(
        /^[a-zA-Z0-9\s,.'-]{2,50}$/,
        "Organization name contains invalid characters"
      ),
    companyAddress: Yup.string()
      .required("Company Address is required")
      .min(10, "Company Address is too short")
      .max(100, "Company Address is too long")
      .matches(
        /^[a-zA-Z0-9\s,.'-]{10,100}$/,
        "Company Address contains invalid characters"
      ),
    yearsWorked: Yup.number()
      .required("Years Worked is required")
      .typeError("Must be a number")
      .min(0, "Years worked cannot be negative")
      .max(50, "Years worked seems too high"),
    designation: Yup.string()
      .required("Designation is required")
      .min(2, "Designation is too short")
      .max(50, "Designation is too long")
      .matches(
        /^[a-zA-Z\s,.'-]{2,50}$/,
        "Designation contains invalid characters"
      ),
  });

  // Function for handling save operation
  const handleSave = (values) => {
    localStorage.setItem("step3", JSON.stringify(values));
    toast.success("Step 3 data saved");
  };

  // Function for handling submit operation
  const handleSubmit = (values) => {
    handleSave(values);
    navigate("/step4");
  };

  // Function for handling previous operation
  const handlePrevious = () => {
    navigate("/step2");
  };

  return (
    <>
      <h4>Work Experience</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, validateForm, values }) => (
          <Form as={BootstrapForm}>
            <BootstrapForm.Group controlId="organisationName">
              <BootstrapForm.Label>Organisation Name</BootstrapForm.Label>
              <Field
                name="organisationName"
                type="text"
                className="form-control"
              />
              <ErrorMessage
                name="organisationName"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="companyAddress">
              <BootstrapForm.Label>Company Address</BootstrapForm.Label>
              <Field
                name="companyAddress"
                type="text"
                className="form-control"
              />
              <ErrorMessage
                name="companyAddress"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="yearsWorked">
              <BootstrapForm.Label>Years Worked</BootstrapForm.Label>
              <Field name="yearsWorked" type="text" className="form-control" />
              <ErrorMessage
                name="yearsWorked"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="designation">
              <BootstrapForm.Label>Designation</BootstrapForm.Label>
              <Field name="designation" type="text" className="form-control" />
              <ErrorMessage
                name="designation"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <div className="button-container">
              <Button
                variant="secondary"
                onClick={handlePrevious}
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

export default Step3;
