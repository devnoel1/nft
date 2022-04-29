import Link from "next/link";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { baseURL } from "../../config";

export default function CollectionDetails() {
  const [collectionItems, setColletionItems] = useState({});
  const [itemsOnSale, setItemsOnsSell] = useState({});
  const [collection, setCollection] = useState({});

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
    const id = router.query.id;

    getCollections(id);

    // Clean up
    return () => (isMounted.current = false);
  }, [router.isReady]);

  async function getCollection(id) {
    fetch(baseURL + "/api/collection/" + id)
      .then((res) => res.json())
      .then(async (data) => {
        // console.log(data)
        const user = await axios.get(baseURL + "/api/user/" + data.data.userId);
        // console.log(user)
        let item = {
          id: data.data._id,
          title: data.data.title,
          user: data.data.userId,
          creatorName: user.data.data.username,
          profile_pics: user.data.data.profile_pics,
        };
        setCollection(item);
      });
  }

  async function getCollections(id) {
    getCollection(id);
    fetch(baseURL + "/api/collectionItem")
      .then((res) => res.json())
      .then(async (data) => {
        // console.log(data);
        if (data.status == "success") {
          const items = await Promise.all(
            data.data.map(async (i) => {
              let item = {
                id: i._id,
                title: i.title,
                symbol: i.symbol,
                price: i.price,
                pics: i.pics,
                user: i.userId,
                onSell: i.isListed,
                collection: i.collectonId,
              };
              return item;
            })
          );

          const collction_items = items.filter((i) => i.collection == id);
          const items_on_sale = items.filter((i) => (i.onSale = true));

          setItemsOnsSell(items_on_sale);
          setColletionItems(collction_items);
        } else {
          console.log(data);
        }
      });
  }

  return (
    <>
      <section
        id="profile_banner"
        aria-label="section"
        className="text-light"
        style={{ background: "url(/images/background/4.jpg) top" }}
      ></section>
      <section aria-label="section" className="d_coll no-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile">
                <div className="profile_avatar">
                  <div className="d_profile_img">
                    <img src={collection.profile_pics?collection.profile_pics:"/images/author_single/author-9.jpg"} alt=" " />
                    <i className="fa fa-check"> </i>
                  </div>
                  <div className="profile_name">
                    <h4>
                      {collection.creatorName? collection.creatorName:"Unknown" }
                      <div className="clearfix"></div>
                      <span id="wallet" className="profile_wallet">
                        {collection.user}
                      </span>
                      <button id="btn_copy" title="Copy Text">
                        Copy
                      </button>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              {/* <div className="de_tab tab_simple">
                <ul className="de_nav">
                  <li className="active">
                    <span>On Sale</span>
                  </li>
                  <li>
                    
                    <span> Owned </span>
                  </li>
                </ul>
              </div> */}
              <div className="de_tab_content">
                <div className="tab-1 mt-4">
                  {!collectionItems.length ? (
                    <h4 className="py-10 px-20 text-3xl text-center text-warning">
                      no items
                    </h4>
                  ) : (
                    <div className="row">
                      {collectionItems.map((item, i) => (
                        <div
                          key={i}
                          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                        >
                          <div className="nft__item">
                            <div className="nft__item_wrap">
                              <Link href={"/collection/item/" + item.id}>
                                <a>
                                  <img
                                    src={item.pics}
                                    className="lazy nft__item_preview"
                                    alt=""
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="nft__item_info">
                              <Link href={"/collection/item/" + item.id}>
                                <a>
                                  <h4>{item.title}</h4>
                                </a>
                              </Link>
                              <div className="nft__item_price">
                                {item.onSell ? item.price + "ETH" : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
