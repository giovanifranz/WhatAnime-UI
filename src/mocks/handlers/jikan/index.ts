import { rest } from 'msw'

import byId from './byId.json'
import byName from './byName.json'
import ranking from './ranking.json'

function generateResource(path?: string) {
  return `${process.env.NEXT_PUBLIC_JIKAN_API_URL}/${path || ''}`
}

export const handlers = [
  rest.get(generateResource('anime?q=$naruto&order_by=score&&sort=desc'), (_, res, ctx) =>
    res(ctx.delay(1000), ctx.status(200), ctx.json(byName)),
  ),
  rest.get(generateResource('anime/21'), (_, res, ctx) =>
    res(ctx.delay(1000), ctx.status(200), ctx.json(byId)),
  ),
  rest.get(generateResource('top/anime?filter=airing'), (_, res, ctx) =>
    res(ctx.delay(1000), ctx.status(200), ctx.json(ranking)),
  ),
]
