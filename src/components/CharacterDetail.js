import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Text, Image, Flex, Spinner, Grid, IconButton, Divider } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
      const filmResponses = await Promise.all(
        response.data.films.map(film => axios.get(film))
      );
      const filmTitles = filmResponses.map(filmResponse => filmResponse.data.title);
      setCharacter({ ...response.data, filmTitles });
      setLoading(false);
    };
    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );
  }

  return (
    <Flex justify="center" align="center" p={4}>
      <Box
        width={{ base: '90%', md: '80%', lg: '40%' }} // width based on screen size
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="xl"
        bg="transparant"
        p={6}
        textAlign="center"
        position="relative"
        _hover={{ boxShadow: "2xl",  }}
      >
        <Box 
          position="absolute"
          top="-5px"
          left="-5px"
          right="0"
          bottom="0"
          bgGradient="radial(purple.500, transparent)"
          borderRadius="lg"
          zIndex="0"
          transform="scale(1.1)"
        />
        <Box position="relative" zIndex="1">
          <Flex mb={4} alignItems="center">
            <Link to="/">
              <IconButton icon={<ArrowBackIcon />} colorScheme="pink" variant="outline" aria-label="Go back" />
            </Link>
          </Flex>
          <Flex justify="center" mb={4}>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
              alt={character.name}
            />
          </Flex>
          <Text 
            fontSize="2xl" 
            fontWeight="bold" 
            color="pink.300" 
            mb={4} 
            textShadow="4px 2px 6px rgba(128, 0, 128, 0.6)"
          >
            {character.name}
          </Text>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
            <Box>
              <Text color="gray.200">Height: {character.height} cm</Text>
              <Text color="gray.200">Mass: {character.mass} kg</Text>
              <Text color="gray.200">Hair Color: {character.hair_color}</Text>
              
              
            </Box>
            <Box>
            <Text color="gray.200">Eye Color: {character.eye_color}</Text>
              <Text color="gray.200">Birth Year: {character.birth_year}</Text>
              <Text color="gray.200">Gender: {character.gender}</Text>
            </Box>
            
          </Grid>
          <Text color="gray.200">Skin Color: {character.skin_color}</Text>
          <Divider mt={4} mb={4} />
          <Box>
            <Text fontSize="xl" fontWeight="bold" color="pink.300" mb={2}>Movies</Text>
            {character.filmTitles.map((title, index) => (
              <Text key={index} color="gray.200">{title}</Text>
            ))}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default CharacterDetail;
