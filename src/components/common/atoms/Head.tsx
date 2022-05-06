import NextHead from 'next/head'

type Props = { title: string }

export default function Head({ title }: Props) {
  return (
    <NextHead>
      <title>WhatAnime | {title}</title>
    </NextHead>
  )
}
