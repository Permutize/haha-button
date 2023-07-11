import React, { useCallback, useEffect, useState } from 'react'
import type { Web3ReactHooks } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

export function ConnectWithSelect({
  connector,
  activeChainId,
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: WalletConnectV2
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[]
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: (error: any | undefined) => void
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
    async (desiredChainId: number | undefined) => {
      // if (desiredChainId) {
      setDesiredChainId(desiredChainId)

      try {
        if (
          // If we're already connected to the desired chain, return
          desiredChainId === activeChainId ||
          // If they want to connect to the default chain and we're already connected, return
          (desiredChainId === -1 && activeChainId !== undefined)
        ) {
          setError(undefined)
          return
        }

        if (connector instanceof WalletConnectV2) {
          await connector.activate(desiredChainId)
        }

        setError(undefined)
      } catch (error: any) {
        setError(error)
      }
      // }
    },
    [connector, activeChainId, setError],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1rem' }} />
      {isActive ? (
        error ? (
          <button onClick={() => switchChain(desiredChainId)}>Try again?</button>
        ) : (
          <button
            onClick={() => {
              if (connector?.deactivate) {
                void connector.deactivate()
              } else {
                void connector.resetState()
              }
              setDesiredChainId(undefined)
            }}
          >
            Disconnect
          </button>
        )
      ) : (
        <button onClick={() => switchChain(1)} disabled={isActivating}>
          {error ? 'Try again?' : 'Connect'}
        </button>
      )}
    </div>
  )
}
