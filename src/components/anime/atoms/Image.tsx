import NextImage from 'next/image'

interface Props {
  imageUrl: string
  title: string
}

export default function Image({ imageUrl, title }: Props) {
  return (
    <NextImage src={imageUrl} alt={title} height={310} width={225} layout="responsive" className="mb-11" />
  )
}
