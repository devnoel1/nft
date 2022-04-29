import { ethers } from "ethers";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { WalletContext } from "../context/WalletContext";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import { useAlert } from "react-alert";

import { nftaddress, nftmarketaddress } from "../config";

import { NFT, Market } from '../util/constant';


const BuyNFT = ({nft}) => {
    const { address, currentUser,web3Provider,balance } = useContext(WalletContext);
    const router = useRouter()
    // Define alert
    const alert = useAlert();
    
    async function buyNft(nft) {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */

        // const web3Modal = new Web3Modal();
        // const connection = await web3Modal.connect();
        // const provider = new ethers.providers.Web3Provider(connection);

        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

        /* user will be prompted to pay the asking proces to complete the transaction */
        const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
        try{
            const transaction = await contract.createMarketSale(
                nftaddress,
                nft.tokenId,
                {
                    value: price,
                }
            );
            await transaction.wait();
            alert.success("Item Purchased successfuly");
             router.push('/')

        }catch(error)
        {
            alert.error("Something went wrong");
        }          
       
    }

    return (
        <button className="btn btn-sm btn-primary" onClick={() => buyNft(nft)}>Buy Now </button>
    )
}

export default BuyNFT