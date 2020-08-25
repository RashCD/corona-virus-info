import {
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/core'
import styled from '@emotion/styled'
import CountryPopulation from 'country-json/src/country-by-population.json'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import { WorldMap } from 'react-svg-worldmap'
import Card from '../components/Card'
import api from '../utils/api'
import { formatDate } from '../utils/date'
import { formatNumber } from '../utils/number'

interface IListOfCountries {
  Country: string
  Slug: string
  ISO2: string
}

interface ICovidStat {
  NewConfirmed: number
  TotalConfirmed: number
  NewDeaths: number
  TotalDeaths: number
  NewRecovered: number
  TotalRecovered: number
}

interface ICountriesStat extends ICovidStat {
  Country: string
  CountryCode: string
  Slug: string
  Date: string
}

interface ISummaryData {
  Global: ICovidStat
  Countries: ICountriesStat[]
}

type CountryPopType = {
  country: string
  population: number | null
}

const FlexContainer = styled(Flex)`
  div > svg {
    position: absolute;
    top: -50px;
    left: calc(calc(100vw / 2) - calc(500px / 2));
  }
`

const CountryInfo = (props: { data: ICountriesStat[]; country: string }): JSX.Element => {
  const {
    NewConfirmed,
    NewDeaths,
    NewRecovered,
    TotalConfirmed,
    TotalDeaths,
    TotalRecovered,
    Date: DateLatest,
  } = props.data[0]
  const router = useRouter()
  const [inputCountry, setInputCountry] = useState(props.country)

  const countryPop = (CountryPopulation as CountryPopType[]).filter((data) =>
    new RegExp(data.country, 'gi').test(props.data[0].Country)
  )

  const countryPopFormat = formatNumber(countryPop[0].population ?? 0)

  const MapData = [{ country: props.data[0].CountryCode, value: countryPopFormat }]

  const stylingFunction = () => {
    return {
      fill: 'red',
      fillOpacity: 1,
      stroke: 'black',
      strokeWidth: 1,
      strokeOpacity: 0.2,
      cursor: 'pointer',
    }
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement> | FormEvent) => {
    e.preventDefault()
    router.push(inputCountry)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const smallCap = e.target.value.toLowerCase()
    const sanitizeWord = smallCap.split(' ').join('-')
    setInputCountry(sanitizeWord)
  }

  const StackComponent: React.FC = ({ children }): JSX.Element => {
    return (
      <Stack
        isInline
        spacing={3}
        w="full"
        flex={1}
        py={5}
        justify="center"
        align="center"
        flexWrap="wrap"
      >
        {children}
      </Stack>
    )
  }

  return (
    <Flex minH="100vh" direction="column">
      <Head>
        <title>Covid 19 Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FlexContainer
        w="full"
        h="40vh"
        bg="blue.300"
        boxShadow="sm"
        justify="center"
        align="flex-end"
        pt={8}
        mb={5}
        pos="relative"
      >
        {MapData && (
          <WorldMap
            valuePrefix="population"
            size="lg"
            data={MapData}
            styleFunction={stylingFunction}
          />
        )}
        <Stack boxShadow="md" pos="absolute" bottom={-48 / 2}>
          <form onSubmit={handleClick}>
            <InputGroup w="xs" size="lg">
              <Input
                placeholder="Search By Country"
                value={inputCountry}
                onChange={handleOnChange}
              />
              <InputRightElement>
                <Button onClick={handleClick} size="lg">
                  <Icon name="search-2" />
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
        </Stack>
      </FlexContainer>
      <StackComponent>
        <Card title="New Confirmed" description={NewConfirmed} />
        <Card title="New Deaths" description={NewDeaths} />
        <Card title="New Recovered" description={NewRecovered} pos="relative">
          <Text
            pos="absolute"
            right={-30}
            bottom={-30}
            fontSize="sm"
            color="gray.600"
            fontStyle="italic"
          >
            * Date as of {formatDate(DateLatest)}
          </Text>
        </Card>
      </StackComponent>
      <Divider w="80%" display="flex" alignSelf="center" />
      <StackComponent>
        <Card title="Total Confirmed" description={TotalConfirmed} />
        <Card title="Total Deaths" description={TotalDeaths} />
        <Card title="Total Recovered" description={TotalRecovered} />
      </StackComponent>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const summaryData = await api.get<ISummaryData>('/summary')
  const selectedCountry = summaryData.Countries.filter(
    (country) => country.Slug === params?.country
  )

  return {
    props: {
      data: selectedCountry,
      country: params?.country,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const listOfCountries = await api.get<IListOfCountries[]>('/countries')

  return {
    paths: listOfCountries.map(({ Slug }) => ({
      params: { country: Slug },
    })),
    fallback: false,
  }
}

export default CountryInfo
