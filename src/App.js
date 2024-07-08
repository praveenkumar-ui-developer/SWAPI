// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
      <Navbar/>
      <Box p={5} bg="black" minH="100vh">
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
