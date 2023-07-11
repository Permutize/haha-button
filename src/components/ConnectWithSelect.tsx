import React, { useCallback, useEffect, useState } from 'react'
import type { Web3ReactHooks } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

export function ConnectWithSelect({
  connector,
  activeChainId,
  isActive,
  error,
  setError,
  style,
  className,
  children,
}: {
  connector: WalletConnectV2
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[]
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: (error: any | undefined) => void
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}) {
  const [desiredChainId, setDesiredChainId] = useState<number>()

  /**
   * When user connects eagerly (`desiredChainId` is undefined) or to the default chain (`desiredChainId` is -1),
   * update the `desiredChainId` value so that <select /> has the right selection.
   */
  useEffect(() => {
    console.log({ desiredChainId, activeChainId })
    if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
      setDesiredChainId(activeChainId)
    }
  }, [desiredChainId, activeChainId])

  const switchChain = useCallback(
    async (desiredChainId = 1) => {
      // if (desiredChainId) {
      setDesiredChainId(desiredChainId)

      try {
        await connector.activate(desiredChainId)
        setError(undefined)
      } catch (error: any) {
        setError(error)
      }
      // }
    },
    [connector, setError],
  )

  return (
    <>
      {isActive ? (
        error ? (
          <button onClick={() => switchChain(desiredChainId)}>Try again?</button>
        ) : (
          <button
            onClick={async () => {
              if (connector?.deactivate) {
                await connector.deactivate()
              } else {
                await connector.resetState()
              }
              setDesiredChainId(undefined)
            }}
          >
            Disconnect
          </button>
        )
      ) : (
        <button onClick={() => switchChain(1)} style={style} className={className}>
          {children}
        </button>
      )}
    </>
  )
}
