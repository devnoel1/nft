import Link from "next/link";

export default function CollectionDetails(){
    return (
        <>
        <section id="profile_banner" aria-label="section" className="text-light" data-bgimage="url(/images/background/4.jpg) top"></section>
        <section aria-label="section" className="d_coll no-top">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d_profile">
                            <div className="profile_avatar">
                                <div className="d_profile_img">
                                    <img src="/images/author/author-1.jpg" alt=""/>
                                    <i className="fa fa-check"></i>
                                </div>
                                <div className="profile_name">
                                            <h4>
                                                Abstraction                                                
                                                <div className="clearfix"></div>
                                                <span id="wallet" className="profile_wallet">DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span>
                                                <button id="btn_copy" title="Copy Text">Copy</button>
                                            </h4>
                                        </div>
                            </div>
                        </div>
                    </div> 
                    <div className="col-md-12">
                        <div className="de_tab tab_simple">
                            <ul className="de_nav">
                                <li className="active"><span>On Sale</span></li>
                                <li><span>Owned</span></li>
                            </ul>
                        </div>
                        <div className="de_tab_content">
                            <div className="tab-1">
                                <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                <div className="nft__item">
                                                    <div className="de_countdown" data-year="2022" data-month="3"
                                                        data-day="16" data-hour="8"></div>
                                                   
                                                    <div className="nft__item_wrap">
                                                        <div className="nft__item_extra">
                                                            <div className="nft__item_buttons">
                                                                <button onclick="location.href='item-details.html'">Buy
                                                                    Now</button>
                                                                <div className="nft__item_share">
                                                                    <h4>Share</h4>
                                                                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                                                                        target="_blank"><i
                                                                            className="fa fa-facebook fa-lg"></i></a>
                                                                    <a href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                                                                        target="_blank"><i
                                                                            className="fa fa-twitter fa-lg"></i></a>
                                                                    <a
                                                                        href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io"><i
                                                                            className="fa fa-envelope fa-lg"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a href="item-details.html">
                                                            <img src="/images/collections/coll-item-1.jpg"
                                                                className="lazy nft__item_preview" alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="nft__item_info">
                                                        <a href="item-details.html">
                                                            <h4>Abstraction #256</h4>
                                                        </a>
                                                        <div className="nft__item_click">
                                                            <span></span>
                                                        </div>
                                                        <div className="nft__item_price">
                                                            0.08 ETH<span>1/20</span>
                                                        </div>
                                                        <div className="nft__item_action">
                                                            <a href="#">Place a bid</a>
                                                        </div>
                                                        <div className="nft__item_like">
                                                            <i className="fa fa-heart"></i><span>50</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        </section>
        </>
    )
}


  