import nodePath from 'path';
import { Metadata, FileData, Files } from 'nonplain';
import { Link } from 'nonplain-md-link';

import { BacklinkerOptions } from './types';

export default function backlinker(files: Files, options?: BacklinkerOptions) {
  const defaultKeyFn = (dir: string, name: string): string => nodePath.join(dir, name);

  const { keyFn = defaultKeyFn } = options || {};

  const backlinksMap: Record<string, any> = files
    .reduce((backlinks: Record<string, any>, { body, metadata }: FileData) => {
      const { file: { dir } } = metadata;

      Link.collectAllLinksFromContent(body).forEach(({ path: linkPath }: Link) => {
        const key = keyFn(dir, linkPath);

        backlinks[key] = backlinks[key] || [];
        backlinks[key].push({ ...metadata });
      });

      return backlinks;
    }, {});

  files.transform({
    metadata: {
      backlinks: ({ file }: Metadata) => backlinksMap[keyFn(file.dir, file.name)] || [],
    },
  });
}
