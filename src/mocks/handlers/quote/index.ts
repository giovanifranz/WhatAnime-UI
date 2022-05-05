import { rest } from 'msw'

import byTitle from './byTitle.json'
import random from './random.json'

function generateResource(path?: string) {
  return `${process.env.NEXT_PUBLIC_ANIMECHAN_API_URL}/${path || ''}`
}

export const handlers = [
  rest.get(generateResource('quotes/anime?title=gintama'), (req, res, ctx) =>
    res(ctx.delay(1000), ctx.status(200), ctx.json(byTitle)),
  ),
  rest.get(generateResource('random'), (req, res, ctx) =>
    res(ctx.delay(1000), ctx.status(200), ctx.json(random)),
  ),
]
