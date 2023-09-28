import React, { useEffect, useState } from 'react';
import './App.css';
import { GridLayout } from './components/GridLayout';
import styled from 'styled-components';
import { Spacer, StyledHeader, StyledSubHeader } from './styles';

const AppWrapper = styled.div`
  max-width: 1248px;
`

const App = () => {
  const [images, setImages] = useState();

  useEffect(() => {
    fetch('images?limit=10')
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        setImages(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className='app'>
      <AppWrapper>
        <Spacer />
        <StyledHeader>Motorway UI Test</StyledHeader>
        <Spacer />
        <StyledSubHeader>Click on any image to find out more</StyledSubHeader>
        <Spacer />
        {images &&
          ( <GridLayout images={images} /> )
        }
      </AppWrapper>
    </div>
  );
}

export default App;
