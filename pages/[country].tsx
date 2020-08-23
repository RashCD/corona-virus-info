import { Button, Flex, Icon, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/core'
import { subDays } from 'date-fns'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import Card from '../components/Card'
import api from '../utils/api'

interface IListOfCountries {
  Country: string
  Slug: string
  ISO2: string
}

interface ICountryData {
  Country: string
  CountryCode: string
  Province: string
  City: string
  CityCode: string
  Lat: string
  Lon: string
  Confirmed: number
  Deaths: number
  Recovered: number
  Active: number
  Date: string
}

const CountryInfo = (props: { data: ICountryData[]; country: string }): JSX.Element => {
  const { Active, Confirmed, Deaths, Recovered }: ICountryData = props.data[0]
  const router = useRouter()
  const [inputCountry, setInputCountry] = useState(props.country)

  const handleClick = (e: MouseEvent<HTMLButtonElement> | FormEvent) => {
    e.preventDefault()
    router.push(inputCountry)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitizeWord = e.target.value.split(' ').join('-')
    setInputCountry(sanitizeWord)
  }

  return (
    <Flex minH="100vh" direction="column">
      <Head>
        <title>Covid 19 Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex w="full" h="40vh" bg="blue.300" boxShadow="xl" justify="center" align="flex-end" py={8}>
        <Stack>
          <form onSubmit={handleClick}>
            <InputGroup w="xs">
              <Input
                placeholder="Search By Country"
                value={inputCountry}
                onChange={handleOnChange}
              />
              <InputRightElement>
                <Button onClick={handleClick}>
                  <Icon name="search-2" />
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
        </Stack>
      </Flex>
      <Stack
        isInline
        spacing={3}
        w="full"
        flex={1}
        py={10}
        justify="center"
        align="center"
        flexWrap="wrap"
      >
        <Card title="Active" description={Active} />
        <Card title="Confirmed" description={Confirmed} />
        <Card title="Deaths" description={Deaths} />
        <Card title="Recovered" description={Recovered} />
      </Stack>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const dayBeforeISO = subDays(new Date(), 1).toISOString()
  const twoDayBeforeISO = subDays(new Date(), 2).toISOString()

  const countryData = await api.get<ICountryData[]>(
    `/country/${params?.country}?from=${twoDayBeforeISO}&to=${dayBeforeISO}`
  )

  return {
    props: {
      data: countryData,
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
