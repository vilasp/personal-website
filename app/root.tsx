import type {MetaFunction, LinksFunction, LoaderFunction} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import NavBarMain from './components/NavBarMain'
import styles from './tailwind.css'
import {getSession} from './sessions'
import type {THEMES} from './utils/theme'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Villiam Aspegren',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [{rel: 'stylesheet', href: styles}]

export type LoaderData = {
  theme: keyof typeof THEMES | null
}

export const loader: LoaderFunction = async ({request}) => {
  const session = await getSession(request.headers.get('Cookie'))
  const data: LoaderData = {
    theme: session.get('theme'),
  }

  return data
}

export default function App() {
  const {theme} = useLoaderData<LoaderData>()

  return (
    <html lang="en" className={`${theme ?? 'light'}`}>
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
