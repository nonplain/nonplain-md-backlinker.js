import Link from 'nonplain-md-link';

export type ContextNumberOrOptions = number | {
  after?: number;
  before?: number;
  delimiter?: string;
};

export type BacklinkerOptions = {
  keyFn?: (directory: string, path: string) => string;
  metadataProperty?: string;
  context?: ContextNumberOrOptions;
};

export type WordsFromIndexOptions = {
  content: string;
  startIndex: number;
  numWords: number;
  backward?: boolean;
};

export type MatchedLink = {
  link: Link;
};

export type MatchedLinkWithContext = MatchedLink & {
  before?: string;
  innerText?: string;
  after?: string;
  full?: string;
  index?: number;
  match?: string;
};
