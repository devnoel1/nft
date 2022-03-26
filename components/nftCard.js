import BuyNFT from "./buy"

const NFTCard = ({nft}) =>{
    return(
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="nft__item">
                        {/* <div className="author_list_pp">
                            <a
                                href=""
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Creator: Lori Hart"
                            >
                                <Image
                                    className="lazy"
                                    src="/images/author/author-9.jpg"
                                    alt=""
                                    height={'100%'}
                                    width={'100%'}
                                />
                                <i className="fa fa-check"></i>
                            </a>
                        </div> */}
                        <div className="nft__item_wrap">
                            <a href={"/item/" + nft.tokenId}>
                                <img
                                    src={nft.image}
                                    className="lazy nft__item_preview"
                                    alt=""
                                    
                                />
                            </a>
                        </div>
                        <div className="nft__item_info">
                            <a href="">
                                <h4>{nft.name}</h4>
                            </a>
                            <div className="nft__item_click">
                                <span></span>
                            </div>
                            <div className="nft__item_price">
                                {nft.price} ETH<span></span>
                            </div>
                            <div className="nft__item_action">
                              
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default NFTCard