import { Box, BoxProps, Divider, Text } from '@chakra-ui/core'
import { formatNumber } from '../utils/number'

interface CardProps extends BoxProps {
  title?: string
  description?: string | number
}

const Card = ({ title = 'test', description, children, ...rest }: CardProps): JSX.Element => {
  return (
    <Box p={2} shadow="sm" borderWidth="1px" rounded="lg" w="auto" minW="2xs" minH={20} {...rest}>
      <Text textAlign="center" fontSize="md">
        {title}
      </Text>
      <Divider />
      <Text textAlign="center" fontSize="6xl" fontWeight="medium">
        {typeof description === 'number' ? formatNumber(description) : description}
      </Text>
      {children}
    </Box>
  )
}

export default Card
