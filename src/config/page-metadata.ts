import type { Metadata } from "next";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | HaatLoop`,
      description,
      url: path,
      siteName: "HaatLoop",
      type: "website",
      locale: "en_IN",
    },
  };
}
