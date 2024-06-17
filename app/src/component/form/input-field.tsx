import{ forwardRef, useRef } from 'react'
import {
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Text,
  useMergeRefs
} from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface InputFieldProps extends InputProps {
  icon?: IconType
  name?: string
}
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const mergeRef = useMergeRefs(inputRef, ref)

  return (
    <FormControl>
      <FormLabel>
        <Text>{props.name}</Text>
      </FormLabel>
      <InputGroup>
        {props.icon && (
          <InputLeftElement pointerEvents="none">
            <Icon as={props.icon} color="gray.300" />
          </InputLeftElement>
        )}
        <Input
          focusBorderColor="purple.700"
          borderColor="#7180963e"
          _placeholder={{ color: '#718096' }}
          autoFocus
          {...props}
          ref={mergeRef}
        />
      </InputGroup>
    </FormControl>
  )
})

InputField.displayName = 'InputField'
