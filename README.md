# remark-contents

[remark](https://github.com/remarkjs/remark) plugin to extract table of contents.

This plugin extracts only `Heading` from [mdast](https://github.com/syntax-tree/mdast) markdown, then converts them to a nested `List` keeping the depth.

# Install

```
npm install remark-contents
```

# Usage

```javascript
var unified = require("unified");
var markdown = require("remark-parse");
var remark2rehype = require("remark-rehype");
var html = require("rehype-stringify");
var contents = require("remark-contents");

var fs = require("fs");
var text = fs.readFileSync("example.md", "utf8");

unified()
  .use(markdown, { commonmark: true })
  .use(contents)
  .use(remark2rehype)
  .use(html)
  .process(text);
```

This `example.md`

```
# Alpha

aaaa

## Bravo

bbbb

### Charlie

cccc

## Delta

dddd
```

will be converted by this library like...

```
-   [Alpha](#alpha)

    -   [Bravo](#bravo)

        -   [Charlie](#charlie)

    -   [Delta](#delta)
```

# License

MIT
