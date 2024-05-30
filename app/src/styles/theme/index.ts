import { extendTheme } from '@chakra-ui/react'

import { colors } from './foundations/colors'
import { config } from './foundations/config'
import { fonts } from './foundations/fonts'
import { radii } from './foundations/radii'

const customTheme = extendTheme({
  radii,
  fonts,
  colors,
  config
})

export default customTheme
