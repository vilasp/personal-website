import {useEffect} from 'react'
import {Link} from '@remix-run/react'
import {ClientOnly} from 'remix-utils'
import {Theme, ThemeFallback} from '../theme'
import {AiFillGithub} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {
  Menu,
  MenuItems,
  MenuButton,
  MenuPopover,
  MenuLink,
  useMenuButtonContext,
} from '@reach/menu-button'
import {motion} from 'framer-motion'

const LINKS = {
  projects: {
    name: 'Projects',
    href: '/projects',
  },
  blog: {
    name: 'Blog',
    href: '/blog',
  },
  about: {
    name: 'About',
    href: '/about',
  },
}

function NavBarSignature() {
  // return (
  //   <Link to="/" rel="index" className="flex-none w-16 mx-4 p-4">
  //     <svg viewBox="0 0 43.868 52.193" xmlns="http://www.w3.org/2000/svg">
  //       <path
  //         fill="none"
  //         stroke="currentColor"
  //         strokeWidth="1.5"
  //         strokeLinecap="butt"
  //         strokeLinejoin="miter"
  //         strokeOpacity="1"
  //         strokeMiterlimit="4"
  //         strokeDasharray="none"
  //         d="M.155 9.449S5.243.739 9.603.309C13.455-.068 2.641 33.333.31 50.032-1.37 62.056 28.69 19.598 35.16.465c1.121-3.315-5.053 64.72 1.549 49.566l6.815-15.644c3.114-7.148-23.389-.155-23.389-.155"
  //         transform="translate(-.04 -.175)"
  //       />
  //     </svg>
  //   </Link>
  // )
  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: 'rgba(255, 255, 255, 0)',
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: 'rgba(255, 255, 255, 0)',
      strokeWidth: '0.4em',
      strokeLinejoin: 'round',
      strokeLinecap: 'round',
    },
  }

  return (
    <Link to="/" rel="index" className="flex-none w-16 mx-4 p-4">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="stroke-current"
      >
        <motion.path
          d="M0 0 L30 100 L60 0 L90 100 M60 70 L60 80"
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: {duration: 2, ease: 'easeInOut'},
          }}
        />
      </motion.svg>
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

function NavBarMobileMenuList() {
  const {isExpanded} = useMenuButtonContext()

  useEffect(() => {
    if (isExpanded) {
      document.body.style.height = '100vh'
      document.body.classList.add('fixed')
      document.body.classList.add('overflow-y-scroll')
    } else {
      document.body.style.removeProperty('height')
      document.body.classList.remove('fixed')
      document.body.classList.remove('overflow-y-scroll')
    }
  }, [isExpanded])

  return isExpanded ? (
    <MenuPopover
      className="z-50 bg-quaternary dark:bg-primary text-primary dark:text-quaternary w-screen"
      position={r => ({
        top: `4em`,
        left: 0,
        bottom: 0,
        right: 0,
      })}
      style={{display: 'block'}}
    >
      <MenuItems>
        {Object.values(LINKS).map(({name, href}) => (
          <MenuLink as={Link} to={href} key={name} id={name}>
            {name}
          </MenuLink>
        ))}
      </MenuItems>
    </MenuPopover>
  ) : null
}

function NavBarMobile() {
  return (
    <Menu>
      <MenuButton>
        <GiHamburgerMenu
          size="2em"
          title="logo to vilasp github"
          className="hover:text-highlight transition-color"
        />
      </MenuButton>
      <NavBarMobileMenuList />
    </Menu>
  )
}

function NavBar() {
  return (
    <nav
      aria-label="main navigation"
      className="flex items-center justify-between w-screen h-16 fixed bg-quaternary dark:bg-primary text-primary dark:text-quaternary"
    >
      <NavBarSignature />
      <div className="hidden sm:flex sm:grow sm:items-center font-sans text-sm uppercase font-semibold pl-8">
        {Object.values(LINKS).map(({name, href}) => (
          <Link
            to={href}
            className="group inline-flex h-16 mr-4 hover:border-y-4 hover:border-highlight transition-border duration-300 ease-in-out"
            key={name}
            id={name}
          >
            <div className="flex flex-col justify-center">
              <p>{name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex">
        <NavbarCustomElements />
        <div className="sm:hidden inline-flex px-4">
          <NavBarMobile />
        </div>
      </div>
    </nav>
  )
}

export default function NavBarMain() {
  return <NavBar />
}
