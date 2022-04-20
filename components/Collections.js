import Link from "next/link";
import axios from "axios";
import { useEffect, useState, useContext } from "react";

export default function Collection()
{
    const [collections,setCollections] = useState({})
    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        getCollection()
    },[]);

    async function getCollection()
    {
        const data = await axios.get('/api/collection');

        // console.log(data)

        if(data.status == 200 && data.data)
        {
        const items = await Promise.all(
            data.data.map(async (i)=>{
                const user = await axios.get(`/api/user/${i.userId}`)
            let item = {
                id:i.id,
                title:i.title,
                symbol:i.symbol,
                pics:i.pics,
                user:i.userId,
                userPics:user.data.profile_pics,
                username:user.data.username
            }
            return item;
            })
        )
        
        setCollections(items)
        setLoaded(true)
        }
      
    }

    return(
        <>
        {
            !loaded && !collections.length ? (<h4 className="py-10 px-20 text-3xl text-center text-warning">
            no result found
          </h4>):(
            <div id="collection-carousel" className="owl-carousel wow fadeIn">
                 {
                     collections.map((item,i)=>(
                        <div key={i} className="nft_coll">
                        <div className="nft_wrap">
                          <Link href={"collection/"+item.id}>
                          <a ><img src={item.pics} className="lazy img-fluid" alt=""/>
                          </a>
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link href={"collection/"+item.id}>
                          <a ><img className="lazy pp-coll" src={item.userPics} alt=""/>
                          <i className="fa fa-check"></i>
                          </a>
                          </Link>
                        </div>
                        <div className="nft_coll_info">
                          <Link href={"collection/"+item.id}>
                          <a ><h4>{item.title}</h4>
                          </a>
                          </Link>
                          <span>{item.username}</span>
                        </div>
                      </div>
                     ))
                 }
            </div>)
        }
        </>
    )
}
