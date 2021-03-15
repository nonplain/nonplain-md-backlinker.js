import Link, { regex } from 'nonplain-md-link';

import {
  ContextNumberOrOptions,
  MatchedLink,
  MatchedLinkWithContext,
  WordsFromIndexOptions,
} from '../types';

function getWordsFromIndex(options: WordsFromIndexOptions): string {
  const {
    content,
    startIndex,
    numWords,
    backward = false,
  } = options;

  let index = startIndex;
  if (backward) {
    index--;
  }

  const words = [];
  let wordBuf: string[] = [];
  let wordCount = 0;
  let isOverflown = index < 0 || index >= content.length;

  const addWord = () => {
    if (wordBuf.length > 0) {
      let word = wordBuf.join('');
      if (backward) {
        word = wordBuf.reverse().join('');
      }

      words.push(word);
      wordBuf = [];

      wordCount++;
    }
  };

  while (wordCount < numWords && !isOverflown) {
    const currChar = content[index];

    const isNewline = /(\n|\r)/.test(currChar);
    const isSpace = /\s/.test(currChar);
    if (isSpace || isNewline) {
      addWord();

      if (isNewline) {
        words.push('\n');
      }
    } else {
      wordBuf.push(currChar);
    }

    if (backward) {
      index--;
    } else {
      index++;
    }

    isOverflown = index < 0 || index >= content.length;
    if (isOverflown) {
      addWord();
    }
  }

  let result = words.join(' ');
  if (backward) {
    result = words.reverse().join(' ');
  }

  result = result
    .replace(/\s\n/g, '\n')
    .replace(/\n\s/g, '\n')
    .replace(/\s\s/g, ' ');

  return result;
}

const collectAllLinksWithContext = (
  content: string,
  context?: ContextNumberOrOptions,
): MatchedLinkWithContext[] => {
  const contextNumber = typeof context === 'number' ? context : 10;
  const contextObject = typeof context === 'object' ? context : {};
  const contextOptions = {
    after: contextNumber,
    before: contextNumber,
    delimiter: '...',
    ...contextObject,
  };

  const pattern = new RegExp(regex.links.all);
  pattern.lastIndex = 0;
  const matches: MatchedLinkWithContext[] = [];

  const delinkedContent = content.replace(
    new RegExp(regex.links.all),
    (l: string) => new Link(l).innerText,
  );

  let delinkedOffset = 0;
  let curr = pattern.exec(content);
  while (curr !== null) {
    const match = curr[0];
    const { index } = curr;

    const link = new Link(match);
    const { innerText } = link;

    const delinkedIndex = index - delinkedOffset;
    const delinkedLastIndex = delinkedIndex + innerText.length;
    delinkedOffset += (match.length - innerText.length);

    let before = getWordsFromIndex({
      content: delinkedContent,
      startIndex: delinkedIndex,
      numWords: contextOptions.before,
      backward: true,
    });
    before = contextOptions.delimiter + before;

    let after = getWordsFromIndex({
      content: delinkedContent,
      startIndex: delinkedLastIndex,
      numWords: contextOptions.after,
    });
    if (!(after.endsWith('.') || after.endsWith('\n'))) {
      after += contextOptions.delimiter;
    }

    const space = ' ';
    const full = (
      before
      + space
      + innerText
      + space
      + after
    );

    matches.push({
      match,
      index,
      link,
      before,
      innerText,
      after,
      full,
    });

    curr = pattern.exec(content);
  }

  pattern.lastIndex = 0;

  return matches;
};

export const collectAllLinks = (
  content: string,
  context?: ContextNumberOrOptions,
): MatchedLink[] | MatchedLinkWithContext[] => {
  if (context) {
    return collectAllLinksWithContext(content, context);
  }

  return Link.collectAllLinksFromContent(content).map((link) => ({ link }));
};
