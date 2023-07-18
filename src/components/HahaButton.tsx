import React from 'react'
import { walletConnectV2 as connector } from './connector'

const svg = (
  <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_30124_222)'>
      <path
        d='M4.43333 0C1.98487 0 0 1.98487 0 4.43333V10.5609L6.06667 8.93538V6.06667H10.7333V12.5059L17.2667 10.7553V6.06667H21.9333V14.35L28 12.7244V4.43333C28 1.98487 26.0151 0 23.5667 0H4.43333Z'
        fill='url(#paint0_linear_30124_222)'
      />
      <path
        d='M28 17.5557L21.9333 19.1813V21.9333H17.2667V15.5866L10.7333 17.3372V21.9333H6.06667V13.7667L0 15.3922V23.5667C0 26.0151 1.98487 28 4.43333 28H23.5667C26.0151 28 28 26.0151 28 23.5667V17.5557Z'
        fill='url(#paint1_linear_30124_222)'
      />
    </g>
    <defs>
      <linearGradient id='paint0_linear_30124_222' x1='28' y1='0' x2='0' y2='28' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F458F7' />
        <stop offset='1' stopColor='#119BFF' />
      </linearGradient>
      <linearGradient id='paint1_linear_30124_222' x1='28' y1='0' x2='0' y2='28' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F458F7' />
        <stop offset='1' stopColor='#119BFF' />
      </linearGradient>
      <clipPath id='clip0_30124_222'>
        <rect width='28' height='28' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

interface HahaButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  label?: string
}

export default function HahaButton(props: HahaButtonProps) {
  // eslint-disable-next-line react/prop-types
  const { style, label = 'HaHa Wallet - Rewards on Every Transaction', ...rest } = props

  const newStyle = {
    ...styles.button,
    ...style,
  }

  return (
    <button
      style={newStyle}
      {...rest}
      onClick={async (e) => {
        await connector.activate(1)
        e.preventDefault()
      }}
    >
      <div style={styles.content}>
        <div style={styles.imageWrapper}>
          {/* <img src='https://www.haha.me/images/logo-transparent.png' style={styles.image} /> */}
          {svg}
        </div>
        {label}
      </div>
    </button>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    background: 'transparent',
    outline: 'none',
    border: '1px solid transparent',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem',
    marginTop: 0,
    opacity: 1,
    width: '100% !important',
  },
  content: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    height: '100%',
    fontSize: '14px',
    fontWeight: 600,
    alignItems: 'center',
  },
  imageWrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '12px',
  },
  image: {
    height: '28px',
    width: '28px',
  },
  text: {},
}
