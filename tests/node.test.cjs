'use strict';

const cwd = process.cwd();

const Prism = require('prismjs');

const { setup } = require(`${cwd}/dist/glimmer.cjs`);

setup(Prism);

function parse(code) {
  return Prism.highlight(code, Prism.languages.glimmer, 'glimmer');
}

describe('NodeJS // require', () => {
  test('it works', () => {
    expect(parse('<A />')).toEqual(
      `<span class="hljs-tag">&lt;<span class="hljs-title">A</span> /&gt;</span>`
    );
  });
});
