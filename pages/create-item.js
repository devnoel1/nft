import { useState, useContext,useEffect } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal';
import { WalletContext } from "../context/WalletContext"
import Swal from 'sweetalert2'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import { NFT, Market } from '../util/constant'

export default function CreateItem() {

  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  
  const connection = useContext(WalletContext)
  // const web3Provider = useContext(ConnectionContext);
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    // const web3Modal = new Web3Modal()
    // const connection = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(connection)    
    // const signer = provider.getSigner()

    const signer = connection.web3Provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    Swal.fire({
      title: 'Successful!',
      text: 'ITem Created Successfuly',
      icon: 'success',
      confirmButtonText: 'Cool'
    })
    router.push('/')
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
                <h1>Create NFT</h1>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="section">
        <div className="container">
          <div className="row wow fadeIn">
            <div className="col-lg-7 offset-lg-1">
              <form
                id="form-create-item"
                className="form-border"
                method="post"
                action="#"
              >
               <div className="field-set">
                  <h5>Upload file</h5>

                  <div className="d-create-file">
                    <p id="file_name">
                      PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                    </p>
                    <input
                      type="button"
                      id="get_file"
                      className="btn-main"
                      value="Browse"

                    />
                    <input type="file" id="upload_file" onChange={onChange} />
                  </div>
                  <div className="spacer-single"></div>
                  <h5>Title</h5>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 'Crypto Funk"
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                  />
                  <div className="spacer-single"></div>
                  <h5>Description</h5>
                  <textarea
                    data-autoresize
                    className="form-control"
                    placeholder="e.g. 'This is very limited item'"
                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                  ></textarea>
                  {/* <h5>Select method</h5> */}
                  <div className="de_tab tab_methods">
                    {/* <ul className="de_nav">
                        <li className="active">
                          <span><i className="fa fa-tag"></i>Fixed price</span>
                        </li>
                      
                      </ul> */}

                    <div className="de_tab_content">
                      <div id="tab_opt_1">
                        <h5>Price</h5>
                        <input
                          className="form-control"
                          placeholder="enter price for one item (ETH)"
                          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                        />
                      </div>

                      <div id="tab_opt_3"></div>
                    </div>
                  </div>
                 
                  <div className="spacer-single"></div>

                  <input
                    type="button"
                    id="submit"
                    className="btn-main"
                    value="Create Item"
                    onClick={createMarket}
                  />
                  <div className="spacer-single"></div>
                </div>
              </form>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <h5>Preview Image</h5>
              {
                fileUrl && (
                  <img className="rounded mt-4" width="350" src={fileUrl} />
                )
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
