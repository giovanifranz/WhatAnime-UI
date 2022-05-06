import { SiPaypal } from 'react-icons/si'
import Link from 'next/link'

function Paypal() {
  return (
    <Link href="https://www.paypal.com/donate/?hosted_button_id=KJ9TK628E7N42">
      <a className="flex w-24 h-24 p-4 bg-slate-100 text-zinc-400 rounded-[50%] hover:bg-yellow-300 hover:text-zinc-700 transition">
        <SiPaypal size="60px" />
      </a>
    </Link>
  )
}

export { Paypal }
