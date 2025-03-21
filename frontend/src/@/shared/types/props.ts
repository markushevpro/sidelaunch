import type { DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes } from 'react'

export
type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export
type ImageProps = DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>

export
type ButtonProps = DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { disabled?: boolean, onClick?: (() => void ) | (() => Promise<void> ) }
