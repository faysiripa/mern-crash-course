'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import { Toaster } from './toaster'

export function Provider({ children }) {
  return (
    <ChakraProvider>
      <ColorModeProvider>
        {children}
        <Toaster />
      </ColorModeProvider>
    </ChakraProvider>
  )
}
