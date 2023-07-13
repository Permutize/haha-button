import React, { useEffect, useState } from 'react'
import { URI_AVAILABLE } from '@web3-react/walletconnect-v2'
import { walletConnectV2, hooks } from './connector'

const { useIsActive } = hooks

const postMessage = (message: any) => {
  // @ts-ignore
  window?.ReactNativeWebView?.postMessage(JSON.stringify(message))
}

export default function HahaModal() {
  const isActive = useIsActive()

  const [isShowDialog, setIsShowDialog] = useState<boolean>(false)
  const [wcUri, setWcUri] = useState<string>('')

  // log URI when available
  useEffect(() => {
    walletConnectV2.events.on(URI_AVAILABLE, (uri: string) => {
      // @ts-ignore
      if (window.sendWalletConnectQR !== undefined) {
        postMessage({
          type: 'walletconnect_haha',
          uri,
        })
      } else {
        setWcUri(uri)
        setIsShowDialog(true)
      }
    })
  }, [])

  // attempt to connect eagerly on mount
  useEffect(() => {
    walletConnectV2.connectEagerly().catch((error) => {
      console.log('Failed to connect eagerly to walletconnect', error)
    })
  }, [])

  useEffect(() => {
    if (isActive) {
      setIsShowDialog(false)
    }
  }, [isActive])

  useEffect(() => {
    const eventEscape = () => {
      document.addEventListener(
        'keydown',
        (event) => {
          if (event.key === 'Escape') {
            setIsShowDialog(false)
          }
        },
        false,
      )
    }

    eventEscape()
  }, [])

  return (
    <>
      {isShowDialog && (
        <div style={styles.modalRoot}>
          <div style={styles.modalContent}>
            <div style={styles.getRewards}>Scan this with the HaHa Wallet app to connect.</div>
            <img
              src={'https://chart.googleapis.com/chart?cht=qr&chl=' + encodeURIComponent(wcUri) + '&chs=300x300'}
              style={styles.qrImage}
            />

            <a href='https://www.haha.me/' style={styles.linkText} target='_blank' rel='noreferrer'>
              <div style={styles.linkTextUnderline}>Learn More</div>
            </a>

            <div style={styles.getRewards}>Get rewards on every transaction.</div>

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

            <a
              href='#'
              style={styles.closeButton}
              onClick={(e) => {
                setIsShowDialog(false)
                e.preventDefault()
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

const styles: { [key: string]: React.CSSProperties } = {
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getRewards: {
    textAlign: 'center',
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
  qrImage: {
    width: 264,
    height: 264,
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
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
  },
  linkTextUnderline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
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
