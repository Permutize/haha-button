interface BasicChainInformation {
  urls: string[]
  name: string
}

type ChainConfig = { [chainId: number]: BasicChainInformation }
export const MAINNET_CHAINS: ChainConfig = {
  1: {
    urls: ['https://eth-mainnet.haha.me'].filter(Boolean),
    name: 'Mainnet',
  },
}
