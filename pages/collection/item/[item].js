import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { baseURL } from "../../../config";
import { WalletContext } from "../../../context/WalletContext.tsx";
import ListItem from "../../../components/listItem";
import BuyNFT from "../../../components/buy";

export default function ItemDetails() {
  const [itemDetails, setItemDetails] = useState({});
  const { address, currentUser } = useContext(WalletContext);

  // Define router
  const router = useRouter();
  const routeHasQuery = Object.keys(router.query)?.length > 0;
  const selectedRow = router.query;

  // Define isMounted
  const isMounted = useRef(null);

  useEffect(() => {
    // On mount
    isMounted.current = true;
    // If route has query
    if (!router.isReady) return;
    const id = router.query.item;

    getItemDetails(id);

    // Clean up
    return () => (isMounted.current = false);
  }, [router.isReady]);

  async function getItemDetails(id) {
    fetch(baseURL + "/api/collectionItem/" + id)
      .then((res) => res.json())
      .then(async (data) => {
        // console.log(data)
        if (data.status == "success") {
          const collection = await axios.get(
            baseURL + "/api/collection/" + data.data.collectonId
          );
          // console.log(collection)
          const user = await axios.get(
            baseURL + "/api/user/" + collection.data.data.userId
          );
          //   console.log(user);
          let item = {
            id: data.data._id,
            title: data.data.title,
            pics: data.data.pics,
            price: data.data.price,
            collection: data.collection,
            onSell: data.data.isListed,
            sold: data.data.isSold,
            description: data.data.description,
            collectionName: collection.data.data.title,
            collectonPics: collection.data.data.pics,
            creatorName: user.data.data.username,
            creatorPics: user.data.data.profile_pics,
            creatorAddress: user.data.data.wallet_address,
          };

          setItemDetails(item);
        } else {
          console.log(data);
        }
      });
  }

  return (
    <>
      <section aria-label="section" className="d_coll">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 text-center">
              <img
                src={itemDetails.pics}
                className="img-fluid img-rounded mb-sm-30"
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="item_info">
                <h2>{itemDetails.title}</h2>
                {/* <div className="item_info_counts">
                                    <div className="item_info_type"><i className="fa fa-image"></i>Art</div>
                                    <div className="item_info_views"><i className="fa fa-eye"></i>250</div>
                                    <div className="item_info_like"><i className="fa fa-heart"></i>18</div>
                                </div> */}
                <p>{itemDetails.description}</p>

                <div className="d-flex flex-row">
                  <div className="mr40">
                    <h6>Creator</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <a href="">
                          <img
                            className="lazy"
                            src={
                              itemDetails.creatorPics
                                ? itemDetails.creatorPics
                                : "/images/author_single/author-9.jpg"
                            }
                            height="50"
                            width="50"
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </a>
                      </div>
                      <div className="author_list_info">
                        <a href="">
                          {itemDetails.creatorName
                            ? itemDetails.creatorName
                            : "Unknown"}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6>Collection </h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <a href="">
                          <img
                            className="lazy"
                            src={itemDetails.collectonPics}
                            height="50"
                            width="50"
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </a>
                      </div>
                      <div className="author_list_info">
                        <a href="">{itemDetails.collectionName}</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="spacer-40"></div>

                <div className="de_tab tab_simple">
                  {/* <ul className="de_nav">
                                    <li className="active"><span>Details</span></li>
                                    <li><span>Bids</span></li>
                                    <li><span>History</span></li>
                                </ul> */}
                  <div className="de_tab_content">
                    <div className="tab-1">
                      {/* <h6>Owner</h6>
                                        <div className="item_author">                                    
                                            <div className="author_list_pp">
                                                <a href="author.html">
                                                    <img className="lazy" src="/images/author/author-10.jpg" alt=""/>
                                                    <i className="fa fa-check"></i>
                                                </a>
                                            </div>                                    
                                            <div className="author_list_info">
                                                <a href="author.html">Stacy Long</a>
                                            </div>
                                        </div> */}

                      <div className="spacer-30"></div>
                    </div>
                  </div>
                  <div className="spacer-10"></div>
                  <h6>Price</h6>
                  <div className="nft-item-price">
                    <img src="/images/misc/ethereum.svg" alt="" />
                    <span>{itemDetails.price}</span>
                  </div>
                  {!itemDetails.sold ? (
                    <>
                      {itemDetails.creatorAddress != address &&
                      itemDetails.onSell ? (
                        <BuyNFT nft={itemDetails} />
                      ) : (
                        ""
                      )}
                      &nbsp;
                      {itemDetails.creatorAddress == address &&
                      !itemDetails.onSell ? (
                        <ListItem itemDetails={itemDetails} />
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
