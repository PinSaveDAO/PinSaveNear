import { NavLink } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userWallet } from "../atoms";
import * as nearAPI from "near-api-js";
import { useEffect, useState } from "react";

const { connect, keyStores, WalletConnection } = nearAPI;

const config = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};
function Navigation() {
  /*
  const setWallet = useSetRecoilState(userWallet);
  const wallet = useRecoilValue(userWallet);
  */
  const [wallet, setWallet] = useState();
  useEffect(() => {
    initWallet();
  }, []);
  const initWallet = async () => {
    const near = await connect(config);
    const wallSession = new WalletConnection(near);
    if (!wallet) setWallet(wallSession);
  };
  const connectWallet = () => {
    wallet.requestSignIn({});
    console.log(wallet.account());
  };
  return (
    <nav className="bg-slate-800  px-2 sm:px-4 py-2.5 shadow-slate-500/50 shadow-xl">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <NavLink
          className="flex text-white self-center text-2xl font-semibold whitespace-nowrap"
          to="/"
        >
          Dspyt-NFTs
        </NavLink>
        <div className="flex order-2 ml-12">
          <button
            onClick={() => connectWallet()}
            className="bg-black transition-all hover:bg-black/60 text-white font-bold p-2 rounded-full"
          >
            Connect
          </button>
        </div>

        <div>
          <ul className="flex my-auto flex-row md:space-x-8 md:text-sm font-medium">
            <li>
              <NavLink
                className={(isActive) =>
                  `hover:bg-slate-600/20 ${
                    isActive ? "text-white" : "text-gray-500"
                  } rounded-md p-2 hover:text-white/40`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(isActive) =>
                  `hover:bg-slate-600/20 ${
                    isActive ? "text-white" : "text-gray-500"
                  } rounded-md p-2 hover:text-white/40`
                }
                to="/upload"
              >
                Upload
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
