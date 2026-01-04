'use client'

import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

const listeners = []

// eslint-disable-next-line react-refresh/only-export-components
export const toaster = {
  create: (opts = {}) => listeners.forEach((fn) => fn(opts)),
}

export const Toaster = () => {
  const toast = useToast()

  useEffect(() => {
    const handler = (opts) => {
      toast({
        title: opts.title,
        description: opts.description,
        status: opts.type || 'info',
        duration: opts.duration ?? 5000,
        isClosable: Boolean(opts.closable),
        position: opts.position || 'bottom-right',
      })
    }

    listeners.push(handler)
    return () => {
      const idx = listeners.indexOf(handler)
      if (idx !== -1) listeners.splice(idx, 1)
    }
  }, [toast])

  return null
}
