# haha-connect

[![NPM version][npm-image]][npm-url]
![npm-typescript]
[![License][github-license]][github-license-url]



## Installation:

```bash
npm i haha-connect
```

or

```bash
yarn add haha-connect
```

## Usage :

Add `HahaButton` to your component:

```js
import React from 'react';
import { HahaButton } from "haha-connect";

export default function App() {
    return (
        <div>
            <HahaButton onConnect={(accounts, provider) => {
                //Handle event when connection successfull
                console.log({ accounts, provider });
            }} />
        </div>
    );
}

```

[npm-url]: https://www.npmjs.com/package/haha-connect
[npm-image]: https://img.shields.io/npm/v/haha-connect
[github-license]: https://img.shields.io/github/license/gapon2401/my-react-typescript-package
[github-license-url]: https://github.com/gapon2401/my-react-typescript-package/blob/master/LICENSE
[npm-typescript]: https://img.shields.io/npm/types/my-react-typescript-package