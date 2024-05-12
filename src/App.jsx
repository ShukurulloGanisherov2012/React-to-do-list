import React, { useState } from 'react';
import { Stack, Image } from 'react-bootstrap';
import Card from "./components/Card"
import './App.css';

function App() {
  const [isLightMode, setIsLightMode] = useState(true);
  const handleModeChange = (mode) => {
      setIsLightMode(mode);
  };

  return (
    <Stack className='main'>
      <Image className='img' src={isLightMode ? "/light.jpg" : "/dark.jpg"} />
      <Stack className='d-flex align-items-center justify-content-start'>
        <Card onModeChange={handleModeChange} isLightMode={isLightMode} />
      </Stack>
    </Stack>
  );
}

export default App;
