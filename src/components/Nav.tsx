import {
  Link,
  useNavigate,
} from "react-router-dom";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import React, {ClassType, Component, Fragment, ReactElement} from 'react';
import useAuth from "../hooks/useAuth";

const navigation = [
  { name: 'Home', href: '/', current: true, authRequired: false},
  { name: 'Projects', href: '/projects', current: true, authRequired: false},
  { name: 'About', href: '/about', current: true, authRequired: false },
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
const Nav = () => {
  const auth = useAuth();
  const navigate = useNavigate();
    return (
          <Disclosure as="nav" className="bg-gray-900 rounded-b-lg">
            <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-14">
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex items-center">
                    <Link to="/">
                    <span className="text-neutral-100 text-md font-mono">
                      nullnode
                    </span>
                    </Link>
                    <span className={'border-r-2 border-gray-200 h-full ml-4'}></span>
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
                                      item.current
                                          ? "bg-gray-800 text-white"
                                          : "text-gray-300 hover:bg-sky-700 hover:text-white",
                                      "px-3 py-2 rounded-md text-sm font-medium"
                                  )}
                                  aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                          ))}
                    </div>
                  </div>
                </div>
                {!auth!.isAuthenticated && <div className={"justify-end flex flex-row gap-2"}>
                  <Link to={'/login'}>
                    <span className={'text-sm'}>Sign In</span>
                  </Link>
                  <Link to={'/register'}>
                    <span className={'text-sm'}>Sign Up</span>
                  </Link>
                </div>}
                {auth!.isAuthenticated && <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button
                        className="bg-gray-800 flex px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      {auth!.user}
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
                        className="origin-top-right absolute right-0 mt-2 w-20 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({active}) => (
                            <button
                                ref=""
                                onClick={() => navigate('/settings')}
                                className={classNames(active ? 'bg-gray-100' : '', 'block w-20 py-2 text-sm text-gray-700')}
                            >
                              <span className={'text-sm'}>Settings</span>
                            </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({active}) => (
                            <button
                                ref=""
                                onClick={() => auth!.logout(() => navigate('/'))}
                                className={classNames(active ? 'bg-gray-100' : '', 'block w-20 py-2 text-sm text-gray-700')}
                            >
                              <span className={'text-sm'}>Sign out</span>
                            </button>
                        )}
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