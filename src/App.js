import React, { useEffect, useState } from 'react';
import './App.css';
import { GridLayout } from './components/GridLayout';
import styled from 'styled-components';

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
      {images &&
      <GridLayout images={images} />}
      </AppWrapper>
    </div>
  );
}

export default App;
