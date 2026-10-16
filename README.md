# uniapp-kits

> Custom Vite plugins and fixes for UniApp project development.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![download][download-image]][download-url]

## installation

```shell
yarn add @jswork/uniapp-kits
```

## usage

```js
// vite.config.ts
import { fixUniPreserveSymlinks } from '@jswork/uniapp-kits';

export default {
  plugins: [fixUniPreserveSymlinks()]
};
```

```js
// query-client setup
import { onlineManager } from '@tanstack/vue-query';
import { setupUniOnlineManager } from '@jswork/uniapp-kits';

setupUniOnlineManager(onlineManager);
```

## license

Code released under [the MIT license](https://github.com/afeiship/uniapp-kits/blob/main/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/uniapp-kits
[version-url]: https://npmjs.org/package/@jswork/uniapp-kits
[license-image]: https://img.shields.io/npm/l/@jswork/uniapp-kits
[license-url]: https://github.com/afeiship/uniapp-kits/blob/main/LICENSE.txt
[download-image]: https://img.shields.io/npm/dm/@jswork/uniapp-kits
[download-url]: https://www.npmjs.com/package/@jswork/uniapp-kits
