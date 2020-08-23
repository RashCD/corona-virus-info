import { Flex, Icon, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/core'
import Head from 'next/head'
import Card from '../components/Card'

export default function Home(): JSX.Element {
  return (
    <Flex minH="100vh" direction="column">
      <Head>
        <title>Covid 19 Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex w="full" h="40vh" bg="blue.300" boxShadow="xl" justify="center" align="flex-end" py={8}>
        <Stack>
          <InputGroup w="xs">
            <Input placeholder="Search By Country" />
            <InputRightElement>
              <Icon name="search-2" />
            </InputRightElement>
          </InputGroup>
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
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Stack>
    </Flex>
  )
}
