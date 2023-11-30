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

## Usage:

```js
'use client'

import { HahaModal, HahaButton, connect, disconnect, initialize } from 'haha-connect'
import { useMemo } from 'react'

export default function Home() {
  const hahaConnector = useMemo(() => {
    return initialize('walletconnect_project_id')
  }, [])

  const isActive = hahaConnector.hooks.useIsActive()

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        {isActive ? (
          <HahaButton
            onClick={() => {
              disconnect(hahaConnector)
            }}
            label='Disconnect'
            style={{ backgroundColor: '#000', color: '#fff' }}
          />
        ) : (
          <HahaButton
            onClick={(e) => {
              connect(hahaConnector, 1)
              e.preventDefault()
            }}
            label='Connect with HaHa'
            style={{ backgroundColor: '#000', color: '#fff' }}
          />
        )}

        <HahaModal hahaConnector={hahaConnector} />
      </div>
    </main>
  )
}
```

## Limitation :

Currently supports ethereum mainnet (chain id: 1) and polygon (chain id: 137)

[npm-url]: https://www.npmjs.com/package/haha-connect
[npm-image]: https://img.shields.io/npm/v/haha-connect
[github-license]: https://img.shields.io/github/license/Permutize/haha-connect
[github-license-url]: https://github.com/Permutize/haha-connect/blob/master/LICENSE
[npm-typescript]: https://img.shields.io/npm/types/haha-connect
