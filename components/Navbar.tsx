import { WalletContext } from "../context/WalletContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useOnclickOutside from "react-cool-onclickoutside";

const Navbar = () => {
  const { web3Provider, connect, disconnect, address, balance, currentUser } =
    useContext(WalletContext);
  const [openMenu, setOpenMenu] = useState(false);

  const handleBtnClick = (): void => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = (): void => {
    setOpenMenu(false);
  };

  const ref = useOnclickOutside(() => {
    closeMenu();
  });


  return (
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
                      </a>
                    </Link>
                  </div>
                  {/* <!-- logo close --> */}
                </div>
                <div className="de-flex-col">
                  <input
                    id="quick_search"
                    className="xs-hide"
                    name="quick_search"
                    placeholder="search item here..."
                    type="text"
                  />
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
                  <li>
                    <a href="#">
                      Community<span></span>
                    </a>
                    <ul>
                      <li>
                        <a href="#">Our Team</a>
                      </li>
                      <li>
                        <a href="#">See FAQ</a>
                      </li>
                      <li>
                        <a href="#">Careers</a>
                      </li>
                      <li>
                        <a href="#">Twitter</a>
                      </li>
                      <li>
                        <a href="#">Discord</a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="menu_side_area">
                  <div className="de-login-menu">
                    {web3Provider ? (
                      <>
                        <Link href="/create">
                          <a className="btn-main">
                            <i className="fa fa-plus"></i> <span> Create</span>
                          </a>
                        </Link>
                        <span className="dropmenu" ref={ref}>
                          <span
                            id="de-click-menu"
                            className="de-menu-profile"
                            onClick={handleBtnClick}
                          >
                            <img
                              src={
                                currentUser && currentUser.profile_pics
                                  ? currentUser.profile_pics
                                  : "/images/author_single/author-9.jpg"
                              }
                              className="img-fluid"
                              alt=""
                            />
                          </span>
                          {openMenu && (
                            <div id="de-submenu" className="de-submenu">
                              <div className="d-name">
                                <h4 className="text-capitalize">
                                  {currentUser.username}
                                </h4>
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
                                <button id="btn_copy" title="Copy Text">
                                  Copy
                                </button>
                              </div>

                              <div className="d-line"></div>

                              <ul className="de-submenu-profile">
                                <li>
                                  <Link href={"/profile/"+address}>
                                    <a>
                                      <i className="fa fa-user"></i> My profile
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/dashboard">
                                    <a>
                                      <i className="fa fa-bars"></i> Dashboard
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <a
                                    href="javascript:void(0);"
                                    onClick={disconnect}
                                  >
                                    <i className="fa fa-sign-out"></i> Sign
                                    out
                                  </a>
                                </li>
                              </ul>
                            </div>
                          )}
                        </span>
                      </>
                    ) : (
                      <button className="btn-main btn-wallet" onClick={connect}>
                        <i className="icon_wallet_alt"></i>
                        <span>Connect</span>
                      </button>
                    )}
                    <span id="menu-btn"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
