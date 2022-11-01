import {
  Heading,
  Flex,
  Button,
  Image,
  Text,
  Box,
  Tag,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link, useParams } from 'react-router-dom';

const SingleCountry = () => {
  const [singleCountry, setSingleCountry] = useState();
  const [smallerThan425] = useMediaQuery('(max-width: 425px)');
  const [smallerThan768] = useMediaQuery('(max-width: 768px)');

  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const dataJson = await data.json();
      setSingleCountry(dataJson);
    };
    fetchData();
  }, []);

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Flex w="90%" flexDir="column">
          <Link to="/">
            <Button w="6em" marginTop="30px">
              <ArrowBackIcon />
              Back
            </Button>
          </Link>
          {singleCountry &&
            singleCountry.map((country, index) => {
              const countryLenguage = country.languages;
              const getKeyCurrency = country.currencies;
              const countryCurrency = Object.values(getKeyCurrency);

              return (
                <Box key={index} paddingTop="55px">
                  <Flex
                    flexDir={smallerThan768 ? 'column' : 'row'}
                    justifyContent="space-around"
                    gap="10px"
                    alignItems={smallerThan425 ? 'center' : 'center'}
                  >
                    <Image
                      src={country.flags.png}
                      w={smallerThan425 ? 'auto' : '22em'}
                      h={smallerThan425 ? 'auto' : '20em'}
                      objectPosition="center"
                    />
                    <Flex
                      alignItems={smallerThan425 ? 'flex-start' : 'center'}
                      justifyContent="center"
                      paddingLeft="15px"
                      flexDir={smallerThan425 ? 'column' : 'row'}
                      gap={smallerThan425 ? '10px' : ''}
                    >
                      <Flex
                        flexDir="column"
                        alignItems="flex-start"
                        justifyContent="center"
                        gap="10px"
                      >
                        <Heading as="h5" fontSize="25px" paddingBottom="20px">
                          {country.name.common}
                        </Heading>
                        <Text>
                          <Tag>Native name :</Tag>{' '}
                          {country.name.nativeName.official}
                        </Text>
                        <Text>
                          <Tag>Population :</Tag> {country.population}
                        </Text>
                        <Text>
                          <Tag>Region:</Tag> {country.region}
                        </Text>
                        <Text>
                          <Tag>Sub Region:</Tag> {country.subregion}
                        </Text>
                        <Text>
                          <Tag>Capital:</Tag> {country.capital}
                        </Text>
                      </Flex>
                      <Flex
                        flexDir="column"
                        gap="10px"
                        alignItems="flex-start"
                        justifyContent="center"
                      >
                        <Text>
                          <Tag>Top Level Domain:</Tag> {country.tld}
                        </Text>
                        <Text>
                          <Tag>Currencies:</Tag>{' '}
                          {countryCurrency.map(currency => {
                            return currency.name;
                          })}
                        </Text>
                        <Text>
                          <Tag>Lenguages:</Tag>{' '}
                          {Object.values(countryLenguage).map(leng => {
                            return `${leng} `;
                          })}
                          .
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex paddingTop="40px" flexDir="column">
                    {country.borders !== undefined && (
                      <Text>
                        Border Countries:{' '}
                        {country?.borders?.map((border, index) => {
                          return (
                            <Button margin="5px 5px 5px 5px" key={index}>
                              {border}
                            </Button>
                          );
                        })}
                      </Text>
                    )}
                  </Flex>
                </Box>
              );
            })}
        </Flex>
      </Flex>
    </>
  );
};

export default SingleCountry;
