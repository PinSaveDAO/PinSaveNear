import { NavLink } from "react-router-dom";
//import { Fragment } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { SignOut } from "phosphor-react";
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { useStore } from "../store";

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Upload', href: '/upload', current: false },
  { name: 'Saved', href: '/saved', current: false },
]

//const userNavigation = [
  //{name : 'Upload', href: '/upload'}
 // { name: 'Your Profile', href: '/' },
  //{ name: 'Settings', href: '/saved' },
  //{ name: 'Sign out', href: '/' },
//]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  //const [logined, setLogin] = useState(false);
  const wallet = useStore((state) => state.wallet);
  const contract = useStore((state) => state.contract);
  const nearConfig = useStore((state) => state.nearConfig);
  const currentUser = useStore((state) => state.currentUser);
  const ConnectWallet = () => {
    wallet.requestSignIn(
      {
        contractId: nearConfig.contractName,
        methodNames: [contract.nft_mint.name],
      }, //contract requesting access
      "PinSave",
      null,
      null
    );
  };


  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                
                <div className="flex-shrink-0 flex items-center">
                  <a href="/">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Pin Save"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Pin Save"
                  />
                  </a>
                </div>
                
                
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>

              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  { !currentUser  ? (
                  <button
                  onClick={() => (
                    ConnectWallet()
                    )}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                    Connect
                  </button>
                  ) : (
                    <Menu>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {currentUser.accountId}
                    </Menu.Button>
                  </Menu>
                  ) }   
                </div>


              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {currentUser ? (
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="mt-3 px-2 space-y-1 sm:px-3">
 
                 {/*userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={NavLink}
                    to={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                    {item.name}
                  </Disclosure.Button>
                 ))*/}

              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 ">
                                              Ⓝ {(
                                                Number(currentUser.balance) / Math.pow(10, 24)
                                              ).toFixed(3)}
              </span>
              { (
                              <Disclosure.Button
                                onClick={() => {
                                  wallet.signOut();
                                  window.location.replace(
                                    window.location.origin + window.location.pathname
                                  );
                                }}
                                to="/"
                                className="text-gray-200 group flex rounded-b-md transition items-center w-full px-2 py-2 text-sm hover:text-white hover:bg-red-600"
                              >
                                <SignOut
                                  className="w-5 h-5 mr-4 my-auto"
                                  aria-hidden="true"
                                />
                                Log Out
                              </Disclosure.Button>
                            )}

              </div>
            </div>
            ) : ""}
          </Disclosure.Panel>
        </>
      )}

    </Disclosure>
  );
}