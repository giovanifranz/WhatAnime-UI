import { ButtonBackTo } from 'components/common/atoms'

export function NotFoundTemplate() {
  return (
    <section className="flex flex-col justify-center w-full h-full my-32 align-middle gap-6">
      <h1 className="text-3xl font-bold text-center">
        Page not found:
        <br />
        404
      </h1>
      <ButtonBackTo to="search" />
    </section>
  )
}
