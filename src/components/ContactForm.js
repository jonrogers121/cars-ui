import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import { Spacer } from "../styles";

const FormField = styled.div`
  font-family: sans-serif;
  label,
  span {
    color: white;
  }
  input {
    margin-top: 8px;
    height: 40px;
    width: 100%;
  }
  margin-bottom: 16px;
`;

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    colour: "",
    salary: 0,
    timeAllowed: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.colour) newErrors.colour = "Favourite colour is required";
    if (!formData.timeAllowed.trim())
      newErrors.timeAllowed = "Time allowed is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      console.log("Form Data:", formData);
      alert("Form submitted successfully!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <label>Name:</label>
        <input
          data-testid="name-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
      </FormField>
      <FormField>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
      </FormField>
      <FormField>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
        />
        {errors.dob && <div style={{ color: "red" }}>{errors.dob}</div>}
      </FormField>
      <FormField>
        <label>Favourite Colour:</label>
        <input
          type="color"
          name="colour"
          value={formData.colour}
          onChange={handleInputChange}
        />
        {errors.colour && <div style={{ color: "red" }}>{errors.colour}</div>}
      </FormField>
      <FormField>
        <label>Salary:</label>
        <input
          type="range"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
          min="0"
          max="100000"
        />
        <span>£{formData.salary}</span>
      </FormField>
      <FormField>
        <label>Time Allowed:</label>
        <input
          type="text"
          name="timeAllowed"
          value={formData.timeAllowed}
          onChange={handleInputChange}
        />
        {errors.timeAllowed && (
          <div style={{ color: "red" }}>{errors.timeAllowed}</div>
        )}
      </FormField>
      <Button type="submit">Submit</Button>
      <Spacer />
    </form>
  );
};
