import Image from 'next/image'
import clsx from 'clsx'

import logoRight from '@/images/logo_right.png'

export function Logomark(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20ZM4 20c0 7.264 5.163 13.321 12.02 14.704C17.642 35.03 19 33.657 19 32V8c0-1.657-1.357-3.031-2.98-2.704C9.162 6.68 4 12.736 4 20Z"
      />
    </svg>
  )
}

export function Logo({
  className,
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>) {
  return (
    <div
      className={clsx('relative block overflow-hidden', className)}
      style={{ width: 190, height: 54, ...style }}
      {...props}
    >
      <Image
        src={logoRight}
        alt="Casa Cadence"
        width={276}
        height={184}
        className="absolute max-w-none"
        style={{ top: -61, left: -37 }}
        priority
      />
    </div>
  )
}
