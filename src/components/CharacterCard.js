import React from 'react';
import { Box, Text, Image, Flex, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const CharacterCard = ({ char, isFavorite, toggleFavorite }) => {
  return (
    <Box
      p={4}
      shadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg=""
      _hover={{ boxShadow: "2xl", transform: "scale(1.05)", transition: "all 0.3s ease-in-out" }}
      maxW="sm"
      m="auto"
      margin={2}
    >
      <Flex direction="column" align="center">
        <Box position="relative" mb={4}>
          <Box
            position="absolute"
            top="0"
            left="0"
            right="5"
            bottom="5"
            borderRadius="full"
            bgGradient="radial(purple.500,white)"
            zIndex="0"
            transform="scale(1.2)"
          />
          <Link to={`/character/${char.url.split('/').slice(-2, -1)[0]}`}>
          <Image
            borderRadius="full"
            boxSize="150px"
            src={`https://starwars-visualguide.com/assets/img/characters/${char.url.split('/').slice(-2, -1)[0]}.jpg`}
            alt={char.name}
            position="relative"
            zIndex="1"
            _hover={{ 
              transform: "rotate(5deg)", 
              
              transition: "transform 0.3s ease-in-out"
               }}
          />
          </Link>
        </Box>
        <Link to={`/character/${char.url.split('/').slice(-2, -1)[0]}`}>
          <Text mb={2} fontWeight="bold" fontSize="xl" color="purple.700"   textShadow="4px 2px 6px rgba(200, 0, 128, 0.6)">{char.name}</Text>
        </Link>
        <IconButton
          icon={isFavorite ? <FaHeart /> : <FaRegHeart />}
          onClick={toggleFavorite}
          colorScheme={isFavorite ? 'red' : 'purple'}
          variant="outline"
          aria-label="Add to favorites"
          mt={2}
          borderColor='white'
          _hover={{ bg: isFavorite ? "red.500" : "purple.500", color: "white", transition: "background-color 0.3s ease-in-out" }}
        />
      </Flex>
    </Box>
  );
};

export default CharacterCard;
