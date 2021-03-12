# nonplain-md-backlinker

Generate backlinks for [nonplain files](https://github.com/nonplain/nonplain.js#what-a-nonplain-file-is).

## What this package does

Groups of related markdown files often link to one another. This is especially true for groups of files that contain notes (e.g. [VimWiki](https://vimwiki.github.io/)) or documentation.

Links between files reflect [conceptual relationships](https://jaredgorski.org/notes/linking-notes-by-title-promotes-conceptual-cohesion) between those files, but links are uni-directional by default (they only go forward, not backward).

The concept: make it easy to generate backlinks for individual files in a [nonplain `Files`](https://github.com/nonplain/nonplain.js#parsing-nonplain-files) instance.

## Usage

```js
backlinker(files [, options]);
```

The `backlinker` function exported by this package will automatically generate backlinks for all files in a `Files` instance and inject them into each `File`'s metadata as `backlinks`.

To generate backlinks for a group of files that link to each other, load those files into a [nonplain `Files`](https://github.com/nonplain/nonplain.js) instance and then pass that instance to the `backlinker` function.

Example:

```js
const { Files } = require("nonplain");
const { backlinker } = require("nonplain-md-backlinker");

(async () => {
  const files = await new Files().load('/path/to/dir/**/*.md');
  
  backlinker(files);
  
  console.log(files.collect());
})();

// Output:
//
// [
//     {
//         "body": "This is the body of\nthe first file",
//         "metadata": {
//             "backlinks": [
//                 {
//                     "file": {
//                         "root": "/",
//                         "dir": "/path/to/dir",
//                         "base": "file2.md",
//                         "ext": ".md",
//                         "name": "file2"
//                     },
//                     "title": "My file 2"
//                 }
//             ],
//             "file": {
//                 "root": "/",
//                 "dir": "/path/to/dir",
//                 "base": "file1.md",
//                 "ext": ".md",
//                 "name": "file1"
//             },
//             "title": "My file 1"
//         }
//     },
//     {
//         "body": "This is the body of\nthe second file",
//         "metadata": {
//             "backlinks": [
//                 {
//                     "file": {
//                         "root": "/",
//                         "dir": "/path/to/dir",
//                         "base": "file1.md",
//                         "ext": ".md",
//                         "name": "file1"
//                     },
//                     "title": "My file 1"
//                 }
//             ],
//             "file": {
//                 "root": "/",
//                 "dir": "/path/to/dir",
//                 "base": "file2.md",
//                 "ext": ".md",
//                 "name": "file2"
//             },
//             "title": "My file 2",
//         }
//     }
// ]
```

### API

- `files`: `Files` instance - An instance of [nonplain.js' `Files` class](https://github.com/nonplain/nonplain.js#parsing-nonplain-files).
- options:
  - `keyFn`: function ((directory, path) => fileKey) - Customize the function used to identify each file so that its backlinks can be identified. By default, the absolute filepath (minus extension) is used.
  - `metadataProperty` _(default: 'backlinks')_: string - Customize the property on the `metadata` object to assign the backlinks array to.

## Related work

- Core nonplain library for JS: [nonplain.js](https://github.com/nonplain/nonplain.js)
- Tools for markdown links in nonplain files: [nonplain-md-link.js](https://github.com/nonplain/nonplain-md-link.js)

## Contributing

These tools are in progress. If your use-case requires specific functionality from this library, please contact me and we'll see what we can do together. Thanks!

