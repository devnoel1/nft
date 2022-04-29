import Link from "next/link";
import axios from "axios";
import React, { Component } from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { getChainData } from "./../lib/utilities";
import { useRouter } from "next/router";
import Slider from "react-slick";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

class CustomSlide extends React.Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}

export default function CarouselCollecction() {
  const [collections, setCollections] = useState({});
  const [loaded, setLoaded] = useState("loading");
  // Define state
  const [currPageTitle, setCurrPageTitle] = useState("");

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
    if (routeHasQuery) {
      setCurrPageTitle("");
    } else {
      setCurrPageTitle("");
    }
    getCollection();
    // Clean up
    return () => (isMounted.current = false);
  }, [routeHasQuery]);

  async function getCollection() {
    const datalist = await axios.get("/api/collection");

    const collectionList = datalist?.data !=""? datalist?.data:[];

    if(collectionList.status == "success")
    {
        const items = await Promise.all(
        collectionList.data.map(async (i) => {
          const user = await axios.get(`/api/user/${i.userId}`);
          let item = {
            id: i._id,
            title: i.title,
            symbol: i.symbol,
            pics: i.pics,
            user: i.userId,
            userPics: user.data.profile_pics,
            username: user.data.username,
          };
          return item;
        })
      );

      setCollections(items);
      setLoaded("loaded");
    }else{
      console.log(collectionList)
    }
  }

  return (
    <>
      {loaded == "loading" ? (
        <div className="d-flex justify-content-center">
          <img src="/images/loading.gif" alt="" />
        </div>
      ) : (
        <div>
          {loaded == "loaded" && !collections.length ? (
            <h4 className="py-10 px-20 text-3xl text-center text-warning">
              no collections
            </h4>
          ) : (
            <div className="row">
              {collections.map((item, i) => (
                <CustomSlide className="col-lg-4" index={i} key={i}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link href={"collection/" + item.id}>
                        <a>
                          <img
                            src={item.pics}
                            className="lazy "
                            alt=""
                            height="250px"
                            width="100%"
                            
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link href={"collection/" + item.id}>
                        <a>
                          <img
                            className="lazy pp-coll"
                            src={item.userPics? item.userPics:"/images/author_single/author-9.jpg"}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </a>
                      </Link>
                    </div>
                    <div className="nft_coll_info">
                      <Link href={"collection/" + item.id}>
                        <a>
                          <h4>{item.title}</h4>
                        </a>
                      </Link>
                      <span>{item.username? item.username:'unKwon' }</span>
                    </div>
                  </div>
                </CustomSlide>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
