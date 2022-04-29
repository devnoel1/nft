import Link from "next/link";
import axios from "axios";
import React,{Component} from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { getChainData } from "./../lib/utilities";
import { useRouter } from "next/router";
import { baseURL } from "./../src/config/appConfig";
import { WalletContext } from "../context/WalletContext";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class CustomSlide extends React.Component {
  render() {
    const { index, ...props } = this.props;
    return (
      <div {...props}></div>
    );
  }
}

export default function Collection() {
  const { address, currentUser,web3Provider,balance } = useContext(WalletContext);
  const [collections, setCollections] = useState({});
  const [loaded, setLoaded] = useState(false);
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
    getCollection()
    // Clean up
    return () => (isMounted.current = false);
  }, [routeHasQuery]);

  async function getCollection() {
    const data = await axios.get("/api/collection");

    if (data.status == 200 && data.data) {
      const items = await Promise.all(
        data.data.map(async (i) => {
          const user = await axios.get(`/api/user/${i.userId}`);
          let item = {
            id: i.id,
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

      const user_collections = items.filter(i=>i.user == address)

      if(user_collections.length)
      {
        setCollections(user_collections);
        setLoaded(true);
      }else{
        setCollections(user_collections);
        setLoaded(false);
      }

      
    }
  }

  return (
    <>
      {!loaded && !collections.length ? (
        <h4 className="py-10 px-20 text-3xl text-center text-warning">
          no collections
        </h4>
      ) : (
        <div className="row">
           {collections.map((item, i) => (
            <div key={i} className="col-lg-3">
            <div  className="nft_coll">
              <div className="nft_wrap">
                <Link href={"collection/" + item.id}>
                  <a>
                    <img src={item.pics} className="lazy img-fluid" alt="" />
                  </a>
                </Link>
              </div>
              <div className="nft_coll_info">
                <Link href={"collection/" + item.id}>
                  <a>
                    <h4>{item.title}</h4>
                  </a>
                </Link>
                <span>{item.username}</span>
              </div>
            </div>
            </div>
          ))}     
        </div>
      )}
    </>
  );
}
