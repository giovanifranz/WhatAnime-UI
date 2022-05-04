import { ButtonBackTo } from 'components'

export default function NotFound() {
  return (
    <section className="w-9/12 max-h-screen mx-auto items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center mb-6">
        Page not found:
        <br />
        404
      </h1>
      <ButtonBackTo to="search" />
    </section>
  )
}
