import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const today = new Date();
const year = today.getFullYear();

const Step2 = ({ updateProgress }) => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    degree: "",
    university: "",
    yearOfPassing: "",
    percentage: "",
  });

  // Effect for patching input data onto form fields when 'previous' button is clicked
  useEffect(() => {
    const savedValues = JSON.parse(localStorage.getItem("step2"));
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
    degree: Yup.string().required("Degree is required"),
    university: Yup.string()
      .required("University is required")
      .min(2, "University name is too short")
      .max(100, "University name is too long")
      .matches(
        /^[a-zA-Z\s,.'-]{2,100}$/,
        "University name contains invalid characters"
      ),
    yearOfPassing: Yup.number()
      .required("Year of Passing is required")
      .typeError("Must be a number")
      .min(1900, "Year of Passing must be at least 1900")
      .max(year, `Year of Passing cannot be greater than ${year}.`),
    percentage: Yup.number()
      .required("Percentage is required")
      .typeError("Must be a number")
      .min(0, "Percentage cannot be less than 0.")
      .max(100, "Percentage cannot be more than 100."),
  });

  // Function for handling save operation
  const handleSave = (values) => {
    localStorage.setItem("step2", JSON.stringify(values));
    toast.success("Step 2 data saved");
  };

  // Function for handling submit operation
  const handleSubmit = (values) => {
    handleSave(values);
    navigate("/step3");
  };

  // Function for handling previous operation
  const handlePrevious = () => {
    navigate("/step1");
  };

  return (
    <>
      <h4>Education Details</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, validateForm, values }) => (
          <Form as={BootstrapForm}>
            <BootstrapForm.Group controlId="degree">
              <BootstrapForm.Label>Degree</BootstrapForm.Label>
              <Field as="select" name="degree" className="form-control">
                <option value="">Select Degree</option>
                <option value="BE">BE</option>
                <option value="ME">ME</option>
                <option value="MCA">MCA</option>
                <option value="MCS">MCS</option>
              </Field>
              <ErrorMessage
                name="degree"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="university">
              <BootstrapForm.Label>University</BootstrapForm.Label>
              <Field name="university" type="text" className="form-control" />
              <ErrorMessage
                name="university"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="yearOfPassing">
              <BootstrapForm.Label>Year of Passing</BootstrapForm.Label>
              <Field
                name="yearOfPassing"
                type="text"
                className="form-control"
              />
              <ErrorMessage
                name="yearOfPassing"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="percentage">
              <BootstrapForm.Label>Percentage</BootstrapForm.Label>
              <Field name="percentage" type="text" className="form-control" />
              <ErrorMessage
                name="percentage"
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

export default Step2;
