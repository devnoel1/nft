import "../styles/css/bootstrap.min.css";
import "../styles/css/bootstrap-grid.min.css";
import "../styles/css/bootstrap-reboot.min.css";
import "../styles/css/animate.css";
import "../styles/css/owl.carousel.css";
import "../styles/css/owl.theme.css";
import "../styles/css/owl.transitions.css";
import "../styles/css/magnific-popup.css";
import "../styles/css/jquery.countdown.css";
import "../styles/css/style.css";
import "../styles/css/colors/scheme-01.css";
import '../styles/css/coloring.css';
// import '../styles/fonts/font-awesome/css/font-awesome.css';
// import '../styles/fonts/icofont/icofont.min.css';
import '../styles/fonts/elegant_font/HTML_CSS/style.css';
import '../styles/fonts/et-line-font/style.css';
import '@icon/icofont/icofont.css';
import Head from "next/head";
import Footer from "../components/footer";
// import Navbar from "./Navbar";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import Web3Modal from "web3modal";
import { providers, ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';
import { ConnectionContext } from '../context/context'
import { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { ellipseAddress, getChainData } from '../lib/utilities'


const INFURA_ID = 'abc5c37ab01b4f1c8483dd8f1533bc9d'
const providerOptions = {
  /* See Provider Options Section */
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet (not Coinbase App)',
    },
    options: {
      appName: 'Coinbase', // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options
      const walletLink = new WalletLink({
        appName,
      })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
      await provider.enable()
      return provider
    },
  },
};


let web3Modal

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}

type StateType = {
  provider?: any
  web3Provider?: any
  address?: string
  chainId?: number
}

type ActionType =
  | {
    type: 'SET_WEB3_PROVIDER'
    provider?: StateType['provider']
    web3Provider?: StateType['web3Provider']
    address?: StateType['address']
    chainId?: StateType['chainId']
  }
  | {
    type: 'SET_ADDRESS'
    address?: StateType['address']
  }
  | {
    type: 'SET_CHAIN_ID'
    chainId?: StateType['chainId']
  }
  | {
    type: 'RESET_WEB3_PROVIDER'
  }

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      throw new Error()
  }
}


function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    accountBalance();
  }, [])


  async function accountBalance() {
    if (web3Provider) {
      const provide = new ethers.providers.Web3Provider(window.ethereum, "any");
      const balance = provide.getBalance(address)
      setBalance(balance)
    }
  }

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()

    const network = await web3Provider.getNetwork()

    // setConnection(provider)

    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    })
  }, [])


  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider]
  )

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])


  // const chainData = getChainData(chainId)

  return (

    <>
      <Head>
        <link rel="icon" href="/images/logoo.png" type="image/gif" sizes="16x16" />
        <title>Kwon - NFT Marketplace</title>

        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="Kwon - NFT Marketplace " name="description" />
        <meta content="" name="keywords" />
        <meta content="" name="author" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"></link>

      </Head>
      <div id="wrapper">
        <div id="top"></div>
        <div className="no-bottom no-top" id="content">
          <header className="header-light scroll-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="de-flex sm-pt10">
                    <div className="de-flex-col">
                      <div className="de-flex-col">
                        {/* <!-- logo begin --> */}
                        <div id="logo">
                          <Link href="/">
                            <a>
                              <Image
                                alt=""
                                className="logo"
                                src="/images/logo.png"
                                width="167"
                                height="36"
                              />
                              {/* <Image
                          alt=""
                          className="logo-2"
                          src="/images/logo.png"
                          width="167"
                          height="36"
                        /> */}
                            </a>
                          </Link>
                        </div>
                        {/* <!-- logo close --> */}
                      </div>

                    </div>
                    <div className="de-flex-col header-col-mid">
                      {/* <!-- mainmenu begin --> */}
                      <ul id="mainmenu">
                        <li>
                          <Link href="/">
                            <a>Home</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/marketplace">
                            <a>MarketPlace</a>
                          </Link>
                        </li>
                      </ul>
                      <div className="menu_side_area">
                        <div className="de-login-menu">
                          {
                            web3Provider ? (
                              <>
                                <Link href="/create-item">
                                  <a className="btn-main"><i className="fa fa-plus"></i> <span> Create</span></a>
                                </Link>
                                <span className="dropmenu">
                                  <span id="de-click-menu" className="de-menu-profile">
                                    <img
                                      src="/images/author_single/author-9.jpg"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </span>
                                  <div id="de-submenu" className="de-submenu">
                                    <div className="d-name">
                                      <h4>Ryan Tellem</h4>
                                      {/* <a href="profile.html">Set display name</a> */}
                                    </div>
                                    <div className="spacer-10"></div>
                                    <div className="d-balance">
                                      <h4>Balance</h4>
                                      {balance} ETH
                                    </div>
                                    <div className="spacer-10"></div>
                                    <div className="d-wallet">
                                      <h4>My Wallet</h4>
                                      <span id="wallet" className="d-wallet-address">
                                        {address}
                                      </span>
                                      <button id="btn_copy" title="Copy Text">Copy</button>
                                    </div>

                                    <div className="d-line"></div>

                                    <ul className="de-submenu-profile">
                                      <li>
                                        <Link href="/profile">
                                          <a
                                          ><i className="fa fa-user"></i> My profile</a
                                          >
                                        </Link>
                                      </li>
                                      <li>
                                        <Link href="/dashboard">
                                          <a ><i className="fa fa-bars"></i> Dashboard</a>
                                        </Link>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0);" onClick={disconnect}><i className="fas fa-sign-out-alt"></i> Sign out</a>
                                      </li>
                                    </ul>
                                  </div>
                                </span>
                              </>
                            ) : (<button className="btn-main btn-wallet" onClick={connect}>
                              <i className="icon_wallet_alt"></i>
                              <span>Connect</span>
                            </button>)
                          }
                          <span id="menu-btn"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <ConnectionContext.Provider value={state}>
            <Component {...pageProps} />
          </ConnectionContext.Provider>

        </div>
        <Footer />
      </div>
      <Script src="/js/jquery.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/bootstrap.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/wow.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/jquery.isotope.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/easing.js" strategy="beforeInteractive"></Script>
      <Script src="/js/owl.carousel.js" strategy="beforeInteractive"></Script>
      <Script src="/js/jquery.magnific-popup.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/enquire.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/jquery.lazy.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/jquery.lazy.plugins.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/designesia.js" strategy="lazyOnload"></Script>

    </>


  );
}

export default MyApp;
