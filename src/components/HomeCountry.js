import {
  Box,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  SimpleGrid,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const HomeCountry = () => {
  const [countryData, setCountryData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [dataComplete, setDataComple] = useState(null);

  const [smallerThan425] = useMediaQuery('(max-width: 425px)');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://restcountries.com/v3.1/all');
      const dataJson = await data.json();
      setCountryData(dataJson);
      setFilteredData(dataJson);
      setDataComple(dataJson);
    };
    fetchData();
  }, []);

  const filter = v => {
    const keyword = v.target.value;
    if (keyword !== '') {
      const filtering = countryData.filter(country => {
        return country.name.common
          .toLowerCase()
          .startsWith(keyword.toLowerCase());
      });
      setDataComple(filtering);
    } else {
      setDataComple(countryData);
    }
  };

  const selectOption = v => {
    const region = v.target.value;

    const filterRegion = filteredData.filter(country => {
      return country.region.toLowerCase().startsWith(region.toLowerCase());
    });
    setCountryData(filterRegion);
    setDataComple(filterRegion);
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center" paddingTop="40px">
        <Flex w="95%" flexDir="column">
          <Flex
            justifyContent="space-between"
            flexDir={smallerThan425 ? 'column' : 'row'}
          >
            <Box>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.500" />}
                />
                <Input
                  type="text"
                  placeholder="Search for a country..."
                  w="17em"
                  onChange={filter}
                ></Input>
              </InputGroup>
            </Box>
            <Box>
              <InputGroup>
                <InputRightElement pointerEvents="none" />
                <Select
                  w="10em"
                  placeholder="Filter by Region"
                  onChange={selectOption}
                >
                  <option value="africa">Africa</option>
                  <option value="america">America</option>
                  <option value="asia">Asia</option>
                  <option value="europe">Europe</option>
                  <option value="oceania">Oceania</option>
                </Select>
              </InputGroup>
            </Box>
          </Flex>
          <SimpleGrid columns={[1, 2, 3]} spacing="30px" paddingTop="25px">
            {dataComplete?.map((country, index) => {
              return (
                <Link key={index} to={`country/${country?.name?.common}`}>
                  <Box boxShadow="base" h="290px" rounded="10px">
                    <Image
                      rounded="10px 10px 0 0"
                      src={country?.flags?.png}
                      h="158px"
                      objectFit="cover"
                      objectPosition="center"
                      w="100%"
                    />
                    <Flex flexDir="column" padding="10px">
                      <Heading as="h5" fontSize="20px">
                        {country?.name?.common}
                      </Heading>
                      <Text>Population: {country?.population}</Text>
                      <Text>Region: {country?.region}</Text>
                      <Text>Capital: {country?.capital}</Text>
                    </Flex>
                  </Box>
                </Link>
              );
            })}
            <Outlet />
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
};

export default HomeCountry;
