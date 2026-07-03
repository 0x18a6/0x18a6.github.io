// src/utils/getContent.ts

import { getCollection } from "astro:content"
import type { CollectionKey, CollectionEntry } from "astro:content"

type AnyEntry = CollectionEntry<CollectionKey>

const sortByDateDesc = (a: Date, b: Date) => b.getTime() - a.getTime()
const excludeDrafts = (item: AnyEntry) => !item.data.draft

export async function getContent<T extends CollectionKey>(
  collection: T,
  options: {
    drafts?: boolean
    sort?: boolean
  } = {}
) {
  const { drafts = false, sort = true } = options
  const items = await getCollection(collection)
  const filtered = drafts ? items : items.filter(excludeDrafts)

  return sort
    ? filtered.sort((a, b) =>
        sortByDateDesc(
          "date" in a.data ? (a.data.date ?? new Date(0)) : new Date(0),
          "date" in b.data ? (b.data.date ?? new Date(0)) : new Date(0)
        )
      )
    : filtered
}

export const getPages = () => getContent("pages", { sort: false })
export const getWritings = () => getContent("writings")
