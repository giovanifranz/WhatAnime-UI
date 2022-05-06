import { memo } from 'react'
import { useRandomAnimeQuote } from 'hooks/useQuote'

import { Button } from './Button'

export function QuoteComponent() {
  const { isError, isLoading, data } = useRandomAnimeQuote()

  if (isError || isLoading || !data) {
    return null
  }
  const { id } = data

  return (
    <section className="relative w-48 h-40 p-2 bg-yellow-300 rounded md:w-60 lg:w-64">
      <p className="w-full text-lg italic font-light line-clamp-3">“{data.quote}”</p>
      <div className="absolute flex items-center justify-between w-full pr-2 bottom-1">
        <div className="flex flex-col justify-between w-3/4 h-12">
          <h4 className="text-lg font-bold line-clamp-1">“{data.character}”</h4>
          <p className="text-lg line-clamp-1">“{data.title}”</p>
        </div>
        {id && <Button id={id} />}
      </div>
    </section>
  )
}

const Quote = memo(QuoteComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))
export default Quote
