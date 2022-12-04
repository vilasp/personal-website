import {createCookieSessionStorage} from '@remix-run/node'

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error(
    'No SESSION_SECRET found, please set in order to use session cookie.',
  )
}

const {getSession, commitSession, destroySession} = createCookieSessionStorage({
  cookie: {
    name: '__session',
    domain: 'localhost',
    httpOnly: true,
    maxAge: 60,
    path: '/',
    sameSite: 'strict',
    secrets: [sessionSecret],
    secure: true,
  },
})

export {getSession, commitSession, destroySession}
