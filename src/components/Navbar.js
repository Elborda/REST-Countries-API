import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';
import React from 'react';

const Navbar = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      h="70px"
      boxShadow="base"
    >
      <Heading fontSize="30px" padding="0 15px 0 15px">
        Where in the world?
      </Heading>
      <Flex justify="center" alignItems="center" padding="0 10px 0 5px">
        <SunIcon fontSize="25px" />
        <Text paddingLeft="10px" fontSize="18px">
          Dark Mode
        </Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
