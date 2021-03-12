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

  test('generates backlinks for files using a custom keyFn', async () => {
    const glob = path.join(__dirname, './fixtures/files/src/**/*.md');
    const files = await new Files().load(glob);

    let called = false;
    const customKeyFn = (directory: string, linkPath: string): string => {
      called = true;

      const fullLinkPath = path.join(directory, linkPath);
      const { dir, name } = path.parse(fullLinkPath);

      return path.join(dir, name);
    };
    backlinker(files, { keyFn: customKeyFn });

    const backlinksMap: Record<string, any> = {};
    files.collect().forEach((file) => backlinksMap[file.metadata.name] = file.metadata.backlinks);
    expect(backlinksMap).toEqual(expectedBacklinks);
    expect(called).toBeTruthy();
  });

  test('generates backlinks for files using a custom metadataProperty', async () => {
    const glob = path.join(__dirname, './fixtures/files/src/**/*.md');
    const files = await new Files().load(glob);

    const customProperty = 'custom';
    backlinker(files, { metadataProperty: customProperty });

    const backlinksMap: Record<string, any> = {};
    files.collect().forEach((file) => backlinksMap[file.metadata.name] = file.metadata[customProperty]);
    expect(backlinksMap).toEqual(expectedBacklinks);
  });
});
