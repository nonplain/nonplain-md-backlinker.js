import nodePath from 'path';
import Files, { Metadata, FileData } from 'nonplain';

import { collectAllLinks } from './utils/context';
import { BacklinkerOptions, MatchedLinkWithContext } from './types';

export default function backlinker(files: Files, options?: BacklinkerOptions) {
  const defaultKeyFn = (directory: string, path: string): string => {
    const fullLinkPath = nodePath.join(directory, path);
    const { dir, name } = nodePath.parse(fullLinkPath);
    return nodePath.join(dir, name);
  };

  const { keyFn = defaultKeyFn, metadataProperty = 'backlinks', context: contextOptions } = options || {};

  const backlinksMap: Record<string, any> = files
    .reduce((backlinks: Record<string, any>, { body, metadata }: FileData) => {
      const { file: { dir } } = metadata;

      collectAllLinks(body, contextOptions).forEach(({
        link,
        ...context
      }: MatchedLinkWithContext) => {
        const { path } = link;
        const key = keyFn(dir, path);

        let backlinkObj = { ...metadata };
        if (Object.keys(context).length) {
          backlinkObj = {
            ...backlinkObj,
            context,
          };
        }

        backlinks[key] = backlinks[key] || [];
        backlinks[key].push(backlinkObj);
      });

      return backlinks;
    }, {});

  files.transform({
    metadata: {
      [metadataProperty]: ({ file }: Metadata) => backlinksMap[keyFn(file.dir, file.name)] || [],
    },
  });
}
