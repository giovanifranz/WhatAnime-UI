import { createServer, Model } from 'miragejs'

import { jikan, quote } from './handlers'

export function makeServer() {
  const server = createServer({
    models: {
      anime: Model.extend({}),
    },

    routes() {
      this.urlPrefix = 'http://localhost:3000'
      this.namespace = 'api'
      this.timing = 750

      this.get('/anime/:id', () => jikan.byId)

      this.get('/anime', () => jikan.byName)

      this.get('/top/anime', () => jikan.ranking)

      this.get('/random', () => quote.random)

      this.get('/quotes/anime?title=:title', () => quote.byTitle)

      this.namespace = ''
      this.passthrough()
    },
  })
  return server
}
