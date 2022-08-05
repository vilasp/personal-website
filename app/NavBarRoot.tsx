import {Link} from '@remix-run/react'
import useMediaQuery from './hook/useMediaQuery'
import {ClientOnly} from 'remix-utils'
import {Theme, ThemeFallback} from './theme'
import {AiFillGithub} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'

function NavBarSignature() {
  return (
    <Link to="/" rel="index" className="flex-none w-16 mx-4 p-4">
      <svg viewBox="0 0 43.868 52.193" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeMiterlimit="4"
          strokeDasharray="none"
          d="M.155 9.449S5.243.739 9.603.309C13.455-.068 2.641 33.333.31 50.032-1.37 62.056 28.69 19.598 35.16.465c1.121-3.315-5.053 64.72 1.549 49.566l6.815-15.644c3.114-7.148-23.389-.155-23.389-.155"
          transform="translate(-.04 -.175)"
        />
      </svg>
    </Link>
  )
}

function NavbarCustomElements() {
  return (
    <>
      <div className="inline-flex  px-4 cursor-pointer">
        <ClientOnly fallback={<ThemeFallback />}>{() => <Theme />}</ClientOnly>
      </div>
      <a
        href="https://github.com/vilasp"
        rel="external"
        className="inline-flex  px-4"
      >
        <AiFillGithub
          size="2em"
          title="logo to vilasp github"
          className="hover:text-highlight transition-color"
        />
      </a>
    </>
  )
}

function NavBarMobile() {
  return (
    <nav
      aria-label="main navigation"
      className="mx-auto flex items-center justify-between w-screen h-16 fixed bg-primary dark:bg-quaternary"
    >
      <NavBarSignature />
      <div className="flex items-center font-sans text-sm uppercase font-semibold pl-8">
        <NavbarCustomElements />
        <div className="inline-flex  px-4 cursor-pointer">
          <GiHamburgerMenu
            size="2em"
            title="logo to vilasp github"
            className="hover:text-highlight transition-color"
          />
        </div>
      </div>
    </nav>
  )
}

function NavBarDesktop() {
  return (
    <nav
      aria-label="main navigation"
      className="flex items-center w-screen h-16 fixed bg-primary dark:bg-quaternary"
    >
      <NavBarSignature />
      <div className="grow flex items-center font-sans text-sm uppercase font-semibold pl-8">
        <Link
          to="/playground"
          className="group inline-flex h-16 mr-4 hover:border-y-4 hover:border-highlight transition-border duration-300 ease-in-out"
        >
          <div className="flex flex-col justify-center">
            <p>Playground</p>
          </div>
        </Link>
        <Link
          to="/projects"
          className="group inline-flex h-16 mr-4 hover:border-y-4 hover:border-highlight  transition-border duration-300 ease-in-out"
        >
          <div className="flex flex-col justify-center">
            <p>Projects</p>
          </div>
        </Link>
        <Link
          to="/about"
          className="group inline-flex h-16 mr-4 hover:border-y-4 hover:border-highlight  transition-border duration-300 ease-in-out"
        >
          <div className="flex flex-col justify-center">
            <p>About</p>
          </div>
        </Link>{' '}
      </div>
      <NavbarCustomElements />
    </nav>
  )
}

export default function NavBarRoot() {
  const matches = useMediaQuery('(min-width: 576px)')
  return matches ? <NavBarDesktop /> : <NavBarMobile />
}
