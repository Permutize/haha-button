# haha-connect

[![NPM version][npm-image]][npm-url]
![npm-typescript]
[![License][github-license]][github-license-url]



## Installation:

```bash
npm i haha-connect @web3-react/walletconnect-v2 @web3-react/core @walletconnect/ethereum-provider
```

or

```bash
yarn add haha-connect @web3-react/walletconnect-v2 @web3-react/core @walletconnect/ethereum-provider
```

## Usage :

Add `HahaButton` to your component:

```js
import { useEffect } from "react";
import "./App.css";
import { HahaModal, connect, disconnect, logo, useAccounts, useIsActive, useProvider } from "haha-connect";

function App() {
  const isActive = useIsActive(); // true if connected
  const accounts = useAccounts(); // array of wallet address
  const provider = useProvider(); // ethers provider object

  useEffect(() => {
    console.log({ isActive, accounts, provider });
  }, [isActive, accounts, provider]);

  return (
    <div className="App">
      {isActive ? (
        <button onClick={async () => {
          await disconnect();
        }}>Disconnect</button>
      ) : (
        <button onClick={async () => {
          await connect();
        }}>
            <img src={logo} />
            Connect
        </button>
      )}

      <HahaModal />
    </div>
  );
}

export default App;

```

## Limitation :

Currently supports ethereum mainnet (chain id: 1)

[npm-url]: https://www.npmjs.com/package/haha-connect
[npm-image]: https://img.shields.io/npm/v/haha-connect
[github-license]: https://img.shields.io/github/license/Permutize/haha-connect
[github-license-url]: https://github.com/Permutize/haha-connect/blob/master/LICENSE
[npm-typescript]: https://img.shields.io/npm/types/haha-connect