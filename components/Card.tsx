import { Box, BoxProps, Divider, Text } from '@chakra-ui/core'
import { formatNumber } from '../utils/number'

interface CardProps extends BoxProps {
  title?: string
  description?: string | number
}

const Card = ({ title = 'test', description, children, ...rest }: CardProps): JSX.Element => {
  return (
    <Box p={2} shadow="sm" borderWidth="1px" rounded="lg" w="auto" {...rest}>
      <Text textAlign="center" fontSize={['xs', 'sm', 'md']}>
        {title}
      </Text>
      <Divider />
      <Text textAlign="center" fontSize={['md', '2xl', '4xl']} fontWeight="medium">
        {typeof description === 'number' ? formatNumber(description) : description}
      </Text>
      {children}
    </Box>
  )
}

export default Card
