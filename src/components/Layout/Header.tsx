import { Link, useRoute } from 'wouter';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { puzzleList } from '../../puzzles';

interface NavItem {
  name: string
  href: string
}

const mainNav: NavItem[] = [
  { name: 'About', href: '/' },
];

const Puzzles = (): JSX.Element => {
  const [match, params] = useRoute('/day/:day');
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={[
            'inline-flex w-full relative block px-3 py-2 transition',
            params?.day !== undefined ? 'text-teal-500' : 'hover:text-teal-500',
          ].join(' ')}>
          { !match ? 'Puzzles' : `Day ${params.day}` }
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          {match && (
            <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0" />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 z-50 overflow-y-scroll mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          style={{ maxHeight: 'calc(100vh - 100px)' }}
        >
          <div className="py-1">
            {puzzleList.map(({ headline }, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <Link
                    href={`/day/${i + 1}`}
                    className={[
                      active
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ].join(' ')}
                  >
                    <span className="font-bold">Day {i + 1}: </span>{headline}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const NavLink = ({ item }: { item: NavItem }): JSX.Element => {
  const [isActive] = useRoute(item.href);
  const classes = ['relative block px-3 py-2 transition'];
  if (isActive) {
    classes.push('text-teal-500');
  } else {
    classes.push('hover:text-teal-500');
  }
  return (
    <li className={classes.join(' ')}>
      <Link href={item.href}>
        {item.name}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0" />
        )}
      </Link>
    </li>
  );
};

const Header = (): JSX.Element => {
  return (
    <header className="pt-6">
      <div className="flex items-center justify-end">
        <Link className="flex items-center" href="/">
          <div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
            <img src="https://ca.slack-edge.com/EJYQ8J5SL-U033F3VCDL3-791000a95c7c-512" className="rounded-full bg-zinc-100 object-cover h-9 w-9" />
          </div>
          <div className="ml-4 text-sm"><span className="font-bold"><span className="hidden sm:inline">Advent of Code</span><span className="sm:hidden">AoC</span></span> | 2023</div>
        </Link>
        <div className="flex flex-1 justify-end">
          <nav>
            <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
              {mainNav.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
              <Puzzles />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
