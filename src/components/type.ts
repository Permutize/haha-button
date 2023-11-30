import { Web3ReactHooks } from '@web3-react/core'
import { WalletConnect } from '@web3-react/walletconnect-v2'

export type HaHaConnector = {
  connector: WalletConnect
  hooks: Web3ReactHooks
}
