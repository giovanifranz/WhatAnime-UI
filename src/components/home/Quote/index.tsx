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
    <section className="h-40 w-48 md:w-60 lg:w-64 bg-yellow-300 rounded p-2 relative">
      <p className="w-full font-light italic text-lg line-clamp-3 ">“{data.quote}”</p>
      <div className="flex justify-between items-center bottom-1 absolute w-full pr-2">
        <div className="flex flex-col h-12 w-3/4 justify-between">
          <h4 className="text-lg font-bold line-clamp-1">“{data.character}”</h4>
          <p className="line-clamp-1 text-lg">“{data.title}”</p>
        </div>
        {id && <Button id={id} />}
      </div>
    </section>
  )
}

const Quote = memo(QuoteComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))
export default Quote
