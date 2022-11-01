import {
  Box,
  color,
  Flex,
  Heading,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import React from 'react';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [smallerThan425] = useMediaQuery('(max-width: 425px)');
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      h="70px"
      paddingTop={smallerThan425 ? '20px' : ''}
      boxShadow="base"
    >
      <Heading
        fontSize={smallerThan425 ? '20px' : '30px'}
        padding="0 15px 0 15px"
      >
        Where in the world?
      </Heading>
      <Flex
        justify="center"
        alignItems="center"
        padding="0 10px 0 5px"
        onClick={toggleColorMode}
      >
        {colorMode === 'light' ? (
          <SunIcon fontSize="21px" cursor="pointer" />
        ) : (
          <MoonIcon fontSize="20px" cursor="pointer" />
        )}
        <Text
          paddingLeft="10px"
          fontSize="18px"
          paddingRight="20px"
          cursor="pointer"
        >
          {colorMode === 'light' ? 'Dark mode' : 'Light mode'}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
