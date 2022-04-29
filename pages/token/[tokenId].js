/* pages/my-assets.js */
import { ethers } from "ethers";
import { useEffect, useState, useContext,useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import Swal from "sweetalert2";
import { WalletContext } from "../../context/WalletContext";
import { ValidationErr } from "../../components/ValidationError";

import { nftmarketaddress, nftaddress } from "../../config";

import { NFT, Market } from "../../util/constant";

export default function AssetDetails() {
  const { address, currentUser, web3Provider, balance } =
    useContext(WalletContext);
  const [details, setDetails] = useState({});
  const [priceErr,setPriceErr] = useState(false)
  const [loadingState, setLoadingState] = useState(null);
  const [formInput, updateFormInput] = useState({ price: "" });
  const router = useRouter();

  // Define isMounted
  const isMounted = useRef(null);
 

  useEffect(() => {
    if (!router.isReady) return;
    const token = router.query.tokenId;

    // On mount
    isMounted.current = true;

    (async()=>{
      loadNFTs(token)
    })();



    return () => (isMounted.current = false);
 
  }, []);


  async function loadNFTs(tokenId) {
    setLoadingState("loading");
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    // const signer = web3Provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(
      nftaddress,
      NFT.abi,
      provider
    );
    const data = await marketContract.fetchMyNFTs();

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
          name: meta.data?.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    //filter the id
    const Details = items.find((i) => i.tokenId == tokenId);

    // setNfts(items);
    setDetails(Details);
    setLoadingState("loaded");
  }

  async function sellNft(nft) {
    const { price } = formInput;

    if(!price)
    {
      setPriceErr(true)
      return
    }

    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();

    const signer = web3Provider.getSigner();

    /* give approval */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.giveResaleApproval(nft.tokenId);
    await transaction.wait();

    /* set market contract */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    /* then list the item for sale on the marketplace */
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    /* convert price to ether */
    const new_price = ethers.utils.parseUnits(formInput.price, "ether");

    /* user will be prompted to pay the asking proces to complete the transaction */
    try {
      transaction = await contract.listSoldItemToMarket(
        nftaddress,
        nft.tokenId,
        new_price,
        { value: listingPrice }
      );
    } catch (error) {
      return Swal.fire({
        title: "error",
        text: error.code,
        icon: "warning",
        confirmButtonText: "ok",
      });
    }

    try {
      await transaction.wait();
    } catch (error) {
      return Swal.fire({
        title: "error",
        text: error.code,
        icon: "warning",
        confirmButtonText: "ok",
      });
    }

    router.push("/");
  }

  return (
    <>
      <section
        id="subheader"
        className="text-light "
        // data-bgimage="url(/images/background/subheader.jpg) top"
        style={{ background: "url(/images/background/subheader.jpg) " }}
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
      {
        loadingState == "loading"? (<section aria-label="section">
          <h4 className="py-10 px-20  text-center text-warning">
            <img src="/images/loading.gif" alt=""/>
        </h4>
        </section>):(
          <section aria-label="section">
        <div className="container">
          {
            <div className="row">
              <div className="col-lg-7 offset-lg-1">
                <div className="field-set">
                  <h5>Title</h5>
                  {details?.name}
                  <div className="spacer-single"></div>
                  <h5>Description</h5>
                  {details?.description}
                  <div className="de_tab_content">
                    <div id="tab_opt_1">
                      <h5>Price</h5>
                      {details?.price} ETH
                    </div>
                  </div>
                  <div className="spacer-single"></div>
                  <div className="de_tab_content">
                    <div id="tab_opt_1">
                      <h5> New Price</h5>
                      <input
                        className="form-control"
                        placeholder="enter price for one item (ETH)"
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            price: e.target.value,
                          })
                        }
                      />
                      {
                  priceErr && (<ValidationErr msg="price field is required"/>)
                }
                    </div>
                  </div>
                </div>
                <div className="spacer-single"></div>
                <input
                  type="button"
                  id="submit"
                  className="btn-main"
                  value="Sell Digital Asset"
                  onClick={() => sellNft(details)}
                />
                
                <div className="spacer-single"></div>
              </div>

              <div className="col-lg-3 col-sm-6 col-xs-12">
                <h5>Preview Image</h5>

                <img className="rounded mt-4" width="350" src={details?.image} />
              </div>
            </div>
          }
        </div>
      </section>
        )
      }
    </>
  );
}
