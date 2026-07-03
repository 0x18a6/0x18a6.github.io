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
    { label: "Writings", href: "/writings" },
    { label: "About", href: "/about" },
  ],
}

export type SideyConfigType = typeof sideyConfig
