import { ethers } from "ethers";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { ConnectionContext } from '../context/context';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'

import { nftaddress, nftmarketaddress } from "../config";

import { NFT, Market } from '../util/constant';


const BuyNFT = ({nft}) => {
    const connector = useContext(ConnectionContext);
    const router = useRouter()
    
    async function buyNft(nft) {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */

        // const web3Modal = new Web3Modal();
        // const connection = await web3Modal.connect();
        // const provider = new ethers.providers.Web3Provider(connection);

        if(!connector.web3Provider)
        {
            Swal.fire({
                title: 'Authentication Message!',
                text: 'you are not connected to any wallet ',
                icon: 'warning',
                confirmButtonText: 'ok'
              });

              return 
        }

        const signer = connector.web3Provider.getSigner();
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
        }catch(error)
        {
              return Swal.fire({
                title: 'error',
                text: error.code,
                icon: 'warning',
                confirmButtonText: 'ok'
              });
        }
        
        Swal.fire({
            title: 'Successful!',
            text: 'Item Purchased Successfuly',
            icon: 'success',
            confirmButtonText: 'Cool'
          });
          
        router.push('/')
    }

    return (
        <button className="btn btn-sm btn-primary" onClick={() => buyNft(nft)}>Buy Now </button>
    )
}

export default BuyNFT