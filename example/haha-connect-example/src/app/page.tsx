'use client'

import { HahaModal, HahaButton, connect, disconnect, initialize } from '../../../../src/index'
import { useCallback, useMemo } from 'react'

export default function Home() {
  const hahaConnector = useMemo(() => {
    return initialize('0d0bfc6b55700ea8704a228094b6e3c2')
  }, [])

  const isActive = hahaConnector.hooks.useIsActive()

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        {isActive ? (
          <HahaButton
            onClick={() => {
              disconnect(hahaConnector)
            }}
            label='Disconnect'
            style={{ backgroundColor: '#000', color: '#fff' }}
          />
        ) : (
          <HahaButton
            onClick={(e) => {
              connect(hahaConnector, 1)
              e.preventDefault()
            }}
            label='Connect with HaHa'
            style={{ backgroundColor: '#000', color: '#fff' }}
          />
        )}

        <HahaModal hahaConnector={hahaConnector} />
      </div>
    </main>
  )
}
