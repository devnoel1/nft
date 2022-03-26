/* pages/my-assets.js */
import { ethers } from 'ethers'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Web3Modal from "web3modal";
import { ConnectionContext } from '../../context/context';

import {
    nftmarketaddress, nftaddress
} from '../../config'


import { NFT, Market } from '../../util/constant'
import BuyNFT from '../../components/buy';

export default function AssetDetails() {
    const [nfts, setNfts] = useState([])
    const [details, setDetails] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    const router = useRouter()

    useEffect(() => {
     
        if (!router.isReady) return;
        const token = router.query.tokenId;
        console.log(token)
        loadNFT(token)
    }, [router.isReady]);


    async function loadNFT(tokenId) {
         /* create a generic provider and query for unsold market items */
    // const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/08ddd37788424896a43b0d150b742aa0");
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          sold:i.sold,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    const itemDetails = items.find(i => i.tokenId == tokenId)
    
    setNfts(items)
    setDetails(itemDetails)
    }

    return (<>

        <section
            id="subheader"
            className="text-light"
            // data-bgimage="url(/images/background/subheader.jpg) top"
            style={{ 'background': "url(/images/background/subheader.jpg) "}}
        >
            <div className="center-y relative text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>Item Details</h1>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </section>
        <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
                {
                   <div className="row">
                   <div className="col-md-6 text-center">
                       <img
                           src={details.image}
                           className="img-fluid img-rounded mb-sm-30"
                           alt=""
                       />
                   </div>
                   <div className="col-md-6">
                       <div className="item_info">
                           <h2>{details.name}</h2>

                           <p>
                               {details.description}
                           </p>

                           <div className="d-flex flex-row">
                               <div className="de_tab_content">
                                   {/* <div className="tab-1">
                                       <h6>Owner</h6>
                                       <div className="item_author">
                                           <div className="author_list_pp">
                                               <a href="author.html">
                                                   <img
                                                       className="lazy"
                                                       src="images/author/author-9.jpg"
                                                       alt=""
                                                   />
                                                   <i className="fa fa-check"></i>
                                               </a>
                                           </div>
                                           <div className="author_list_info">
                                               <a href="author.html">Ryan Tellem</a>
                                           </div>
                                       </div>

                                       <div className="spacer-40"></div>
                                   </div> */}
                               </div>
                           </div>

                           <div className="de_tab tab_simple">
                               <div className="spacer-10"></div>

                               <h6>Price</h6>
                               <div className="nft-item-price">
                                   {details.price} ETH
                               </div>
                               <BuyNFT nft={details}/>
                           </div>
                       </div>
                   </div>
               </div>
                }
            </div>
        </section>
    </>)
}
