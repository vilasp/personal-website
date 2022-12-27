import {useEffect} from 'react'
import {Link} from '@remix-run/react'
import {Theme} from '../theme'
import {AiFillGithub} from 'react-icons/ai'
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

const variants = {
  signature: {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: 'rgba(255, 255, 255, 0)',
      strokeWidth: '0.4em',
      strokeLinejoin: 'round',
      strokeLinecap: 'round',
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: 'rgba(255, 255, 255, 0)',
      strokeWidth: '0.4em',
      strokeLinejoin: 'round',
      strokeLinecap: 'round',
    },
  },
  mobileMenu: {
    top: {
      closed: {
        x: 0,
        y: 0,
      },
      open: {
        rotate: '45deg',
        origin: 'center',
        y: '0.65em',
      },
    },
    middle: {
      closed: {opacity: 1.0},
      open: {opacity: 0.0},
    },
    bottom: {
      closed: {
        x: 0,
        y: 0,
      },
      open: {
        rotate: '-45deg',
        origin: 'center',
        y: '-0.5em',
      },
    },
  },
}

function NavBarSignature() {
  return (
    <Link to="/" rel="index" className="flex-none w-16 mx-4 p-4">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="stroke-current"
      >
        <motion.path
          d="M0 0 L30 100 L60 0 L90 100 M60 70 L60 80"
          variants={variants.signature}
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
      <Theme />
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
      <MenuItems className="flex flex-col space-between px-4 py-2 divide-y-3">
        {Object.values(LINKS).map(({name, href}) => (
          <MenuLink
            as={Link}
            to={href}
            key={name}
            id={name}
            className="p-4 uppercase hover:text-highlight font-sans uppercase font-semibold text-sm transition-color"
          >
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
      {({isExpanded}) => {
        const state = isExpanded ? 'open' : 'closed'
        return (
          <>
            <MenuButton className="hover:text-highlight">
              <motion.svg
                width="2em"
                height="2em"
                viewBox="0 0 2em 2em"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.rect
                  y="0.35em"
                  height="0.15em"
                  width="1.6em"
                  fill="currentColor"
                  animate={state}
                  variants={variants.mobileMenu.top}
                />
                <motion.rect
                  y="0.925em"
                  height="0.15em"
                  width="1.6em"
                  fill="currentColor"
                  animate={state}
                  variants={variants.mobileMenu.middle}
                />
                <motion.rect
                  y="1.5em"
                  height="0.15em"
                  width="1.6em"
                  fill="currentColor"
                  animate={state}
                  variants={variants.mobileMenu.bottom}
                />
              </motion.svg>
            </MenuButton>
            <NavBarMobileMenuList />
          </>
        )
      }}
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
      <div className="hidden sm:flex sm:grow sm:items-center pl-8 font-sans uppercase font-semibold text-sm">
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
