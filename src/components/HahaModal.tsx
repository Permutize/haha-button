import React, { useEffect, useState } from 'react'
import { URI_AVAILABLE } from '@web3-react/walletconnect-v2'
// import { MAINNET_CHAINS } from './chains'
import { walletConnectV2, hooks } from './connector'
// import { ConnectWithSelect } from './ConnectWithSelect'
// const CHAIN_IDS = Object.keys(MAINNET_CHAINS).map(Number)

const { useIsActive } = hooks

// type HahaProps = {}

export default function HahaModal() {
  // const chainId = useChainId()
  // const accounts = useAccounts()
  // const isActivating = useIsActivating()

  const isActive = useIsActive()

  // const provider = useProvider()

  const [isShowDialog, setIsShowDialog] = useState<boolean>(false)
  const [wcUri, setWcUri] = useState<string>('')
  // const [error, setError] = useState<Error | undefined>(undefined)

  // log URI when available
  useEffect(() => {
    walletConnectV2.events.on(URI_AVAILABLE, (uri: string) => {
      console.log(`uri: ${uri}`)
      setWcUri(uri)
      setIsShowDialog(true)
    })
  }, [])

  // attempt to connect eagerly on mount
  useEffect(() => {
    walletConnectV2.connectEagerly().catch((error) => {
      console.debug('Failed to connect eagerly to walletconnect', error)
    })
  }, [])

  useEffect(() => {
    if (isActive) {
      setIsShowDialog(false)
    }
  }, [isActive])

  // useEffect(() => {
  //   console.log({ accounts, provider })
  //   if (accounts && provider && onConnect) {
  //     onConnect(accounts, provider)
  //   }
  // }, [accounts, provider, onConnect])

  return (
    <>
      {/* <div>
                isActivating: {isActivating ? "true" : "false"}
            </div>
            <div>
                isActive: {isActive ? "true" : "false"}
            </div> */}
      {/* <ConnectWithSelect
        connector={walletConnectV2}
        activeChainId={chainId}
        chainIds={CHAIN_IDS}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
        style={style}
        className={className}
      >
        {children}
      </ConnectWithSelect> */}

      {isShowDialog && (
        <div style={styles.modalRoot}>
          <div style={styles.modalContent}>
            <img src={'https://chart.googleapis.com/chart?cht=qr&chl=' + encodeURIComponent(wcUri) + '&chs=300x300'} />

            <div style={{ textAlign: 'center' }}>Get rewards on every transactions.</div>

            <div style={styles.row}>
              <a
                href='https://apps.apple.com/us/app/haha-crypto-portfolio-tracker/id1591158244'
                rel='noreferrer'
                target='_blank'
                style={styles.imgButton}
              >
                <img src='https://haha.me/images/download-ios.png' style={styles.image} alt='Download iOS' />
              </a>
              <a
                href='https://play.google.com/store/apps/details?id=com.permutize.haha'
                rel='noreferrer'
                target='_blank'
                style={styles.imgButton}
              >
                <img src='https://haha.me/images/download-android.png' style={styles.image} alt='Download Android' />
              </a>
            </div>

            <a href='https://haha.me/' style={styles.linkText}>
              <img src='https://www.haha.me/images/logo-seo.png' style={styles.imageBox} />
              <br />
              https://haha.me
            </a>

            <a
              href='#'
              style={styles.closeButton}
              onClick={() => {
                setIsShowDialog(false)
              }}
            >
              <img src='https://www.haha.me/images/buttons/close.png' style={styles.closeButtonImg} />
            </a>
          </div>
        </div>
      )}
    </>
  )
}

const styles: any = {
  modalRoot: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.3)',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    background: '#fff',
    width: 350,
    height: 450,
    borderRadius: 10,
    padding: 20,
    position: 'relative',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0',
  },
  imgButton: {
    margin: '0 5px',
  },
  image: {
    width: 156 * 0.7,
    height: 52 * 0.7,
  },
  imageBox: {
    width: 30,
    height: 30,
  },
  linkText: {
    textAlign: 'center',
    color: '#000',
    marginTop: 10,
    display: 'block',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonImg: {
    width: 30,
    height: 30,
  },
}
