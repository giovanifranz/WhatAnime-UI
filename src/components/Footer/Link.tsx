import { memo, ReactNode } from 'react'
import NextLink from 'next/link'

interface Props {
  children: ReactNode
  href: string
}

function LinkComponent({ children, href }: Props) {
  return (
    <NextLink href={href} passHref>
      <a className="h-14 w-14 flex p-1 rounded-lg bg-slate-100 text-zinc-400 hover:bg-yellow-300 hover:text-zinc-700 transition">
        {children}
      </a>
    </NextLink>
  )
}

const Link = memo(LinkComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Link }
export type { Props as LinkProps }
