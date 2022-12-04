import {redirect, json} from '@remix-run/node'
import {getSession, commitSession} from '~/sessions'
import {isTheme} from '~/utils/theme'
import type {ActionFunction, LoaderFunction} from '@remix-run/node'

export const action: ActionFunction = async ({request}) => {
  const session = await getSession(request.headers.get('Cookie'))
  const requestText = await request.text()
  const formParams = new URLSearchParams(requestText)
  const theme = formParams.get('theme')

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `The supplied theme: ${theme} is not supported`,
    })
  }

  session.set('theme', theme)
  return json(
    {success: true},
    {headers: {'Set-Cookie': await commitSession(session)}},
  )
}

export const loader: LoaderFunction = () => redirect('/', {status: 404})
