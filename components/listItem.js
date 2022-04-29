import Web3Modal from "web3modal";
import { WalletContext } from "../context/WalletContext.tsx";
import { useContext, useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import { useAlert } from "react-alert";
import axios from "axios";
import { baseURL } from "../config";
import { nftaddress, nftmarketaddress } from "../config";
import { NFT, Market } from "../util/constant";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function ListItem({ itemDetails }) {
  const { address, currentUser, web3Provider } = useContext(WalletContext);
  const [formInput, updateFormInput] = useState({
    price: itemDetails.price,
    name: itemDetails.title,
    description: itemDetails.description,
    image: itemDetails.pics,
    itemId: itemDetails.id,
  });

  // Define alert
  const alert = useAlert();

  async function addItem() {
    const { name, description, price, image, itemId } = formInput;
    const data = JSON.stringify({
      name,
      description,
      image,
      itemId,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const signer = web3Provider.getSigner();

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price.toString(), "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });

    await transaction.wait();

    axios
      .post(baseURL + "/api/collectionItem/update", {
        tokenId: tokenId.toString(),
        status: true,
        id: formInput.itemId,
      })
      .then((data) => {
        // console.log(data)
        if(data.data.status == "success")
        {
          alert.success("Item added successfuly");
        }else{
          console.log(data)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <button className="btn-main" onClick={addItem}>
      List to Market
    </button>
  );
}
