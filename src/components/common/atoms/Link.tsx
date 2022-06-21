import { memo, PropsWithChildren } from 'react'
import NextLink from 'next/link'

interface Props {
  href: string
}

function LinkComponent({ href, children }: PropsWithChildren<Props>) {
  return (
    <NextLink href={href} passHref>
      <a className="flex p-1 rounded-lg h-14 w-14 bg-slate-100 text-zinc-400 dark:text-neutral-800 hover:bg-yellow-300 hover:text-neutral-800 transition">
        {children}
      </a>
    </NextLink>
  )
}

const Link = memo(LinkComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Link }
export type { Props as LinkProps }
