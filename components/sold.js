import { ethers } from 'ethers'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import Web3Modal from "web3modal";

import { nftaddress, nftmarketaddress } from "../config";

import { NFT, Market } from '../util/constant'
import { Fragment } from 'react/cjs/react.production.min';

export default function Sold() {
    const [sold, setSold] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNFTs()
    }, []);

    async function loadNFTs() {
        const web3Modal = new Web3Modal({
          network: "mainnet",
          cacheProvider: true,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
    
        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const data = await marketContract.fetchItemsCreated()
    
        const items = await Promise.all(data.map(async i => {
          const tokenUri = await tokenContract.tokenURI(i.tokenId)
          const meta = await axios.get(tokenUri)
          let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            sold: i.sold,
            image: meta.data.image,
          }
          return item
        }))
        
        /* create a filtered array of items that have been sold */
        const soldItems = items.filter(i => i.sold)
        setSold(soldItems)
        setLoadingState('loaded') 
      }

    return (
        <>
            {
                Boolean(sold.length) && (
                    <div className="row">
                          {
                            sold.map((nft, i) => (
                              <div key={i} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <div className="nft__item">
                                  {/* <div className="author_list_pp">
                                    <a
                                      href=""
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Creator: Lori Hart"
                                    >
                                      <Image
                                        className="lazy"
                                        src="/images/author/author-9.jpg"
                                        alt=""
                                        height={'100px'}
                                        width={'100%'}
                                      />
                                      <i className="fa fa-check"></i>
                                    </a>
                                  </div> */}
                                  <div className="nft__item_wrap">
                                    <div className="nft__item_extra">
                                      <div className="nft__item_buttons">
                                        <button onClick={() => buyNft(nft)}>Buy Now</button>
                                      </div>
                                    </div>
                                    <a href={"/token/" + nft.tokenId}>
                                      <img
                                        src={nft.image}
                                        className="lazy nft__item_preview"
                                        alt=""
                                      />
                                    </a>
                                  </div>
                                  <div className="nft__item_info">
                                    <a href={"/token/" + nft.tokenId}>
                                      <h4>{nft.name}</h4>
                                    </a>
                                    {/* <div className="nft__item_click">
                                      <span></span>
                                    </div> */}
                                    <div className="nft__item_price">
                                      {nft.price} ETH<span></span>
                                    </div>
                                    <div className="nft__item_action">
                                      <Fragment>
                                        <a href={"/token/" + nft.tokenId} className="btn btn-sm btn-primary" >View Details</a>
                                      </Fragment>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                )
            }
        </>
    )
}