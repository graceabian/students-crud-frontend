import React, { useState } from "react";
import StudentDataService from "../services/StudentService";

const AddStudent = () => {
  const initialStudentState = {
    id: null,
    name: "",
    age: "",
    gender: "",
  };
  const [student, setStudent] = useState(initialStudentState);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const saveStudent = () => {
    var data = {
      name: student.name,
      age: student.age,
      gender: student.gender,
    };

    StudentDataService.create(data)
      .then((response) => {
        setStudent({
          id: response.data.id,
          name: response.data.name,
          age: response.data.age,
          gender: response.data.gender,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          let customMessage = "Please fill the mandatory details: \n";
          const errors = error.response.data.message;
          for (var i = 0; i < errors.length; i++) {
            customMessage += errors[i];
          }
          setErrorMessage(customMessage);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const newStudent = () => {
    setStudent(initialStudentState);
    setSubmitted(false);
    setErrorMessage("");
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Student details submitted successfully!</h4>
          <button className="btn btn-success" onClick={newStudent}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={student.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              required
              value={student.age}
              onChange={handleInputChange}
              name="age"
            />
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="gender">Gender</label> &nbsp; &nbsp;
            <input
              type="radio"
              value="male"
              id="male"
              onChange={handleInputChange}
              name="gender"
            />{" "}
            <label for="male">Male</label>&nbsp; &nbsp;
            <input
              type="radio"
              value="female"
              id="female"
              onChange={handleInputChange}
              name="gender"
            />{" "}
            <label for="female">Female</label>
          </div>
          <br></br>
          <button onClick={saveStudent} className="btn btn-success">
            Submit
          </button>{" "}
          <p></p>
          <div className="alert alert-light">
            <p className="error text-danger"> {errorMessage} </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
