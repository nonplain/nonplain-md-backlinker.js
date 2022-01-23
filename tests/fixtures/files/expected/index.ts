import path from 'path';

const srcDir = path.join(__dirname, '../src');
const srcDirectoryDir = path.join(srcDir, '/directory');

export const expectedBacklinks = {
  'Test file 1': [
    {
      file: {
        root: '/',
        dir: srcDirectoryDir,
        base: 'Test file 4.md',
        ext: '.md',
        name: 'Test file 4',
      },
      name: 'Test file 4',
      when: new Date('2021-01-04T00:00:00.000Z'),
    },
    {
      file: {
        root: '/',
        dir: srcDir,
        base: 'Test file 3.md',
        ext: '.md',
        name: 'Test file 3',
      },
      name: 'Test file 3',
      when: new Date('2021-01-03T00:00:00.000Z'),
    },
  ],
  'Test file 2': [
    {
      file: {
        root: '/',
        dir: srcDirectoryDir,
        base: 'Test file 4.md',
        ext: '.md',
        name: 'Test file 4',
      },
      name: 'Test file 4',
      when: new Date('2021-01-04T00:00:00.000Z'),
    },
    {
      file: {
        root: '/',
        dir: srcDir,
        base: 'Test file 1.md',
        ext: '.md',
        name: 'Test file 1',
      },
      name: 'Test file 1',
      when: new Date('2021-01-01T00:00:00.000Z'),
    },
  ],
  'Test file 3': [
    {
      file: {
        root: '/',
        dir: srcDir,
        base: 'Test file 1.md',
        ext: '.md',
        name: 'Test file 1',
      },
      name: 'Test file 1',
      when: new Date('2021-01-01T00:00:00.000Z'),
    },
    {
      file: {
        root: '/',
        dir: srcDir,
        base: 'Test file 2.md',
        ext: '.md',
        name: 'Test file 2',
      },
      name: 'Test file 2',
      when: new Date('2021-01-02T00:00:00.000Z'),
    },
  ],
  'Test file 4': [
    {
      file: {
        root: '/',
        dir: srcDir,
        base: 'Test file 2.md',
        ext: '.md',
        name: 'Test file 2',
      },
      name: 'Test file 2',
      when: new Date('2021-01-02T00:00:00.000Z'),
    },
    {
      file: {
        root: '/',
        dir: srcDir,
        base: 'Test file 3.md',
        ext: '.md',
        name: 'Test file 3',
      },
      name: 'Test file 3',
      when: new Date('2021-01-03T00:00:00.000Z'),
    },
  ],
};
