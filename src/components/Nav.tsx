import {
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";
import {Disclosure, Menu, Transition} from '@headlessui/react'
import React, {useRef, Fragment} from 'react'
import useAuth from "../hooks/useAuth";

const navigation = [
    {name: 'Projects', href: '/projects', authRequired: false},
    {name: 'About', href: '/about', authRequired: false},
    {name: 'Dashboard', href: '/dashboard', authRequired: true}
]


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Nav = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const currentPath = useLocation().pathname;
    const menuDropdown = useRef<HTMLDivElement>(null)
    const menuButton = useRef<HTMLDivElement>(null)
    const openMenu = () => {
        if (menuDropdown.current?.classList.contains('opacity-100')) {
            setTimeout(() => {
                menuDropdown.current?.classList.add('hidden');
            }, 200);
            menuDropdown.current?.classList.add('opacity-0');
            menuDropdown.current?.classList.remove('opacity-100');
            return;
        }
        menuDropdown.current?.classList.remove('hidden')
        setTimeout(() => {
            menuDropdown.current?.classList.remove('opacity-0');
            menuDropdown.current?.classList.add('opacity-100');
        }, 5)
        menuButton.current?.addEventListener('focusout', () => {
            setTimeout(() => {
                menuDropdown.current?.classList.add('hidden');
            }, 200);
            menuDropdown.current?.classList.add('opacity-0');
            menuDropdown.current?.classList.remove('opacity-100')
        })
    }
    return (
        <Disclosure as="nav" className="bg-gray-900 rounded-b-lg">
            <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
                <div
                    className="hidden fixed z-20 transition-opacity duration-200 opacity-0 ease-in-out absolute top-14 left-1 sm:invisible"
                    ref={menuDropdown}>
                    <div
                        className="flex flex-col p-2 border w-56 h-56 shadow-black shadow-sm rounded-b-md border-gray-900 bg-gray-900">
                        {navigation
                            .filter((item) => !item.authRequired || (item.authRequired === auth?.isAuthenticated))
                            .map((item) => (
                                <Link
                                    to={item.href}
                                    key={item.name}
                                    className={classNames(
                                        currentPath.includes(item.href)
                                            ? "bg-sky-700 text-white"
                                            : "text-gray-300 bg-gray-900 hover:text-white",
                                        "px-3 py-2 inline-block text-md hover:bg-sky-700"
                                    )}
                                    aria-current={currentPath === item.href ? "page" : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        {!auth?.isAuthenticated && <div>
                            <Link to={'/login'}>
                                <span
                                    className={'px-3 py-2 block text-md text-gray-300 hover:bg-sky-700'}>Sign In</span>
                            </Link>
                            <Link to={'/register'}>
                                <span
                                    className={'px-3 py-2 block text-md text-gray-300 hover:bg-sky-700'}>Sign Up</span>
                            </Link>
                        </div>}
                    </div>
                </div>
                <div className="flex justify-between justify-items-center items-center h-14">
                    <div className={'pl-1 sm:hidden cursor-pointer'}>
                        <div tabIndex={1} ref={menuButton} onClick={openMenu}>
                            <div className="space-y-1">
                                <div className="w-5 h-0.5 bg-gray-200"/>
                                <div className="w-5 h-0.5 bg-gray-200"/>
                                <div className="w-5 h-0.5 bg-gray-200"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-start pl-3 sm:pl-0 sm:items-stretch sm:justify-start grow">
                        <div className="self-center">
                            <Link to="/">
                                <span className="text-neutral-100 text-base font-mono">
                                    nullnode
                                 </span>
                            </Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {navigation
                                    .filter((item) => !item.authRequired || (item.authRequired === auth?.isAuthenticated))
                                    .map((item) => (
                                        <Link
                                            to={item.href}
                                            key={item.name}
                                            className={classNames(
                                                currentPath.includes(item.href)
                                                    ? "bg-sky-700 text-white"
                                                    : "text-gray-300 bg-gray-800 hover:text-white",
                                                "px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-700"
                                            )}
                                            aria-current={currentPath === item.href ? "page" : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                    {!auth?.isAuthenticated && <div className={"hidden sm:flex sm:gap-2"}>
                        <Link to={'/login'}>
                            <span className={'text-sm hover:text-sky-700'}>Sign In</span>
                        </Link>
                        <Link to={'/register'}>
                            <span className={'text-sm hover:text-sky-700'}>Sign Up</span>
                        </Link>
                    </div>}
                    {auth?.isAuthenticated && <Menu as="div" className="relative z-10">
                        <Menu.Button
                            className="bg-gray-800 px-3 py-2 text-sm rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            {auth!.user}
                        </Menu.Button>
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
                                className="origin-top-right absolute p-2 right-0 mt-2 w-fit rounded-md shadow-lg bg-gray-900  focus:outline-none">
                                <Menu.Item>
                                    <button
                                        ref=""
                                        onClick={() => navigate('/profile')}
                                        className={classNames('block w-20 py-2 text-sm text-white hover:bg-sky-700')}
                                    >
                                        <span className={'text-sm'}>Profile</span>
                                    </button>
                                </Menu.Item>
                                <Menu.Item>

                                    <button
                                        ref=""
                                        onClick={() => auth!.logout(() => navigate('/'))}
                                        className={classNames('block w-20 py-2 text-sm text-white hover:bg-sky-700')}
                                    >
                                        <span className={'text-sm'}>Sign out</span>
                                    </button>

                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    }
                </div>
            </div>
        </Disclosure>
    );
}

export default Nav;