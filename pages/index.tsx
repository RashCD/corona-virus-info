import { Flex, Text } from '@chakra-ui/core'
import Head from 'next/head'
import { WorldMap } from 'react-svg-worldmap'
import CountryInput from '../components/CountryInput'
import MapContainer from '../components/MapContainer'

export default function Home(): JSX.Element {
  const mapData = [
    { country: 'cn', value: 1 }, // china
    { country: 'in', value: 2 }, // india
    { country: 'us', value: 3 }, // united states
  ]

  return (
    <Flex minH="100vh" direction="column">
      <Head>
        <title>Covid 19 Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        w="100vw"
        h="100vh"
        bg="blue.300"
        justifyContent="center"
        alignItems="center"
        direction="column"
        pos="relative"
      >
        <Flex pos="absolute" top={0} w="full" alignItems="center" direction="column">
          <Text fontSize={['2xl', '4xl', '6xl']} fontWeight={700}>
            COVID19 INFO
          </Text>
          <Text fontSize={['md', 'lg', 'xl']}>All The Info You Will Ever Need</Text>
        </Flex>
        <MapContainer>
          <WorldMap valuePrefix="population" size="lg" data={mapData} />
        </MapContainer>
        <CountryInput />
      </Flex>
    </Flex>
  )
}
