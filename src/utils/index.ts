export function isDevEnvironment() {
  return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_API_MOCKING === 'dev'
}
