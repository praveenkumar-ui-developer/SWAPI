
import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text, Flex, IconButton, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const fetchCharacters = async (page) => {
    const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
    setCharacters(response.data.results);
    setLoading(false);
  };

  const toggleFavorite = (character) => {
    const updatedFavorites = favorites.includes(character)
      ? favorites.filter(fav => fav !== character)
      : [...favorites, character];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);
  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );
  }
  return (
    <Box p={5} bgGradient="" minH="100vh">
       <Flex mt={0} justifyContent="center">
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          mr={2}
          colorScheme="purple"
          variant="outline"
          
        />
        <Text mx={2} fontWeight="bold" color="purple.700">Page {page}</Text>
        <IconButton
          icon={<ArrowForwardIcon />}
          onClick={() => setPage(page + 1)}
          disabled={characters.length < 10}
          ml={2}
          colorScheme="purple"
          variant="outline"
        />
      </Flex>
      <SimpleGrid columns={[1, 2, 3,4,5]} spacing="10px">  {/* Adjusted spacing here */}
        {characters.map((char, index) => (
          <CharacterCard
            key={index}
            char={char}
            isFavorite={favorites.includes(char.name)}
            toggleFavorite={() => toggleFavorite(char.name)}
          />
        ))}
      </SimpleGrid>
      <Flex mt={5} justifyContent="center">
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          mr={2}
          colorScheme="purple"
          variant="outline"
        />
        <Text mx={2} fontWeight="bold" color="purple.700">Page {page}</Text>
        <IconButton
          icon={<ArrowForwardIcon />}
          onClick={() => setPage(page + 1)}
          disabled={characters.length < 10}
          ml={2}
          colorScheme="purple"
          variant="outline"
        />
      </Flex>
    </Box>
  );
};

export default CharacterList;
