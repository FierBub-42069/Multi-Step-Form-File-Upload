import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Step4 = ({ updateProgress }) => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({ photo: null });
  const [preview, setPreview] = useState(null);

  // Effect for patching input data onto form field when 'previous' button is clicked
  useEffect(() => {
    const savedValues = JSON.parse(localStorage.getItem("step4"));
    if (savedValues) {
      setInitialValues(savedValues);
      if (savedValues.photo) {
        setPreview(savedValues.photo);
      }
    }
  }, []);

  // Effect for updating progress bar
  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  // Validation schema for photo
  const validationSchema = Yup.object().shape({
    photo: Yup.mixed().required("Photo is required"),
  });

  // Function for handling save operation
  const handleSave = (values) => {
    localStorage.setItem("step4", JSON.stringify(values));
    toast.success("Step 4 data saved");
  };

  // Function for handling submit operation
  const handleSubmit = (values) => {
    handleSave(values);
    navigate("/step5");
  };

  // Function for handling previous operation
  const handlePrevious = () => {
    navigate("/step3");
  };

  // Function for handling photo change
  const handlePhotoChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setFieldValue("photo", reader.result);
        setPreview(reader.result);
        onChange({ photo: reader.result });
      };
      reader.readAsDataURL(file);
      toast.success("Profile photo uploaded successfully.");
    } else {
      toast.error("Unable to upload photo");
    }
  };

  return (
    <>
      <h4>Upload Photo</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, validateForm, setFieldValue, values }) => (
          <Form as={BootstrapForm}>
            <BootstrapForm.Group controlId="photo">
              <BootstrapForm.Label>Upload Profile Photo</BootstrapForm.Label>
              <Field
                name="photo"
                type="file"
                value={(event) => handlePhotoChange(event, setFieldValue)}
                className="form-control"
                onChange={(event) => handlePhotoChange(event, setFieldValue)}
              />
              <ErrorMessage
                name="photo"
                component="div"
                className="text-danger"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{ marginTop: "10px", maxWidth: "100px" }}
                />
              )}
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

export default Step4;
