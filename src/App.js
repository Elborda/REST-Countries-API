import { Heading } from '@chakra-ui/react';
import HomeCountry from './components/HomeCountry';
import SingleCountry from './components/SingleCountry';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeCountry />} />
        <Route path="country/:name" element={<SingleCountry />} />
      </Routes>
    </>
  );
}

export default App;
