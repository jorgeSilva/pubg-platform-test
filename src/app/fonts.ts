import { Montserrat, Poppins, Prata } from "next/font/google";

export const font_special = Prata({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-special'
})

export const font_body = Poppins({
  weight: ['400', '500'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-special'
})

export const font_title = Montserrat({
  weight: ['400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-special'
})