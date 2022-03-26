import { ethers } from "ethers";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { ConnectionContext } from '../context/context';
import NFTCard from "../components/nftCard";


//getting contract address
import { nftaddress, nftmarketaddress } from "../config";

//getting contract abis
import { NFT, Market } from '../util/constant'


export default function Marketplace() {
  const [nfts, setNfts] = useState([]);
  const [filteredData,setFilteredData] = useState(nfts);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];

    result = nfts.filter((data)=>{
      if (value !== "") {
        return data?.name?.toLowerCase()?.includes(value?.toLowerCase())
      }
      return data
    })
    setFilteredData(result);
  }

  async function loadNFTs() {
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
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setFilteredData(items)
    setLoadingState("loaded");
  }

  return (
    <>
      <section
        id="subheader"
        className="text-light"
        // data-bgimage="url(/images/background/subheader.jpg) top"
        style={{ 'background': "url(/images/background/subheader.jpg) " }}
      >
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Market Place</h1>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="section">
        <div className="container">
          <div className="col-lg-12">
            <div className="items_filter">
              <form
                className="row form-dark"
                id="form_quick_search"
                method="post"
                name="form_quick_search"
              >
                <div className="col text-center">
                  <input
                    className="form-control"
                    placeholder="search item here..."
                    type="text"
                    onChange={(event) => handleSearch(event)}
                  />
                  <span href="#" id="btn-submit"
                  ><i className="fa fa-search bg-color-secondary"></i
                  ></span>
                  <div className="clearfix"></div>
                </div>
              </form>

              {/* <div id="item_category" className="dropdown">
                <a href="#" className="btn-selector">All categories</a>
                <ul>
                  <li className="active"><span>All categories</span></li>
                  <li><span>Art</span></li>
                  <li><span>Music</span></li>
                  <li><span>Domain Names</span></li>
                  <li><span>Virtual World</span></li>
                  <li><span>Trading Cards</span></li>
                  <li><span>Collectibles</span></li>
                  <li><span>Sports</span></li>
                  <li><span>Utility</span></li>
                </ul>
              </div> */}

              {/* <div id="buy_category" className="dropdown">
                <a href="#" className="btn-selector">Buy Now</a>
                <ul>
                  <li className="active"><span>Buy Now</span></li>
                  <li><span>On Auction</span></li>
                  <li><span>Has Offers</span></li>
                </ul>
              </div> */}

              {/* <div id="items_type" className="dropdown">
                <a href="#" className="btn-selector">All Items</a>
                <ul>
                  <li className="active"><span>All Items</span></li>
                  <li><span>Single Items</span></li>
                  <li><span>Bundles</span></li>
                </ul>
              </div> */}
            </div>
          </div>
          {
            loadingState === 'loaded' && !filteredData.length ? (<h1 className="py-10 px-20 text-3xl text-center text-warning">no result found</h1>)
              :
              (
                <div className="row">
                  {
                    filteredData.map((nft, i) => (
                      <NFTCard key={i} nft={nft} loadNFTs={loadNFTs} />
                    ))
                  }
                </div>
              )
          }
        </div>
      </section>
    </>
  )
}

