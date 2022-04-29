import { useContext, useState } from "react";
import { Button, Card, CardHeader, CardBody, Modal } from "reactstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { WalletContext } from "../context/WalletContext";
import axios from "axios";
import Swal from 'sweetalert2'

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CollectionModal({ modalFormOpen, setModalFormOpen,getCollections }) {
  const [formInput, updateFormInput] = useState({
    name: "",
    symbol: "",
    description: "",
  });
  const [filePath, setFilePath] = useState(null);
  const { address, currentUser } = useContext(WalletContext);

  const fileUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFilePath(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const createCollection = async () => {
    const { name, description, symbol } = formInput;
    if (!name || !description || !symbol || !filePath) return;

    await axios.post("/api/collection", {
      name: name,
      address: address,
      pics: filePath,
      symbol: symbol,
      description: description,
    }).then(function (data) {
      // console.log(data)
        
        if(data.data.status == "success")
        {
          Swal.fire({
            title: "Successful!",
            text: data.data.message,
            icon: "success",
            confirmButtonText: "Cool",
          });
          getCollections()
          setModalFormOpen(false)
        }else{
          Swal.fire({
            title: "Not Successful!",
            text: "Something went wrong ",
            icon: "error",
            confirmButtonText: "Cool",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePics = () => {
    document.getElementById("file").click();
  };

  return (
    <Modal isOpen={modalFormOpen} toggle={() => setModalFormOpen(false)}>
      <div className=" modal-body p-0">
        <Card className="shadow border-0">
          <CardHeader className=" bg-white">
            <div className=" text-muted text-center">
              <h3 className="mb-0 py-2">Collection</h3>
            </div>
          </CardHeader>
          <CardBody className=" px-lg-5 py-lg-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      className="rounded"
                      width="150"
                      height="150"
                      src={
                        filePath
                          ? filePath
                          : "/images/author_single/author-9.jpg"
                      }
                    />
                  </div>
                  <div className="col-lg-6">
                    <p>
                      We recommend an image of at least 300x300. Gifs work too.
                      Max 5mb.
                    </p>
                    <input type="file" id="file" onChange={fileUpload} hidden />
                    <button
                      type="button"
                      className="btn btn-primary"
                      id="fileButton"
                      onClick={handlePics}
                    >
                      Choose File
                    </button>
                  </div>
                </div>
                <div className="spacer-10"></div>
                <h5>Display Name</h5>
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
                <h5>Symbol</h5>
                <input
                  type="text"
                  name="item_title"
                  id="item_title"
                  className="form-control"
                  placeholder="e.g. 'CF"
                  onChange={(e) =>
                    updateFormInput({ ...formInput, symbol: e.target.value })
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
                    updateFormInput({
                      ...formInput,
                      description: e.target.value,
                    })
                  }
                ></textarea>

                <div className="spacer-10"></div>
                <div className="d-flex flex-columb justify-content-center">
                  <button
                    type="button"
                    className="btn-main"
                    onClick={createCollection}
                  >
                    Create Collection
                  </button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
}
