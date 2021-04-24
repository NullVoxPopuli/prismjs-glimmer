# prismjs-glimmer

[![npm version](https://badge.fury.io/js/prismjs-glimmer.svg)](https://www.npmjs.com/package/prismjs-glimmer)
[![code quality](https://badgen.net/lgtm/grade/github/NullVoxPopuli/prismjs-glimmer/js?label=code+quality)](https://lgtm.com/projects/g/NullVoxPopuli/prismjs-glimmer/)

glimmer syntax highlighting with [Prism.js](https://github.com/PrismJS/prism)

## Install

```bash
yarn add prismjs-glimmer
# or
npm install prismjs-glimmer
```

## Usage

```js
import Prism from 'prismjs';
import { setup } from 'prismjs-glimmer';

setup(Prism);

Prism.highlightAll();
```

 - the `javascript` language must be registered before `setup` is called.
 - `setup` _must_ be called before any highlighting occurs.

Supported language tags:

```html
<pre>
  <code class="language-{tag}">
```
where `{tag}` could be:
 - glimmer
 - hbs
 - html.hbs
 - html.handlebars
 - htmlbars

**NOTE** handlebars highlighting will use glimmer highlighting when this plugin is present

## CDN Usage

### Traditional Script Tags

```html
<script type="text/javascript" src="/cdn/path/to/prismjs.min.js"></script>
<script type="text/javascript" src="/cdn/path/to/prismjs-glimmer/glimmer.js"></script>
<script type="text/javascript">Prism.highlightAll();</script>
```

## Node / cjs / `require`

```js
const Prism = require('prismjs');
const { setup } = require('prismjs-glimmer');

setup(Prism);

Prism.highlightAll();
```

Only Node 14 is supported

## Node ES Modules / `import`

```js
import Prism from 'prismjs';
import { setup } from 'prismjs-glimmer';

setup(Prism);

Prism.highlightAll();
```

With Node 14, launch with

```bash
NODE_OPTIONS="--experimental-vm-modules" node your-module-script.js
```

## Contributing

Debug with `yarn debug -p 4201`
Visit `http://localhost:4201`

Run Tets with `yarn test` or `npm run test`
