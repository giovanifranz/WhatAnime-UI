const IS_BROWSER = false

export const setupMocks = async () => {
  if (!IS_BROWSER) {
    const { worker } = await import('./browser')
    worker.start()
  } else {
    const { server } = await import('./server')
    server.listen()
  }
}
