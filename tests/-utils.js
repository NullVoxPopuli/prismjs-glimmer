// NOTE: this highlight.js was manually built and had an export manually added
//       This is because the glimmer syntax requires a to-be-released
//       version of highlight.js at the time of writing
import Prism from 'prismjs';
import { setup } from '../src';

setup(Prism);

export function parse(code, lang = 'glimmer') {
  return Prism.highlight(code, Prism.languages[lang], lang);
}

export function tag(klass, children = []) {
  return `<span class="hljs-${klass}">${children.join('')}</span>`;
}
