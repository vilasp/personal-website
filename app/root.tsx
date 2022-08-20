import type {MetaFunction, LinksFunction} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import NavBarMain from './components/NavBarMain'

import styles from './tailwind.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Villiam Aspegren',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [{rel: 'stylesheet', href: styles}]

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-primary dark:bg-quaternary text-quaternary dark:text-primary overscroll-none">
        <NavBarMain />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
