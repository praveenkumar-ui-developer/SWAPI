
import React from 'react';
import { Box, Flex, Text, Button, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="purple.700" px={4} py={2} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <RouterLink to="/">
          <Text fontSize="xl" fontWeight="bold" color="white">
          Star Wars API
          </Text>
        </RouterLink>
        <Flex alignItems="center">
          <RouterLink to="/">
            <Button
              as={Link}
              variant="outline"
              colorScheme="whiteAlpha"
              size="sm"
              ml={4}
            >
              Home
            </Button>
          </RouterLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
