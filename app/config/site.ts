export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "smry",
  description:
    "An open source paywall bypass site with instant ai summaries, inspired by 12ft.io and 1ft.io",
  url: `${process.env.NEXT_PUBLIC_URL}`,
  ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    twitter: "https://twitter.com/michael_chomsky",
    github: "https://github.com/mrmps/SMRY",
  },
};
