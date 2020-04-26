const unified = require("unified");
const markdown = require("remark-parse");
const stringify = require("remark-stringify");
const contents = require("./");

const processor = unified()
  .use(markdown, { commonmark: true })
  .use(contents)
  .use(stringify, { commonmark: true })
  .freeze();

describe("test", () => {
  it("basic", () => {
    return processor()
      .process(
        `# Alpha

aaaa

## Bravo

bbbb

### Charlie

cccc

## Delta

dddd
`
      )
      .then((res) => {
        expect(res.contents).toBe(
          `-   [Alpha](#alpha)

    -   [Bravo](#bravo)

        -   [Charlie](#charlie)

    -   [Delta](#delta)
`
        );
      });
  });

  it("has same heading", () => {
    return processor()
      .process(
        `# Alpha

aaaa

## Alpha

bbbb

### Alpha

cccc

## Delta

dddd
`
      )
      .then((res) => {
        expect(res.contents).toBe(
          `-   [Alpha](#alpha)

    -   [Alpha](#alpha-1)

        -   [Alpha](#alpha-2)

    -   [Delta](#delta)
`
        );
      });
  });
});
