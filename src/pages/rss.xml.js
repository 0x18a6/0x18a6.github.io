import rss from "@astrojs/rss"

import { getNotes, getWritings } from "@utils/getContent"
import { config } from "@parseConfig"

export async function GET(context) {
  const [writings, notes] = await Promise.all([getWritings(), getNotes()])
  const items = [
    ...writings.map((writing) => ({
      title: writing.data.title,
      description: writing.data.description,
      link: `/writings/${writing.id}`,
      pubDate: writing.data.date,
    })),
    ...notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      link: `/notes/${note.id}`,
      pubDate: note.data.date,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: context.site,
    items,
    customData: `<language>${config.site.locale}</language>`,
  })
}
