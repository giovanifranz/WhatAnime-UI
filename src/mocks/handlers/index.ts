import { handlers as jikanHandlers } from './jikan'
import { handlers as quoteHandlers } from './quote'

export const handlers = [...jikanHandlers, ...quoteHandlers]
