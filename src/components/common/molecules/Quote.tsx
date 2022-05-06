import { memo } from 'react'
import { useRandomAnimeQuote } from 'hooks/useQuote'

import { ButtonQuote } from '../atoms/ButtonQuote'

export function QuoteComponent() {
  const { isError, isLoading, data } = useRandomAnimeQuote()

  if (isError || isLoading || !data) {
    return null
  }
  const { id } = data

  return (
    <section className="relative h-40 p-2 bg-yellow-300 rounded w-36 md:w-64">
      <p className="w-full text-lg italic font-light line-clamp-3">“{data.quote}”</p>
      <div className="absolute flex items-center justify-between w-full pr-2 bottom-1">
        <div className="flex flex-col justify-between w-2/3 h-12 md:w-3/4">
          <h4 className="text-lg font-bold line-clamp-1">“{data.character}”</h4>
          <p className="text-lg line-clamp-1">“{data.title}”</p>
        </div>
        {id && <ButtonQuote id={id} />}
      </div>
    </section>
  )
}

const Quote = memo(QuoteComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))
export default Quote
