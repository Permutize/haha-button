import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import { HaHaConnector } from './type'

const MAINNET = 1
const POLYGON = 137

const supportedChains = [MAINNET, POLYGON]

export const initialize = (projectId: string) => {
  const [connector, hooks] = initializeConnector<WalletConnectV2>(
    (actions) =>
      new WalletConnectV2({
        actions,
        options: {
          projectId,
          chains: supportedChains,
          showQrModal: false,
        },
      }),
  )

  const result: HaHaConnector = { connector, hooks }
  return result
}
