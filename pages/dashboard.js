import { ethers } from 'ethers'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import Web3Modal from "web3modal";
import MyAssets from '../components/myassets';
import Sold from '../components/sold';
import Created from '../components/created';
import Collections from '../components/Collections';
import { WalletContext } from "../context/WalletContext";

export default function Dashboard() {
  const { address, currentUser,web3Provider,balance } = useContext(WalletContext);
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [openMenu3, setOpenMenu3] = useState(false);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };

  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };

  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn3").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  

  return (
    <>
      <section
        id="profile_banner"
        aria-label="section"
        className="text-light"
        //   data-bgimage="url(images/background/subheader.jpg) top"
        style={{ 'background': "url(images/background/subheader.jpg) " }}
      ></section>
      <section aria-label="section">
        <div className="container">
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <img src={ currentUser.profile_pics? currentUser.profile_pics:"images/author_single/author-9.jpg"} alt="" />
                    <i className="fa fa-check"></i>
                    <div className="profile_name">
                      <h4>
                       {currentUser.username}
                        <span className="profile_username">{currentUser.email}</span>
                        <span id="wallet" className="profile_wallet"
                        >{address}</span
                        >
                        <button id="btn_copy" title="Copy Text">Copy</button>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <ul className="de_nav mb-5">
                  <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>Assets</span></li>
                  <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Created</span></li>
                  <li id='Mainbtn2' className=""><span onClick={handleBtnClick2}>Sold</span></li>
                  <li id='Mainbtn3' className=""><span onClick={handleBtnClick3}>Collections</span></li>
                </ul>

                <div className="py-3">
                  {openMenu &&(
                    <div className="onStep fadeIn">
                    <MyAssets/>
                   
                  </div>
                  )
                  }

                 {
                   openMenu1 && (
                    <div className="onStep fadeIn">
                    <Created/>
                  
                  </div>
                   )
                 }

                  {
                    openMenu2 && (
                      <div className="onStep fadeIn">
                      <Sold/>
                      
                  </div>
                    )
                  }
                  {
                    openMenu3 && (
                      <div className="onStep fadeIn">
                          <Collections/>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}