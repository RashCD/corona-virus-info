import { Box, BoxProps, Divider, Text } from '@chakra-ui/core'

interface CardProps extends BoxProps {
  title?: string
  description?: string | number
}

const Card = ({ title = 'test', description, ...rest }: CardProps): JSX.Element => {
  return (
    <Box p={2} shadow="sm" borderWidth="1px" w="sm" minW={20} minH={20} {...rest}>
      <Text textAlign="center" fontSize="md">
        {title}
      </Text>
      <Divider />
      <Text textAlign="center" fontSize="6xl" fontWeight="medium">
        {description}
      </Text>
    </Box>
  )
}

export default Card
