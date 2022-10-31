import { Heading, Flex, Button, Image, Text, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link, useParams } from 'react-router-dom';

const SingleCountry = () => {
  const [singleCountry, setSingleCountry] = useState();

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
                  <Flex flexDir="row" justifyContent="space-around" gap="10px">
                    <Image src={country.flags.png} />
                    <Flex>
                      <Flex flexDir="column">
                        <Heading as="h5" fontSize="20px">
                          {country.name.common}
                        </Heading>
                        <Text>
                          Native name: {country.name.nativeName.official}
                        </Text>
                        <Text>Population : {country.population}</Text>
                        <Text>Region: {country.region}</Text>
                        <Text>Sub Region: {country.subregion}</Text>
                        <Text>Capital: {country.capital}</Text>
                      </Flex>
                      <Flex flexDir="column">
                        <Text>Top Level Domain: {country.tld}</Text>
                        <Text>
                          Currencies:{' '}
                          {countryCurrency.map(currency => {
                            return currency.name;
                          })}
                        </Text>
                        <Text>
                          Lenguages:{' '}
                          {Object.values(countryLenguage).map(leng => {
                            return `${leng} `;
                          })}
                          .
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex paddingTop="30px" flexDir="column">
                    {country.borders !== undefined && (
                      <Text>
                        Border Countries:{' '}
                        {country?.borders?.map(border => {
                          return <Button margin="0 5px 0 5px">{border}</Button>;
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
