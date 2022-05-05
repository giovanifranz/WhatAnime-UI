import { setupServer } from 'msw/node'

import { handlers } from './handlers/jikan'

export const server = setupServer(...handlers)
