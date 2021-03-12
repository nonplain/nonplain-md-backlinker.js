import nodePath from 'path';
import { Metadata, FileData, Files } from 'nonplain';
import { Link } from 'nonplain-md-link';

import { BacklinkerOptions } from './types';

export default function backlinker(files: Files, options?: BacklinkerOptions) {
  const defaultKeyFn = (directory: string, path: string): string => {
    const fullLinkPath = nodePath.join(directory, path);
    const { dir, name } = nodePath.parse(fullLinkPath);
    return nodePath.join(dir, name);
  };

  const { keyFn = defaultKeyFn, metadataProperty = 'backlinks' } = options || {};

  const backlinksMap: Record<string, any> = files
    .reduce((backlinks: Record<string, any>, { body, metadata }: FileData) => {
      const { file: { dir } } = metadata;

      Link.collectAllLinksFromContent(body).forEach(({ path }: Link) => {
        const key = keyFn(dir, path);

        backlinks[key] = backlinks[key] || [];
        backlinks[key].push({ ...metadata });
      });

      return backlinks;
    }, {});

  files.transform({
    metadata: {
      [metadataProperty]: ({ file }: Metadata) => backlinksMap[keyFn(file.dir, file.name)] || [],
    },
  });
}
