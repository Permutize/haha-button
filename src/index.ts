import { HahaButton, HahaModal } from './components'
import { hooks, walletConnectV2 as connector } from './components/connector'
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } = hooks

const connect = async (chainId = 1) => {
  await connector.activate(chainId)
}

const disconnect = async () => {
  if (connector?.deactivate) {
    await connector.deactivate()
  } else {
    await connector.resetState()
  }
}

const logo = 'https://www.haha.me/images/logo-transparent.png'

export {
  HahaModal,
  HahaButton,
  connect,
  disconnect,
  logo,
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
}
