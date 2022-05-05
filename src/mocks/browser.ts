import { setupWorker } from 'msw'

import { handlers } from './handlers/jikan'

export const worker = setupWorker(...handlers)
