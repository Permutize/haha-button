import { HaHaConnector } from './components/type'
import { initialize } from './components/connector'
import HahaModal from './components/HahaModal'
import HahaButton from './components/HahaButton'

const logo = 'https://www.haha.me/images/logo-transparent.png'

const connect = async (hahaConnector: HaHaConnector, chainId: number) => {
  await hahaConnector.connector.resetState()
  await hahaConnector.connector.activate(chainId)
}

const disconnect = async (hahaConnector: HaHaConnector) => {
  if (hahaConnector.connector?.deactivate) {
    await hahaConnector.connector.deactivate()
  } else {
    await hahaConnector.connector.resetState()
  }
}

export { connect, disconnect, HahaModal, HahaButton, logo, initialize }
