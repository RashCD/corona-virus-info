import { Button, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'

type CountryInputProps = {
  defaultCountry?: string
}

const CountryInput = ({ defaultCountry }: CountryInputProps): JSX.Element => {
  const router = useRouter()
  const [inputCountry, setInputCountry] = useState(defaultCountry)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement> | FormEvent) => {
    e.preventDefault()
    router.push(inputCountry ?? '')
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const smallCap = e.target.value.toLowerCase()
    const sanitizeWord = smallCap.split(' ').join('-')
    setInputCountry(sanitizeWord)
  }

  return (
    <form onSubmit={handleClick}>
      <InputGroup w={['15rem', '20rem', '25rem']} size="lg">
        <Input placeholder="Search By Country" value={inputCountry} onChange={handleOnChange} />
        <InputRightElement>
          <Button onClick={handleClick} size="lg">
            <Icon name="search-2" />
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  )
}

export default CountryInput
