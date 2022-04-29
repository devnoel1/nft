import { ethers } from "ethers";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { WalletContext } from "../context/WalletContext";

//getting contract address
import { nftaddress, nftmarketaddress } from "../config";

//getting contract abis
import { NFT, Market } from "../util/constant";
import NFTCard from "./nftCard";

const ColumnItems = () => {
  const [nftSlice, setNftSlice] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [filteredData, setFilteredData] = useState(nfts);
  const [loadingState, setLoadingState] = useState("loading");

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    // const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/08ddd37788424896a43b0d150b742aa0");
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com"
    );
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
    // setNftSlice(items);
    // const sliceData = nftSlice.slice(0, 8);
    setNfts(items);
    setFilteredData(items);
    setLoadingState("loaded");
  }

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];

    result = nfts.filter((data) => {
      if (value !== "") {
        return data?.name?.toLowerCase()?.includes(value?.toLowerCase());
      }
      return data;
    });
    setFilteredData(result);
  };

  const loadMore = () => {
    let nftState = filteredData;
    let start = nftState.length;
    let end = nftState.length + 4;
    setFilteredData(nftSlice.slice(start, end));
    setLoadingState("loaded");
  };

  return (
    <>
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
            <span href="#" id="btn-submit">
              <i className="fa fa-search bg-color-secondary"></i>
            </span>
            <div className="clearfix"></div>
          </div>
        </form>
      </div>
      {loadingState == "loading" ? (
        <div className="d-flex justify-content-center">
          <img src="/images/loading.gif" alt="" />
        </div>
      ) : (
        <>
          {loadingState === "loaded" && !filteredData.length ? (
            <h4 className="py-10 px-20 text-3xl text-center text-warning">
              no result found
            </h4>
          ) : (
            <div className="row">
              {filteredData.map((nft, i) => (
                <NFTCard key={i} nft={nft} loadNFTs={loadNFTs} />
              ))}
            </div>
          )}
          {/* {filteredData.length !== nftSlice.length && (
    <div class="col-md-12 text-center">
      <button
        type="button"
        onClick={() => loadMore()}
        class="btn-main wow fadeInUp lead"
      >
        Load more
      </button>
    </div>
  )} */}
        </>
      )}
    </>
  );
};

export default ColumnItems;
