import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text, Flex, IconButton, Spinner } from '@chakra-ui/react';
import CharacterCard from './CharacterCard';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    const storedFavorites = JSON.parse(localStorage.getItem('liked')) || [];
    setFavorites(storedFavorites);
    console.log("Stored Favorites:", storedFavorites);
    setLoading(false);
  }, []);

  const removeFavorite = (character) => {
    const updatedFavorites = favorites.filter(fav => fav.name !== character.name);
    setFavorites(updatedFavorites);
    localStorage.setItem('liked', JSON.stringify(updatedFavorites));
  };

  const leftArrow = () => {
    if (!loading && page > 1) {
      setPage(page - 1);
    }
  };

  const rightArrow = () => {
    if (!loading && page < Math.ceil(favorites.length / itemsPerPage)) {
      setPage(page + 1);
    }
  };

  const paginatedFavorites = favorites.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box p={5} minH="100vh">
      <Text fontWeight="bold" color="purple.700" fontSize="2xl" mb={5}>Favorite Characters</Text>
      {loading ? (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" color="purple.500" />
        </Flex>
      ) : (
        <><Flex mt={4} justifyContent="center">
        {page !== 1 && (
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={leftArrow}
            disabled={loading}
            mr={2}
            colorScheme="pink"
            variant="outline"
          />
        )}
        <Text mx={2} fontWeight="bold" color="purple.700">Page {page}</Text>
        {page < Math.ceil(favorites.length / itemsPerPage) && (
          <IconButton
            icon={<ArrowForwardIcon />}
            onClick={rightArrow}
            disabled={loading}
            ml={2}
            colorScheme="pink"
            variant="outline"
          />
        )}
      </Flex>
          <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="10px">
            {paginatedFavorites.length > 0 ? paginatedFavorites.map((char, index) => (
              <CharacterCard
                key={index}
                char={char}
                isFavorite={true}
                toggleFavorite={() => removeFavorite(char)}
              />
            )) : <Text>No favorite characters yet.</Text>}
          </SimpleGrid>
          <Flex mt={4} justifyContent="center">
            {page !== 1 && (
              <IconButton
                icon={<ArrowBackIcon />}
                onClick={leftArrow}
                disabled={loading}
                mr={2}
                colorScheme="pink"
                variant="outline"
              />
            )}
            <Text mx={2} fontWeight="bold" color="purple.700">Page {page}</Text>
            {page < Math.ceil(favorites.length / itemsPerPage) && (
              <IconButton
                icon={<ArrowForwardIcon />}
                onClick={rightArrow}
                disabled={loading}
                ml={2}
                colorScheme="pink"
                variant="outline"
              />
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default FavoriteList;
