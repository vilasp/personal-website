import type {MetaFunction, LinksFunction} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from '@remix-run/react'

import {AiFillGithub} from 'react-icons/ai'
import styles from './tailwind.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
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
      <body className="bg-primary text-quaternary overscroll-none">
        <nav
          aria-label="main navigation"
          className="flex items-center w-screen h-16 fixed bg-primary"
        >
          <div className="flex-none w-16 px-2">Logo</div>
          <div className="grow font-sans text-sm uppercase font-semibold">
            <Link
              to="/playground"
              className="group inline-flex h-16 mr-2 hover:border-y-4 hover:border-highlight transition-border duration-300 ease-in-out"
            >
              <div className="flex flex-col justify-center">
                <p>Playground</p>
              </div>
            </Link>
            <Link
              to="/projects"
              className="group inline-flex h-16 mr-2 hover:border-y-4 hover:border-highlight  transition-border duration-300 ease-in-out"
            >
              <div className="flex flex-col justify-center">
                <p>Projects</p>
              </div>
            </Link>
            <Link
              to="/about"
              className="group inline-flex h-16 mr-2 hover:border-y-4 hover:border-highlight  transition-border duration-300 ease-in-out"
            >
              <div className="flex flex-col justify-center">
                <p>About</p>
              </div>
            </Link>
          </div>
          <a
            href="https://github.com/vilasp"
            rel="external"
            className="flex-none w-16 px-2"
          >
            <div className="flex flex-col justify-center">
              <AiFillGithub
                size="2em"
                title="logo to vilasp github"
                className="hover:text-highlight transition-color"
              />
            </div>
          </a>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
