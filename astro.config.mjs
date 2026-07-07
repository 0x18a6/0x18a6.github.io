// @ts-check
import { defineConfig } from "astro/config"

// integrations
import tailwindcss from "@tailwindcss/vite"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

// Remark Rehype Plugins
import { unified } from "@astrojs/markdown-remark"
import rehypeExternalLinks from "rehype-external-links"
import rehypeLightbox from "./src/plugins/rehype-lightbox.mjs"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

// Sidey Config
import { sideyConfig } from "./sidey.config.ts"

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-light",
    },
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        rehypeLightbox,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: ["heading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: ["noopener", "noreferrer", "external"],
          },
        ],
      ],
    }),
  },
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  site: sideyConfig.site.url,
  vite: {
    plugins: [tailwindcss()],
  },
})
