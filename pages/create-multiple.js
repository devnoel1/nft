import { useContext, useEffect, useState } from "react";
import CollectionModal from "../components/collectionModal";
import { createGlobalStyle } from "styled-components";
// import prisma from "../lib/prisma";
import { WalletContext } from "../context/WalletContext";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Swal from "sweetalert2";

const GlobalStyles = createGlobalStyle`
  .radio-label{
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .radio-label input{
    position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  }
  .checkmark {
  display: flex;
	flex-direction: column;
  height: 100px;
  }

  .radio-label:hover input ~ .checkmark {
    background-color: #ccc;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
 
`;
const ipfs_client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateMultiple() {
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const { address, currentUser } = useContext(WalletContext);
  const [collections,setCollections] = useState({});
  const [loaded,setLoaded] = useState(false);
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '',collection:'' })
  
  useEffect(() => {
    getCollections();
  }, []);

  async function getCollections () {
    // const data = await fetch()
    const data = await axios.get('/api/collection');
  
    if(data.status == 200 && data.data)
    {
      const items = await Promise.all(
        data.data.map(async (i)=>{
          let item = {
            id:i.id,
            title:i.title,
            symbol:i.symbol,
            pics:i.pics,
            user:i.userId
          }
          return item;
        })
      )

      if(address)
      {
        const collectionItems = items.filter(i=>i.user == address)
      
        setCollections(collectionItems)
        setLoaded(true)
      }
      
    }else{
      setCollections({})
      setLoaded(false)
    }
  };


  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await ipfs_client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    
  }

  async function createItem()
  {
    const { name, description, price,collection } = formInput
    
    if (!name || !description || !fileUrl || !collection) return;

    await axios.post('/api/collectionItem',{
      title:name,
      description:description,
      price:price,
      collectionId:parseInt(collection),
      pics:fileUrl,
    }).then(data=>{
      // console.log(data)
      if(data.status == 200)
        {
          Swal.fire({
            title: "Successful!",
            text: data.message,
            icon: "success",
            confirmButtonText: "Cool",
          });
        }else if(data.status == 500){
          Swal.fire({
            title: "Not Successful!",
            text: "Something went wrong ",
            icon: "error",
            confirmButtonText: "Cool",
          });
        }
    }).catch(error=>{
      console.log(error)
    })
  } 

  const handlePics = () => {
    document.getElementById("upload_file").click();
  };

  return (
    <>
      <GlobalStyles />
      <section
        id="subheader"
        className="text-light"
        // data-bgimage="url(/images/background/subheader.jpg) top"
        style={{ background: "url(/images/background/subheader.jpg) " }}
      >
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Create Item</h1>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Upload file</h5>

                <div className="d-create-file">
                  <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                  <div className="browse">
                    <input
                      type="button"
                      onClick={handlePics}
                      className="btn-main"
                      value="Browse"
                    />
                    <input
                      id="upload_file"
                      type="file"
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="spacer-single"></div>
                <h5>Choose collection</h5>
                <div className="de_tab tab_methods">
                  <ul className="de_nav">
                    <li id="btn1" onClick={() => setModalFormOpen(true)}>
                      <span>
                        <i className="fa fa-plus"></i>Create
                      </span>
                    </li>
                    {
                      !loaded && !collections.length ? (<li><h6>no collection</h6></li>):(
                        <span>
                          {
                          collections.map((item,i)=>(
                            <li key={i}>
                            <label className="radio-label">
                              <input type="checkbox"  value={item.id} onChange={e => updateFormInput({ ...formInput, collection: e.target.value })} hidden />
                              <span className="checkmark">
                                <img src={item.pics} className="rounded-circle" alt="" height="45" width="45" />
                                <h6 className="mt-2 mb-0">{item.title}</h6>
                              </span>
                            </label>
                          </li>
                          ))
                        }
                        </span>
                      )
                    }
                  </ul>
                </div>

                <div className="spacer-20"></div>

                <h5>Title</h5>
                <input
                  type="text"
                  name="item_title"
                  id="item_title"
                  className="form-control"
                  
                  placeholder="e.g. 'Crypto Funk"
                  onChange={(e) =>
                    updateFormInput({ ...formInput, name: e.target.value })
                  }
                />

                <div className="spacer-10"></div>

                <h5>Description</h5>
                <textarea
                  data-autoresize
                  name="item_desc"
                  id="item_desc"
                  className="form-control"
                  placeholder="e.g. 'This is very limited item'"
                  onChange={(e) =>
                    updateFormInput({ ...formInput, description: e.target.value })
                  }
                ></textarea>

                <div className="spacer-10"></div>

                <h5>Price</h5>
                <input
                  type="text"
                  name="item_price"
                  id="item_price"
                  className="form-control"
                  placeholder="enter price for one item (ETH)"
                  onChange={(e) =>
                    updateFormInput({ ...formInput, price: e.target.value })
                  }
                />

                <div className="spacer-10"></div>

                <input
                  type="button"
                  id="submit"
                  className="btn-main"
                  value="Create Item"
                  onClick={createItem}
                />
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <div className="nft__item m-0">
              <div className="nft__item_wrap">
                <span>
                  <img
                    src={fileUrl ?  fileUrl:"/images/collections/coll-item-3.jpg"}
                    id="get_file_2"
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CollectionModal
        modalFormOpen={modalFormOpen}
        setModalFormOpen={setModalFormOpen}
        getCollections={getCollections}
      />
    </>
  );
}
