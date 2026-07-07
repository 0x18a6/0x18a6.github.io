// sidey.config.ts

export const sideyConfig = {
  site: {
    title: "0x18a6",
    description: "Personal site of 0x18a6.",
    url: "https://0x18a6.github.io",
    author: "0x18a6",
    locale: "en",
  },

  navigation: [
    { label: "Home", href: "/" },
    { label: "Audits", href: "/audits" },
    { label: "Writings", href: "/writings" },
    { label: "Notes", href: "/notes" },
    { label: "RSS", href: "/rss.xml" },
  ],
}

export type SideyConfigType = typeof sideyConfig
