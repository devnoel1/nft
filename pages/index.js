import Image from "next/image";
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

export default function Home() {

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
        id="section-hero"
        aria-label="section"
        className="no-top no-bottom vh-100"
        data-bgimage="url(/images/background/bg-shape-1.jpg) bottom"
      >
        <div className="v-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="spacer-single"></div>
                <h6 className="wow fadeInUp" data-wow-delay=".5s">
                  <span className="text-uppercase id-color-2">
                    Kwon NFT Market
                  </span>
                </h6>
                <div className="spacer-10"></div>
                <h1 className="wow fadeInUp" data-wow-delay=".75s">
                  Buy, Sell or Collect digital items. Instantly.
                </h1>
                <p className="wow fadeInUp lead" data-wow-delay="1s">
                  Turn your artwork into publicly tradable items, Discover
                  artwork, explore communities, and support artists on the
                  blockchain
                </p>
                <div className="spacer-10"></div>
                <a
                  href="explore.html"
                  className="btn-main wow fadeInUp lead"
                  data-wow-delay="1.25s"
                >
                  Browse MarketPlace
                </a>
                <div className="mb-sm-30"></div>
              </div>
              <div className="col-md-6 xs-hide">
                <Image
                  src="/images/misc/women-with-vr.png"
                  width="1400"
                  height="1300"
                  className="lazy img-fluid wow fadeIn"
                  data-wow-delay="1.25s"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section-intro" className="no-top no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-sm-30">
              <div className="feature-box f-boxed style-3">
                <i className="wow fadeInUp bg-color-2 i-boxed icon_wallet"></i>
                <div className="text">
                  <h4 className="wow fadeInUp">Set up your wallet</h4>
                  <p className="wow fadeInUp" data-wow-delay=".25s">
                    Download the metamask wallet from google chrome extension,
                    setup and connect with ethereum mainnet.
                  </p>
                </div>
                <i className="wm icon_wallet"></i>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-sm-30">
              <div className="feature-box f-boxed style-3">
                <i className="wow fadeInUp bg-color-2 i-boxed icon_cloud-upload_alt"></i>
                <div className="text">
                  <h4 className="wow fadeInUp">Add your NFTs</h4>
                  <p className="wow fadeInUp" data-wow-delay=".25s">
                    Click the Create button to Add Your Unique nft to the
                    ethereum network with few simple steps
                  </p>
                </div>
                <i className="wm icon_cloud-upload_alt"></i>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-sm-30">
              <div className="feature-box f-boxed style-3">
                <i className="wow fadeInUp bg-color-2 i-boxed icon_tags_alt"></i>
                <div className="text">
                  <h4 className="wow fadeInUp">Buy/Sell NFTs</h4>
                  <p className="wow fadeInUp" data-wow-delay=".25s">
                    Sell your NFts, Discover artwork, explore communities,
                    support artists and Buy Nows.
                  </p>
                </div>
                <i className="wm icon_tags_alt"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section-nfts">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>All Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
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
          </div>
          {
            loadingState === 'loaded' && !filteredData.length ? (<h1 className="py-10 px-20 text-3xl text-center text-warning">no result found</h1>)
              :
              (
                <div className="row">
                  {
                    filteredData.map((nft, i) => (
                      <NFTCard key={i} nft={nft} />
                    ))
                  }
                </div>
              )
          }
        </div>
      </section>
    </>
  );
};

