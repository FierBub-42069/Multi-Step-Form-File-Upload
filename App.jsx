import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, ProgressBar } from "react-bootstrap";
import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";
import Step3 from "./Components/Step3";
import Step4 from "./Components/Step4";
import Step5 from "./Components/Step5";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [progress, setProgress] = useState(0);

  // Function for updating progress bar
  const updateProgress = () => {
    const stepsCompleted = ["step1", "step2", "step3", "step4"].reduce(
      (acc, step) => {
        if (localStorage.getItem(step)) {
          return acc + 1;
        }
        return acc;
      },
      0
    );
    setProgress((stepsCompleted / 4) * 100);
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <h1>Registration Form</h1>
          <p style={{ textAlign: "center" }}>
            <span className="progress-label">
              Progress:{" "}
              {progress}
              %
            </span>
          </p>
          <ProgressBar
            now={progress}
            label={`${progress}%`}
            style={{ marginBottom: "20px" }}
          />
          <Routes>
            <Route
              path="/step1"
              element={<Step1 updateProgress={updateProgress} />}
            />
            <Route
              path="/step2"
              element={<Step2 updateProgress={updateProgress} />}
            />
            <Route
              path="/step3"
              element={<Step3 updateProgress={updateProgress} />}
            />
            <Route
              path="/step4"
              element={<Step4 updateProgress={updateProgress} />}
            />
            <Route
              path="/step5"
              element={<Step5 updateProgress={updateProgress} />}
            />
            <Route
              path="/"
              element={<Step1 updateProgress={updateProgress} />}
            />
          </Routes>
        </Container>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
