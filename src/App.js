import React, { useEffect, useState } from "react";
import "./App.css";
import { GridLayout } from "./components/GridLayout";
import styled from "styled-components";
import { Spacer, StyledHeader, StyledSubHeader } from "./styles";
import { Loader } from "semantic-ui-react";
import { ContactForm } from "./components/ContactForm";

const AppWrapper = styled.div`
  max-width: 1248px;
`;

const FormWrapper = styled.div`
  max-width: 600px;
`;

const App = () => {
  const [images, setImages] = useState();

  useEffect(() => {
    fetch("images?limit=10")
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setImages(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (!images) return <Loader active inline="centered" />;

  return (
    <div className="app">
      <AppWrapper>
        <Spacer />
        <StyledHeader>Motorway UI Test</StyledHeader>
        <Spacer />
        <StyledSubHeader>Click on any image to find out more</StyledSubHeader>
        <Spacer />
        <GridLayout images={images} />
        <FormWrapper>
          <Spacer />
          <StyledSubHeader>Fill in the form below</StyledSubHeader>
          <Spacer />
          <ContactForm />
        </FormWrapper>
      </AppWrapper>
    </div>
  );
};

export default App;
