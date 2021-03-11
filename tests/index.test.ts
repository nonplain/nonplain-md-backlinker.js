/* eslint-disable */

/* @ts-ignore */
import path from 'path';
import { Files } from 'nonplain';

import { backlinker } from '../dist';

import { expectedBacklinks } from './fixtures/files/expected';

describe('Backlinker', () => {
  test('generates backlinks for files', async () => {
    const glob = path.join(__dirname, './fixtures/files/src/**/*.md');
    const files = await new Files().load(glob);

    backlinker(files);

    const backlinksMap: Record<string, any> = {};
    files.collect().forEach((file) => backlinksMap[file.metadata.name] = file.metadata.backlinks);
    expect(backlinksMap).toEqual(expectedBacklinks);
  });
});
