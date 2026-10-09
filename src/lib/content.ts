import { getCollection, type CollectionKey } from 'astro:content';

/** A labelled link; rendered by LinkButton, which infers the icon from the URL unless given */
export interface Link {
  name: string;
  url: string;
  /** Font Awesome name, e.g. "brands/github" */
  icon?: string;
}

/** A collection's entries in their `order` */
export async function getSorted<C extends CollectionKey>(collection: C) {
  return (await getCollection(collection)).sort((a, b) => a.data.order - b.data.order);
}

/** Plain-text summary for meta descriptions: about `max` characters, cut at a word boundary */
export function excerpt(text: string, max = 155) {
  const plain = text.replace(/\s+/g, ' ').trim();
  return plain.length > max ? plain.slice(0, plain.lastIndexOf(' ', max - 3)) + '…' : plain;
}

/** Shared by a LEGO card's title and its page's h1, so the title morphs between them */
export const legoTransitionName = (id: string) => `view-transition-name: lego-${id}`;
