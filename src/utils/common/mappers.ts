import slugify from 'slugify'

export function formatText(text: string): string {
  return text.replace(/[^0-9a-zA-Z]+/g, '').toLowerCase()
}

export function formatSlug(text: string): string {
  return slugify(text, { lower: true, strict: true })
}
